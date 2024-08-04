import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useBooks from "../hooks/useBooks";

import "../spinner.css";

function BookForm({ isEditing }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const { books, addBook, updateBook, fetchBooks } = useBooks((state) => ({
        books: state.books,
        addBook: state.addBook,
        updateBook: state.updateBook,
        fetchBooks: state.fetchBooks,
    }));

    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(isEditing && !book);
    const [isSaving, setIsSaving] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [genre, setGenre] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditing) {
            const fetchBookData = async () => {
                if (books.length === 0) {
                    await fetchBooks();
                }
                const foundBook = books.find((b) => b.id === id);
                if (foundBook) {
                    setBook(foundBook);
                    setTitle(foundBook.title);
                    setAuthor(foundBook.author);
                    setYear(foundBook.year);
                    setGenre(foundBook.genre);
                }
                setIsLoading(false);
            };
            fetchBookData();
        }
    }, [id, books, fetchBooks, isEditing]);

    const validate = () => {
        const errors = {};
        if (!title.trim()) errors.title = "Title is required.";
        if (!author.trim()) errors.author = "Author is required.";
        if (
            !year.trim() ||
            isNaN(year) ||
            year < 1000 ||
            year > new Date().getFullYear()
        ) {
            errors.year =
                "Year must be a valid number between 1000 and the current year.";
        }
        if (!genre.trim()) errors.genre = "Genre is required.";
        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const bookData = { title, author, year, genre };

        try {
            setIsSaving(true);
            if (isEditing) {
                await updateBook({ ...bookData, id });
            } else {
                await addBook(bookData);
            }
            navigate("/");
        } catch (error) {
            console.log(
                isEditing ? "Failed to update book:" : "Failed to add book:",
                error
            );
        } finally {
            setIsSaving(false);
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
            <h1 className="font-bold text-3xl mb-4">
                {isEditing ? "Edit Book" : "Add Book"}
            </h1>
            <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit}
                noValidate>
                <label>
                    <input
                        className={`w-full max-w-md px-2 py-1 border-2 border-gray-200 rounded focus:outline-black ${
                            errors.title ? "border-red-500" : ""
                        }`}
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setErrors((prevErrors) => ({
                                ...prevErrors,
                                title: "",
                            }));
                        }}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title}</p>
                    )}
                </label>
                <label>
                    <input
                        className={`w-full max-w-md px-2 py-1 border-2 border-gray-200 rounded focus:outline-black ${
                            errors.author ? "border-red-500" : ""
                        }`}
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => {
                            setAuthor(e.target.value);
                            setErrors((prevErrors) => ({
                                ...prevErrors,
                                author: "",
                            }));
                        }}
                    />
                    {errors.author && (
                        <p className="text-red-500 text-sm">{errors.author}</p>
                    )}
                </label>
                <label>
                    <input
                        className={`w-full max-w-md px-2 py-1 border-2 border-gray-200 rounded focus:outline-black ${
                            errors.year ? "border-red-500" : ""
                        }`}
                        type="number"
                        min={1000}
                        max={new Date().getFullYear()}
                        placeholder="Year Published"
                        value={year}
                        onChange={(e) => {
                            setYear(e.target.value);
                            setErrors((prevErrors) => ({
                                ...prevErrors,
                                year: "",
                            }));
                        }}
                    />
                    {errors.year && (
                        <p className="text-red-500 text-sm">{errors.year}</p>
                    )}
                </label>
                <label>
                    <input
                        className={`w-full max-w-md px-2 py-1 border-2 border-gray-200 rounded focus:outline-black ${
                            errors.genre ? "border-red-500" : ""
                        }`}
                        type="text"
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => {
                            setGenre(e.target.value);
                            setErrors((prevErrors) => ({
                                ...prevErrors,
                                genre: "",
                            }));
                        }}
                    />
                    {errors.genre && (
                        <p className="text-red-500 text-sm">{errors.genre}</p>
                    )}
                </label>
                <div className="flex justify-end gap-4 mt-2">
                    <button
                        type="submit"
                        className="bg-green-400 font-bold text-green-800 px-6 py-1 rounded focus:outline-black hover:scale-110"
                        disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                        type="button"
                        className="bg-red-400 text-red-800 font-bold px-6 py-1 rounded focus:outline-black hover:scale-110"
                        onClick={() => navigate("/")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookForm;
