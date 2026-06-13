const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const sourceDir = path.join(process.cwd(), 'source-images');
const outputDir = path.join(process.cwd(), 'public', 'images');
const sizes = [
  { folder: 'thumbs', width: 480, quality: 76 },
  { folder: 'large', width: 1600, quality: 82 },
];

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  try {
    await fs.access(sourceDir);
  } catch {
    console.log('source-images/ not found; using committed optimized images.');
    return;
  }

  const files = (await fs.readdir(sourceDir))
    .filter((file) => file.toLowerCase().endsWith('.png'))
    .sort();

  await Promise.all(
    sizes.map(({ folder }) => fs.mkdir(path.join(outputDir, folder), { recursive: true })),
  );

  for (const file of files) {
    const source = path.join(sourceDir, file);
    const name = file.replace(/\.png$/i, '.jpg');

    await Promise.all(
      sizes.map(({ folder, width, quality }) =>
        sharp(source)
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .jpeg({ quality, mozjpeg: true })
          .toFile(path.join(outputDir, folder, name)),
      ),
    );
  }

  console.log(`Generated ${files.length * sizes.length} optimized images.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
