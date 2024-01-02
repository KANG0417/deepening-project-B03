export type TUpdateLetterProps = {
  updateDate: string;
  letterTitle?: string;
  letterContent: string;
  letterCategory?: string;
  letterMod?: string;
};

export type TAddLetterProps = {
  letterId?: string;
  createAt: string;
  displayName: string;
  userUid: string;
  letterTitle: string;
  letterContent: string | undefined;
  letterCategory: string;
  letterIsOpen: boolean;
  selectDate: string;
};

export type TWritingProps = {
  letterContent?: string;
  setLetterContent?: React.Dispatch<React.SetStateAction<string>>;

  onChange?: (content?: string) => void;
};
