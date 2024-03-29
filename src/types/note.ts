export type Note = {
  uid?: string;
  title: string;
  description: string;
  completed?: boolean;
  receipt?: string;
  receiptFileName?: string;
  receiptFile?: File | undefined;
};
