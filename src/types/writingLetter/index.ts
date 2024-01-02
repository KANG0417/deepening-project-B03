export type TOptionBoxProps = {
  initialTags: string[];
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  isSendImmediate: boolean;
  setIsSendImmediate: React.Dispatch<React.SetStateAction<boolean>>;
  isPublic: boolean;
  setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedTag: string | null;
  setSelectedTag: React.Dispatch<React.SetStateAction<string | null>>;
};

export type WritingFieldProps = {
  letterIndex: string;
  setLetterIndex: React.Dispatch<React.SetStateAction<string>>;
};

export type WritingLetterProps = {
  letterIndex: string;
  setLetterIndex: React.Dispatch<React.SetStateAction<string>>;
};
