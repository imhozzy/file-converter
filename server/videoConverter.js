import ffmpeg from 'fluent-ffmpeg';

export const convertVideo = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(new Error(`Video conversion failed: ${err.message}`)))
      .run();
  });
};