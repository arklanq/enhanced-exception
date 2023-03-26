import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const packageJson = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));

export const externalDependencies = (packageJson.dependencies ? Object.keys(packageJson.dependencies) : [])
  .concat(packageJson.peerDependencies ? Object.keys(packageJson.peerDependencies) : [])
  .map((packageName) => new RegExp(`^${packageName}(/.*)?`));

export const rollupDirPath = path.dirname(fileURLToPath(import.meta.url));

export const rootDirPath = path.resolve(rollupDirPath, '../');
