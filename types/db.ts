export type JSONString<T> = T extends string
? T extends `{"${string}":${string}}`
  ? T
  : never
: never;

export type dbKey = {
  password: string;
};

export type Users = { [key in Username]: dbKey }

export type Username = string;

export type db = {
  users: Users;
}
