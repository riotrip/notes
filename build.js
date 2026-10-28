import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSite } from './src/site-builder.js';

export { buildSite };

const rootDir = path.dirname(fileURLToPath(import.meta.url));

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const count = await buildSite({
    contentDir: path.join(rootDir, 'content'),
    assetsDir: path.join(rootDir, 'assets'),
    outputDir: path.join(rootDir, 'dist'),
  });
  console.log(`Built ${count} note${count === 1 ? '' : 's'} to dist/.`);
}
