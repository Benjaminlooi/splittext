import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

const moduleName = pkg.name.replace(/^@.*\//, "");
const author = pkg.author;
const banner = `
  /**
   * @license
   * author: ${author}
   * ${moduleName}.js v${pkg.version}
   * Released under the ${pkg.license} license.
   */
`;

export default [
  // browser-friendly UMD build
  // {
  //   input: "src/index.ts",
  //   output: {
  //     name: "myLib",
  //     file: pkg.browser,
  //     format: "umd",
  //     banner,
  //   },
  //   plugins: [
  //     resolve(),
  //     commonjs(),
  //     typescript({ tsconfig: "./tsconfig.json" }),
  //   ],
  // },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/index.ts",
    output: [
      // { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  },
];
