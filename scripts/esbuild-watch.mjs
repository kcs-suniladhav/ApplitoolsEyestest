import * as esbuild from 'esbuild';

try {
  const ctx = await esbuild.context({
    entryPoints: ['app.js'],
    bundle: true,
    outfile: 'out.js',
  });

  await ctx.watch();
  console.log('esbuild (ESM): Watching for changes...');
} catch (err) {
  console.error('esbuild (ESM) watch failed:', err);
  process.exit(1);
}
