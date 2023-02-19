export type GenerateMapRequest = {
  mapTitle: string;
  mainWord: string;
};

export type ImageType = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

export type UserRequest = {
  authId: string;
  firstName: string;
  lastName: string;
  institution: string;
  email: string;
};
