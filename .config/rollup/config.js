import {createCJS_buildConfig} from './cjs_build.js';
import {createESM_buildConfig} from './esm_build.js';

async function createConfig() {
  return [
    await createCJS_buildConfig(),
    await createESM_buildConfig()
  ];
}

export default createConfig;
