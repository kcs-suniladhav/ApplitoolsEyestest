const fs = require('fs-extra');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

async function readPng(filePath) {
  const buf = await fs.readFile(filePath);
  return PNG.sync.read(buf);
}

async function compareImages({ expected, actual, threshold = 0.1, diffName }) {
  const cwd = process.cwd();
  const expectedPath = path.isAbsolute(expected) ? expected : path.join(cwd, expected);
  const actualPath = path.isAbsolute(actual) ? actual : path.join(cwd, actual);

  if (!await fs.pathExists(expectedPath)) {
    return { error: `Expected baseline not found: ${expectedPath}` };
  }
  if (!await fs.pathExists(actualPath)) {
    return { error: `Actual image not found: ${actualPath}` };
  }

  const img1 = await readPng(expectedPath);
  const img2 = await readPng(actualPath);

  const width = Math.max(img1.width, img2.width);
  const height = Math.max(img1.height, img2.height);

  // Create canvases of equal size
  const img1Resized = new PNG({ width, height });
  const img2Resized = new PNG({ width, height });
  PNG.bitblt(img1, img1Resized, 0, 0, img1.width, img1.height, 0, 0);
  PNG.bitblt(img2, img2Resized, 0, 0, img2.width, img2.height, 0, 0);

  const diff = new PNG({ width, height });

  const diffPixels = pixelmatch(
    img1Resized.data,
    img2Resized.data,
    diff.data,
    width,
    height,
    { threshold }
  );

  const totalPixels = width * height;
  const mismatchPercentage = (diffPixels / totalPixels) * 100;

  // Ensure snapshots dir exists
  const snapshotsDir = path.join(cwd, 'cypress', 'snapshots');
  await fs.ensureDir(snapshotsDir);

  const diffFileName = diffName || `diff-${Date.now()}.png`;
  const diffPath = path.join(snapshotsDir, diffFileName);
  await fs.writeFile(diffPath, PNG.sync.write(diff));

  return {
    pass: diffPixels === 0,
    diffPath,
    diffPixels,
    totalPixels,
    mismatchPercentage
  };
}

module.exports = {
  compareImages
};
