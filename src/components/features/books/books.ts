export type Book = {
  title: string;
  author: string;
  note: string;
  cover: string;
  category: string;
};

export const books: Book[] = [
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    note: "A timeless first edition",
    cover: "book-cover-olive",
    category: "A novel",
  },
  {
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    note: "For garden dreamers",
    cover: "book-cover-rust",
    category: "A classic",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    note: "A little jazz-age glamour",
    cover: "book-cover-navy",
    category: "A novel",
  },
  {
    title: "Anne of Green Gables",
    author: "L. M. Montgomery",
    note: "A forever favorite",
    cover: "book-cover-plum",
    category: "A classic",
  },
  {
    title: "Little Women",
    author: "Louisa May Alcott",
    note: "Made for a rainy afternoon",
    cover: "book-cover-gold",
    category: "A novel",
  },
  {
    title: "The Wind in the Willows",
    author: "Kenneth Grahame",
    note: "A ramble along the river",
    cover: "book-cover-umber",
    category: "A classic",
  },
];
