import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useBooks from "../hooks/useBooks";

import "../spinner.css";

function AddForm() {
    const navigate = useNavigate();
    const { addBook } = useBooks();
    const [isSaving, setIsSaving] = useState(false);

    // State for form inputs
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [genre, setGenre] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a new book object
        const newBook = {
            title,
            author,
            year,
            genre,
        };

        try {
            setIsSaving(true);
            // Add new book to store
            await addBook(newBook);
            navigate("/");
        } catch (error) {
            console.log("Failed to add book:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isSaving) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col p-4">
            <h1 className="font-bold text-3xl mb-4">Add Book</h1>
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

export default AddForm;
