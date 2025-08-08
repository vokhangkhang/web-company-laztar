"use server";

import sharp from "sharp";
import fs from "fs";
import path from "path";

export async function sliceImage(
  inputPath: string,
  outputDir: string,
  name: string,
  numberOfSlices: number
): Promise<string[]> {
  const fullInputPath = path.join(process.cwd(), "public", inputPath);
  const fullOutputDir = path.join(process.cwd(), "public", outputDir);

  if (!fs.existsSync(fullOutputDir)) {
    fs.mkdirSync(fullOutputDir, { recursive: true });
  }

  const { height, width } = await sharp(fullInputPath).metadata();
  const sliceHeight = Math.floor(height / numberOfSlices);
  const remainder = height % numberOfSlices;

  const slicePaths: string[] = [];

  for (let i = 0; i < numberOfSlices; i++) {
    const isLastSlice = i === numberOfSlices - 1;
    const currentHeight = isLastSlice ? sliceHeight + remainder : sliceHeight;

    const fileName = `${name}-${i + 1}.png`;
    const outputPath = path.join(fullOutputDir, fileName);

    await sharp(fullInputPath)
      .extract({ left: 0, top: i * sliceHeight, width, height: currentHeight })
      .toFile(outputPath);

    slicePaths.push(`/slices/${fileName}`);
  }

  return slicePaths;
}