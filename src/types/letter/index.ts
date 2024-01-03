import React from "react";

export type TUpdateLetterProps = {
  updateDate: string;
  letterTitle?: string;
  letterContent: string;
  letterCategory?: string;
  letterIsOpen?: boolean;
};

export type TAddLetterProps = {
  letterId?: string;
  createAt: string;
  displayName: string | null | undefined;
  userUid: string | null | undefined;
  letterTitle: string;
  letterContent: string | undefined;
  letterCategory: string;
  letterIsOpen: boolean;
  selectDate: string;
  createdAt?: number | undefined;
  isSendImmediate?: boolean;
};

export type TWritingProps = {
  setLetterContent?: React.Dispatch<React.SetStateAction<string>>;
  setTags?: React.Dispatch<React.SetStateAction<string[]>>;
  setIsSendImmediate?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate?: React.Dispatch<React.SetStateAction<Date | null>>;
  setSelectedTag?: React.Dispatch<React.SetStateAction<string | null>>;
  setLetterIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setLetterTitle?: React.Dispatch<React.SetStateAction<string>>;
  selectedTag?: string | null;
  tags?: string[] | undefined;
  isSendImmediate?: boolean;
  letterIsOpen?: boolean;
  $active?: boolean;
  letterTitle?: string;
};
