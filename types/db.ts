import type * as wordListTypes from "./wordlists";

export type JSONString<T> = T extends string
  ? T extends `{"${string}":${string}}`
    ? T
    : never
  : never;

export type User = {
  password: string;
  wordlists: wordListTypes.WordList[];
};

export type Users = { [key in Username]: User };

export type Username = string;

export type db = {
  users: Users;
};
