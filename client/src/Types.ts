export type SearchWordRequest = {
  searchWord: string;
};

export type GenerateMapRequest = {
  mapTitle: string;
  mainWord: string;
};

export type Similar = {
  word: string;
  frequency: string;
  score: number;
};

export type SimilarWord = {
  id: string;
  word: string;
  frequency: string;
  score: number;
  checked: boolean;
};

export type CheckedItem = {
  id: string;
  canBeDeleted: boolean;
  word: string;
  image?: File;
};

export type ThinkingMapEntity = {
  id: number;
  title: string;
  mainWord: string;
  createdAt: string;
  content: string;
};

export type UserRequest = {
  authId: string;
  firstName: string;
  lastName: string;
  institution: string;
  email: string;
};

export interface User extends UserRequest {
  id: string;
  createdAt: Date;
}

export type GroupRequest = {
  name: string;
  authId: string;
  children: Child[];
};

export type Child = {
  firstName: string;
  lastName: string;
  age: number;
};

export interface ChildRequest extends Child {
  group: string;
}

export type Group = {
  id: string;
  name: string;
  child: Child[];
};
