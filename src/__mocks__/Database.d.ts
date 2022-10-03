export type DatabaseParams = {};

export type DatabaseResult<T> = {
  results: T[];
};

export type Database = {
  connect: (params: DatabaseParams) => Promise<boolean>;
  query: <T = any>(
    query: string,
    variables: object
  ) => Promise<DatabaseResult<T>>;
};
