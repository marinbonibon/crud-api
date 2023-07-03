import path from 'path';
import { fileURLToPath } from "url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export default {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'main.cjs',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: [".ts", ".js", ".cjs"],
    fallback: {
      "http": false,
      "path": false,
      "os": false,
      "crypto": false
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  optimization: {
    minimize: true,
  },
};

