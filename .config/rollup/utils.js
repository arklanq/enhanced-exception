import path from 'node:path';
import {fileURLToPath} from 'node:url';
import asyncFs from 'node:fs/promises';

export async function importJsonFile(filePath) {
  const fileBody = await asyncFs.readFile(filePath, {encoding: 'utf-8'});
  return JSON.parse(fileBody);
}

export async function importProjectManifest() {
  const filePath = path.resolve(rootDirPath, 'package.json');
  return await importJsonFile(filePath);
}

export const rootDirPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../');

export function createExternalDependenciesSet(projectManifest) {
  return [
    projectManifest.dependencies,
    projectManifest.devDependencies,
    projectManifest.optionalDependencies
  ]
    .reduce((acc, maybeEntries) => {
      if (maybeEntries) acc.push(...Object.keys(maybeEntries));
      return acc;
    }, [])
    .map((packageName) => new RegExp(`^${packageName}(/.*)?`));
}
