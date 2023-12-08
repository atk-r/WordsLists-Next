type JSONString<T> = T extends string
? T extends `{"${string}":${string}}`
  ? T
  : never
: never;

export type dbKey = JSONString<string>;

export type Username = string;

export type db = {
  [key: Username]: dbKey;
}