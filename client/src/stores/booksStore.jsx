import { createStore } from "zustand/vanilla";

const booksStore = createStore((set) => ({
    books: [],
    fetchBooks: async () => {
        try {
            const response = await fetch(`http://localhost:3000/books`);
            const data = await response.json();
            set({ books: data });
        } catch (error) {
            console.error("Failed to fetch books", error);
        }
    },
    addBook: async (newBook) => {
        try {
            const response = await fetch(`http://localhost:3000/books`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBook),
            });
            const data = await response.json();
            set((state) => ({ books: [...state.books, data] }));
        } catch (error) {
            console.error("Failed to add book", error);
        }
    },
    updateBook: async (updatedBook) => {
        try {
            const response = await fetch(
                `http://localhost:3000/books/${updatedBook.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedBook),
                }
            );
            const data = await response.json();
            set((state) => ({
                books: state.books.map((book) =>
                    book.id === data.id ? data : book
                ),
            }));
        } catch (error) {
            console.error("Failed to update book", error);
        }
    },
    deleteBook: async (id) => {
        try {
            await fetch(`http://localhost:3000/books/${id}`, {
                method: "DELETE",
            });
            set((state) => ({
                books: state.books.filter((book) => book.id !== id),
            }));
        } catch (error) {
            console.error("Failed to delete book", error);
        }
    },
}));

export default booksStore;
