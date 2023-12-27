export type TMenuButtonProps = {
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
