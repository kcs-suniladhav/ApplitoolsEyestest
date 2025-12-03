const esbuild = require('esbuild');

async function startWatch() {
  try {
    const ctx = await esbuild.context({
      entryPoints: ['app.js'],
      bundle: true,
      outfile: 'out.js',
    });

    await ctx.watch();
    console.log('esbuild: Watching for changes...');
  } catch (err) {
    console.error('esbuild watch failed:', err);
    process.exit(1);
  }
}

startWatch();
