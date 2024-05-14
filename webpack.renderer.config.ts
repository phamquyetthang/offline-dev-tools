import type { Configuration } from "webpack";
import path from "path";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

rules.push({
  test: /\.css$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    { loader: "postcss-loader" },
  ],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@renderer": path.resolve(__dirname, "./src/renderer/src"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
