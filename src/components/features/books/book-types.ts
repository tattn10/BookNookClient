export type BookRecord = {
  _id: string;
  title: string;
  author: string;
  category: string;
  imageUrl: string;
  description: string;
  userName: string;
  userEmail: string;
  addedAt: string;
};

export type BorrowRecord = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
};
