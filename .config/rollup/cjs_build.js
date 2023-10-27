import path from 'node:path';

import plugin_delete from 'rollup-plugin-delete';
import plugin_commonjs from '@rollup/plugin-commonjs';
import plugin_nodeResolve from '@rollup/plugin-node-resolve';
import plugin_typescript from '@rollup/plugin-typescript';
import plugin_generatePackageJson from 'rollup-plugin-generate-package-json'


import {externalDependencies, rootDirPath} from './utils.js';

// CJS build
const config = {
  input: path.resolve(rootDirPath, './src/Exception.ts'),
  plugins: [
    // Clean `dist` directory before next build
    plugin_delete({
      targets: ['dist/cjs'],
    }),
    // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    plugin_commonjs(),
    // Allows Rollup to find modules using Node.js modules resolution
    plugin_nodeResolve({
      preferBuiltins: true
    }),
    // Allows Rollup to convert TypeScript to JavaScript
    // Emit .js, .js.map
    plugin_typescript({
      tsconfig: path.resolve(rootDirPath, './tsconfig.json'),
      compilerOptions: {
        outDir: 'dist/cjs',
        sourceMap: true,
        sourceRoot: path.resolve(rootDirPath, 'src'),
      },
      include: ['src/**/*.ts'],
    }),
    // Allows Rollup to convert TypeScript to JavaScript
    // Emit .d.ts, .d.ts.map
    plugin_typescript({
      tsconfig: path.resolve(rootDirPath, './tsconfig.json'),
      compilerOptions: {
        // rootDir: 'src',
        outDir: 'dist/cjs',
        declaration: true,
        declarationMap: true,
        emitDeclarationOnly: true,
      },
      include: ['src/**/*.ts'],
    }),
    plugin_generatePackageJson({
      baseContents: (_pkg) => ({
        type: 'commonjs'
      })
    }),
  ],
  external: externalDependencies,
  output: {
    dir: 'dist/cjs',
    format: 'cjs',
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: true,
  },
};

Object.defineProperty(config, '__bundleName', {
  configurable: true,
  enumerable: false,
  writable: false,
  value: 'CJS',
});

export {config as cjs_build_config};
