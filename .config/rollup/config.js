import {esm_build_config} from './esm_build.js';
import {cjs_build_config} from './cjs_build.js';

const bundles = [
  // ESM build
  esm_build_config,
  // CJS build
  cjs_build_config,
];

export default bundles;
