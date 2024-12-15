import sharp from 'sharp';

export const convertImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .toFile(outputPath);
    return outputPath;
  } catch (error) {
    throw new Error(`Image conversion failed: ${error.message}`);
  }
};