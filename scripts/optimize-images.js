const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  console.log('Starting image optimization...\n');

  const tasks = [
    // 1. logo.png (both in public/ and public/images/)
    {
      source: 'public/logo.png',
      dests: ['public/logo.png', 'public/images/logo.png'],
      action: async (src) => {
        return await sharp(src)
          .png({ compressionLevel: 9, quality: 80, palette: true })
          .toBuffer();
      },
    },

    // 2. logo-white.png (both in public/ and public/images/)
    {
      source: 'public/logo-white.png',
      dests: ['public/logo-white.png', 'public/images/logo-white.png'],
      action: async (src) => {
        return await sharp(src)
          .png({ compressionLevel: 9, quality: 85, palette: true })
          .toBuffer();
      },
    },

    // 3. og-image.png (both in public/ and public/images/)
    {
      source: 'public/og-image.png',
      dests: ['public/og-image.png', 'public/images/og-image.png'],
      action: async (src) => {
        return await sharp(src)
          .png({ compressionLevel: 9, quality: 85, palette: true })
          .toBuffer();
      },
    },

    // 4. icon-1024.png
    {
      source: 'public/icon-1024.png',
      dests: ['public/icon-1024.png'],
      action: async (src) => {
        return await sharp(src)
          .png({ compressionLevel: 9, quality: 85, palette: true })
          .toBuffer();
      },
    },

    // 5. favicon.png, src/app/icon.png, android-chrome-512x512.png (512x512)
    {
      source: 'public/favicon.png',
      dests: [
        'public/favicon.png',
        'src/app/icon.png',
        'public/android-chrome-512x512.png',
      ],
      action: async (src) => {
        return await sharp(src)
          .png({ compressionLevel: 9, quality: 85, palette: true })
          .toBuffer();
      },
    },

    // 6. android-chrome-192x192.png (192x192)
    {
      source: 'public/android-chrome-192x192.png',
      dests: ['public/android-chrome-192x192.png'],
      action: async (src) => {
        return await sharp(src)
          .png({ compressionLevel: 9, quality: 85, palette: true })
          .toBuffer();
      },
    },

    // 7. apple-touch-icon.png (180x180)
    {
      source: 'public/apple-touch-icon.png',
      dests: ['public/apple-touch-icon.png', 'src/app/apple-icon.png'],
      action: async (src) => {
        return await sharp(src)
          .png({ compressionLevel: 9, quality: 85, palette: true })
          .toBuffer();
      },
    },

    // 8. luxury-bottle-bg.png (under 100KB)
    {
      source: 'public/images/luxury-bottle-bg.png',
      dests: ['public/images/luxury-bottle-bg.png'],
      action: async (src) => {
        return await sharp(src)
          .resize(420)
          .png({ compressionLevel: 9, quality: 60, palette: true })
          .toBuffer();
      },
    },

    // 9. luxury-bottle-bg.jpg (under 100KB)
    {
      source: 'public/images/luxury-bottle-bg.png',
      dests: ['public/images/luxury-bottle-bg.jpg'],
      action: async (src) => {
        return await sharp(src)
          .resize(680)
          .flatten({ background: { r: 255, g: 255, b: 255 } })
          .jpeg({ quality: 78, mozjpeg: true })
          .toBuffer();
      },
    },
  ];

  for (const task of tasks) {
    if (!fs.existsSync(task.source)) {
      console.warn(`Source file not found: ${task.source}`);
      continue;
    }

    const origStat = fs.existsSync(task.dests[0]) ? fs.statSync(task.dests[0]) : fs.statSync(task.source);
    const origKB = (origStat.size / 1024).toFixed(1);

    const optimizedBuffer = await task.action(task.source);
    const newKB = (optimizedBuffer.length / 1024).toFixed(1);

    for (const dest of task.dests) {
      fs.writeFileSync(dest, optimizedBuffer);
    }

    console.log(`✓ ${task.dests.join(', ')}`);
    console.log(`   Original: ${origKB} KB -> Optimized: ${newKB} KB (${optimizedBuffer.length} bytes)\n`);
  }

  console.log('All image optimization tasks completed successfully.');
}

optimizeImages().catch((err) => {
  console.error('Optimization error:', err);
  process.exit(1);
});
