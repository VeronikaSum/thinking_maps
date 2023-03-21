export const ImageTypes = {
  CORRECT: "correct",
  INCORRRECT: "incorrect",
};

export type ImageGameResponse = {
  id: string;
  title: string;
  type: string;
  contentResized: string;
  correct: boolean;
};
