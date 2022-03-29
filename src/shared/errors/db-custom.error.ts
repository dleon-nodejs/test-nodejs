export class DbCustomError extends Error {
  code: string;
  errno: number;

  constructor(message: string, code: string, errno: number) {
    super(message);
    this.code = code;
    this.errno = errno;
  }
}

export class DbDuplicateEntry extends DbCustomError {}

export class DbEntityNotFound {
  constructor(public error) {}
}

export class DbInvalidField extends DbCustomError {}
