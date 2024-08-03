import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useBooks from "../hooks/useBooks";

function AddForm() {
    const navigate = useNavigate();
    const { addBook } = useBooks();

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
            // Add new book to store
            await addBook(newBook);
            navigate("/");
        } catch (error) {
            console.log("Failed to add book:", error);
        }
    };

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
                <div className="flex justify-end gap-2 mt-2">
                    <button
                        type="submit"
                        className="bg-[#7CC563] px-6 py-1 rounded focus:outline-black">
                        Save
                    </button>
                    <button
                        className="bg-[#FF7676] px-6 py-1 rounded focus:outline-black"
                        onClick={() => navigate("/")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddForm;
