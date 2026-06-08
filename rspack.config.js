// @ts-check
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import * as path from 'path'

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
    ],
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src'),
      'public': path.resolve(__dirname, 'src', 'public'),
    },
  },
  html: {
    template: './src/pages/[name]/[name].html',
  },
  plugins: [new rspack.HtmlRspackPlugin({

    minify: false,
  })],
});
