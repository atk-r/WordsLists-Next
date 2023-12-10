export type Word = {
  word: string;
  starred: boolean;
  synonyms: string[];
  definition: string;
};

export type WordList = {
  name: string;
  words: Word[];
};
