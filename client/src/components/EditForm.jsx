import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useBooks from "../hooks/useBooks";

import "../spinner.css";

function EditForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const { books, updateBook, fetchBooks } = useBooks((state) => ({
        books: state.books,
        updateBook: state.updateBook,
        fetchBooks: state.fetchBooks,
    }));

    // Fetch the book details when component mounts
    useEffect(() => {
        const fetchBookData = async () => {
            // Fetch books only if not already fetched
            if (books.length === 0) {
                await fetchBooks();
            }

            // Find the book after books are fetched
            const foundBook = books.find((b) => b.id === id);
            if (foundBook) {
                setBook(foundBook);
            }
            setIsLoading(false);
        };

        fetchBookData();
    }, [id, books, fetchBooks]);

    // Local state for form inputs
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [genre, setGenre] = useState("");

    // Update form state when book changes
    useEffect(() => {
        if (book) {
            setTitle(book.title);
            setAuthor(book.author);
            setYear(book.year);
            setGenre(book.genre);
        }
    }, [book]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedBook = {
            id,
            title,
            author,
            year,
            genre,
        };

        try {
            setIsSaving(true);
            await updateBook(updatedBook);
            navigate("/");
        } catch (error) {
            console.log("Failed to update book:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    if (isSaving) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col p-4">
            <h1 className="font-bold text-3xl mb-4">Edit Book</h1>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <label>
                    <input
                        className="w-full max-w-md px-2 py-1 border-2 border-gray-200 rounded focus:outline-black"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        className="w-full max-w-md px-2 py-1 border-2 border-gray-200 rounded focus:outline-black"
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        className="w-full max-w-md px-2 py-1 border-2 border-gray-200 rounded focus:outline-black"
                        type="text"
                        placeholder="Year Published"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        className="w-full max-w-md px-2 py-1 border-2 border-gray-200 rounded focus:outline-black"
                        type="text"
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </label>
                <div className="flex justify-end gap-2 mt-2">
                    <button
                        type="submit"
                        className="bg-[#7CC563] px-6 py-1 rounded focus:outline-black"
                        disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                        type="button"
                        className="bg-[#FF7676] px-6 py-1 rounded focus:outline-black"
                        onClick={() => navigate("/")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditForm;
