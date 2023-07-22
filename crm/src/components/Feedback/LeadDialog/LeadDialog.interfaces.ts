export interface CustomDialogAttributes {
  isOpen: boolean;
  closeModal: () => void;
  submit?: (title: string) => void | undefined;
}
