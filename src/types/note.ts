export type Note = {
  uid?: string;
  title: string;
  description: string;
  completed?: boolean;
  receipt?: string;
  receiptFile?: File | undefined;
};
