export type TMenuButtonProps = {
  ref: React.MutableRefObject<HTMLButtonElement | null>;
  type: string;
  addStyle?: {
    backgroundImage: string;
  };
  contents?: string;
  onClick?: () => void;
};

export type TDropDownProps = {
  options: string[];
  onOptionClick: (option: string) => void;
};
