import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
// import postcss from 'rollup-plugin-postcss-modules'
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import filesize from 'rollup-plugin-filesize';
import { optimizeLodashImports } from '@optimize-lodash/rollup-plugin';

import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: 'dist/index.umd.js',
      name: 'CloudComponent',
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        lodash: '_',
        'styled-components': 'styled',
        axios: 'axios',
      },
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
    }),
    url(),
    svgr(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    commonjs(),
    optimizeLodashImports({ appendDotJs: false }),
    copy({
      targets: [{ src: 'src/**/*.d.ts', dest: 'dist' }],
    }),
    filesize(),
  ],
};
