// @ts-check
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import * as path from 'path'

const sourcePath = path.join(process.cwd(), 'src')

const keepFolderStructure = (pathData, replacer = '') => {
  const sourceFile = pathData.filename
  const relativeFile = path.relative(sourcePath, sourceFile)
  const { dir, name } = path.parse(relativeFile)

  return `${dir.replace('assets', replacer)}/${name}[ext]`
}

const keepFolderStructureForMedia = (pathData) => keepFolderStructure(pathData, 'media')
const keepFolderStructureForFonts = (pathData) => keepFolderStructure(pathData, '')

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  entry: {
    index: './src/pages/index/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: "sass-loader",
            options: {
              api: "modern-compiler",
              implementation: require.resolve("sass-embedded"),
            },
          },
        ],
        type: "css/auto",
      },
      {
        test: /\.(png|jpg|jpeg|ico|svg|webp)/,
        type: 'asset/resource',
        generator: { filename: keepFolderStructureForMedia },
      },
      {
        test: /\.(woff|woff2)$/,
        type: "asset/resource",
        generator: { filename: keepFolderStructureForFonts },
      },
    ],
  },
  resolve: {
    alias: {
      'src': path.resolve(process.cwd(), 'src'),
      'public': path.resolve(process.cwd(), 'src', 'public'),
    },
  },
  plugins: [new rspack.HtmlRspackPlugin({
    template: './src/pages/index/index.html',
    minify: false,
  })],
});
