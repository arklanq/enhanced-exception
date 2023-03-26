Have you come recently from `Java` or `C#` world into JavaScript and you start wondering how the hell we are living here
with the basic `Error` constructor? Yea, our stack traces aren't well descriptive, BUT here it is - `Exception` class
just for you! Dive deep into the [Quick showcase](#quick-showcase) and see how this little lib can significantly improve
your stack traces today.

> **Tip of the day** - If you are coding in TypeScript, remember
> to [output source maps](https://www.typescriptlang.org/tsconfig#sourceMap) and
> also [enable them in Node](https://nodejs.org/dist/latest-v12.x/docs/api/cli.html#cli_enable_source_maps).

### Table of contents

- [Quick showcase](#quick-showcase)
- [Installation](#installation)
- [API](#api)
- [Custom exceptions](#custom-exceptions)

### Quick showcase

For those who don't like to read a lot.

**Code**

```typescript
async function accessFileSystemFile() {
  // some neat code here...
  throw new Error('I/O Error');
}

async function readLatestLog() {
  try {
    // some neat code here...
    return await accessFileSystemFile();
  } catch(e: unknown) {
    throw new Exception('Unable to read log file.', e);
  }
}

async function bootstrap() {
  try {
    await readLatestLog();
  } catch (e: unknown) {
    throw new Exception('Failed to do some dangerous stuff.', e);
  }
}

void bootstrap();
```

**Stack trace**

```log
Exception: Failed to do some dangerous stuff.
    at file:///path/to/project/src/real-world-example.js:26:19
    at Generator.throw (<anonymous>)
    at rejected (/path/to/project/node_modules/tslib/tslib.js:113:69)
Caused by: Exception: Unable to read log file.
    at file:///path/to/project/src/real-world-example.js:16:19
    at Generator.throw (<anonymous>)
    at rejected (/path/to/project/node_modules/tslib/tslib.js:113:69)
Caused by: Error: I/O Error
    at file:///path/to/project/src/real-world-example.js:6:15
    at Generator.next (<anonymous>)
    at /path/to/project/node_modules/tslib/tslib.js:115:75
    at new Promise (<anonymous>)
    at __awaiter (/path/to/project/node_modules/tslib/tslib.js:111:16)
    at accessFileSystemFile (file:///path/to/project/src/real-world-example.js:4:12)
    at file:///path/to/project/src/real-world-example.js:13:26
    at Generator.next (<anonymous>)
    at /path/to/project/node_modules/tslib/tslib.js:115:75
    at new Promise (<anonymous>)
```

### Installation

```shell
npm install --save enhanced-exception
```

or

```shell
yarn add enhanced-exception
```

### API

##### `Exception` class

| element     | signature                              | comment                                                      |
|-------------|----------------------------------------|--------------------------------------------------------------|
| constructor | (message?: string, previous?: unknown) | Creates new `Exception` class object.                        |
| .message    | string                                 | Exception message, the same as in classic `Error` object.    |
| .name       | string                                 | Exception class name, the same as in classic `Error` object. |
| .previous   | unknown                                | Previous error, provided via constructor.                    |


### Custom exceptions

Thanks to the fact that `PlayerNotFoundException` class extends `Exception` class, it also inherits all it's
capabilities.

```typescript
class PlayerNotFoundException extends Exception {
  playerName: string;

  constructor(playerName: string, previous?: unknown) {
    super(`Player "${playerName}" not found.`, previous);
    this.playerName = playerName;
  }
}
```

```typescript
try {
  // some neat code here...
  throw new Error('Database record not found');
} catch(e: unknown) {
  throw new PlayerNotFoundException('Failed to do some dangerous stuff.', e);
}
```

```log
PlayerNotFoundException: Player "Failed to do some dangerous stuff." not found.
    at file:///path/to/project/src/real-world-example.js:13:11
    at ModuleJob.run (node:internal/modules/esm/module_job:194:25)
Caused by: Error: Database record not found
    at file:///path/to/project/src/real-world-example.js:10:11
    at ModuleJob.run (node:internal/modules/esm/module_job:194:25) {
  playerName: 'Failed to do some dangerous stuff.'
}
```
