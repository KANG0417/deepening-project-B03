export type TUpdateLetterProps = {
  updateDate: string;
  letterTitle?: string;
  letterContent: string;
  letterCategory?: string;
  letterMod?: string;
};

export type TAddLetterProps = {
  letterId: string;
  createAt: string;
  displayName: string;
  userUid: string;
  letterTitle: string;
  letterContent: string;
  letterCategory: string;
  letterMod: string;
  selectDate: string;
};
