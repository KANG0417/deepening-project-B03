export type TAddCommentProps = {
  userUid: string;
  displayName: string;
  commentContent: string;
  createAt: string;
};

export type TUpdateCommentProps = {
  commentContent: string;
  updateDate: string;
};
