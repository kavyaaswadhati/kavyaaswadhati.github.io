const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const sourceRoot = path.join(process.cwd(), 'source-images');
const outputRoot = path.join(process.cwd(), 'public', 'images');
const sections = ['sketchbooks', 'zines'];
const sizes = [
  { folder: 'thumbs', width: 480, quality: 76 },
  { folder: 'large', width: 1600, quality: 82 },
];

async function collectPngFiles(dir, prefix = '') {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(prefix, entry.name);
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!entry.name.startsWith('_')) {
        files.push(...(await collectPngFiles(fullPath, relativePath)));
      }
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      files.push(relativePath);
    }
  }

  return files.sort();
}

async function main() {
  await fs.mkdir(outputRoot, { recursive: true });

  try {
    await fs.access(sourceRoot);
  } catch {
    console.log('source-images/ not found; using committed optimized images.');
    return;
  }

  let generated = 0;

  for (const section of sections) {
    const sourceDir = path.join(sourceRoot, section);
    const outputDir = path.join(outputRoot, section);

    try {
      await fs.access(sourceDir);
    } catch {
      continue;
    }

    const files = await collectPngFiles(sourceDir);

    for (const file of files) {
      const source = path.join(sourceDir, file);
      const name = file.replace(/\.png$/i, '.jpg');

      await Promise.all(
        sizes.map(async ({ folder, width, quality }) => {
          const output = path.join(outputDir, folder, name);

          await fs.mkdir(path.dirname(output), { recursive: true });

          return sharp(source)
            .rotate()
            .resize({ width, withoutEnlargement: true })
            .jpeg({ quality, mozjpeg: true })
            .toFile(output);
        }),
      );

      generated += sizes.length;
    }
  }

  console.log(`Generated ${generated} optimized images.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
