/**
 * @typedef ExceptionsMap
 * @type {object}
 * @property {string[]} minor
 * @property {string[]} patch
 */

/**
 * @type {ExceptionsMap}
 */
const exceptions = {
  minor: ['@types/node'],
  patch: [],
};

/**
 * @type {import('npm-check-updates').RunOptions}
 */
const config = {
  packageManager: 'yarn',
  // reject: ['@types/node'],
  target: (packageName, _versionRange) => {
    if(exceptions.minor.includes(packageName))
      return 'minor';

    if(exceptions.patch.includes(packageName))
      return 'patch';

    return 'latest';
  },
};

module.exports = config;
