import {Exception} from 'enhanced-exception';

describe('"Exception" class', () => {
  describe('object instance constructed', () => {
    describe('without any args', () => {
      let exception: Exception;
      beforeAll(() => {
        exception = new Exception();
      });

      test('has property "name" equal to class name', () => {
        expect(exception).toMatchObject({
          name: Exception.name,
        });
      });

      test('has property "message" equal to empty string"', () => {
        expect(exception.message).toEqual('');
      });

      test('has property "previous" undefined', () => {
        expect(exception.previous).toBeUndefined();
      });

      test('has property "stack" with valid, regular stack trace', () => {
        expect(exception.stack).toMatch(/^Exception: \n(?:\s{4}at .*\n?)+$/);
      });
    });

    describe('with "message" arg provided at least', () => {
      const message = 'Test';
      let exception: Exception;
      beforeAll(() => {
        exception = new Exception(message);
      });

      test('has property "message" equal to 1st constructor argument', () => {
        expect(exception).toMatchObject({message});
      });

      test('has property "stack" with valid, regular stack trace', () => {
        expect(exception.stack).toMatch(/^Exception: Test\n(?:\s{4}at .*\n?)+$/);
      });
    });

    describe('with both "message" and "previous" args provided', () => {
      const message = 'Test';
      let exception: Exception;
      beforeAll(() => {
        exception = new Exception(message, new Error('ENOENT'));
      });

      test('has property "previous" equal to 2nd constructor argument', () => {
        expect(exception).toMatchObject({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          previous: expect.any(Error),
        });

        expect((exception.previous as Error).message).toEqual('ENOENT');
      });

      test('has property "stack" with valid, ehanced stack trace', () => {
        expect(exception.stack).toMatch(
          /^Exception: Test\n(?:\s{4}at .*\n?)+Caused by: Error: ENOENT\n(?:\s{4}at .*\n?)+$/
        );
      });
    });
  });
});

describe('Custom "Exception" class', () => {
  describe('object instance constructed', () => {
    class PlayerNotFoundException extends Exception {
      playerName: string;

      constructor(playerName: string, previous?: unknown) {
        super(`Player "${playerName}" not found.`, previous);
        this.playerName = playerName;
      }
    }

    const playerName = 'IdkMan2';
    let exception: PlayerNotFoundException;
    beforeAll(() => {
      exception = new PlayerNotFoundException(playerName, new Error('ENOENT'));
    });

    test('has property "playerName" equal to 1st constructor argument', () => {
      expect(exception.playerName).toEqual(playerName);
    });

    test('has property "stack" with valid, ehanced stack trace', () => {
      expect(exception.stack).toMatch(
        new RegExp(
          `^PlayerNotFoundException: Player "${playerName}" not found.\n(?:\\s{4}at .*\n?)+Caused by: Error: ENOENT\n(?:\\s{4}at .*\n?)+$`
        )
      );
    });
  });
});

describe('"Exception" based classes chained many times via "previous" arg', () => {
  let ex0: Error;
  let ex1: Exception, ex2: Exception, ex3: Exception;
  beforeAll(() => {
    ex0 = new Error('Origin');
    ex1 = new Exception('Exception 1', ex0);
    ex2 = new Exception('Exception 2', ex1);
    ex3 = new Exception('Exception 3', ex2);
  });

  test('have valid sequence and structure', () => {
    expect(ex3.previous).toBeInstanceOf(Exception);
    expect(ex3.previous).toBe(ex2);

    expect(ex2.previous).toBeInstanceOf(Exception);
    expect(ex2.previous).toBe(ex1);

    expect(ex1.previous).toBeInstanceOf(Error);
    expect(ex1.previous).toBe(ex0);

    expect(ex0).toBeInstanceOf(Error);
  });

  test('have valid stack trace', () => {
    expect(ex3.stack).toMatch(
      new RegExp(
        'Exception: Exception 3\n(?:\\s{4}at .*\n?)+'
        + 'Caused by: Exception: Exception 2\n(?:\\s{4}at .*\n?)+'
        + 'Caused by: Exception: Exception 1\n(?:\\s{4}at .*\n?)+'
        + 'Caused by: Error: Origin\n(?:\\s{4}at .*\n?)+'
      )
    );
  });
});
