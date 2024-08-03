import { useState, useEffect } from "react";
import useBooks from "../hooks/useBooks";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "../spinner.css";

const Books = () => {
    const [openedBook, setOpenedBook] = useState("none");
    const [isLoading, setIsLoading] = useState(true);
    const { books, fetchBooks, deleteBook } = useBooks();
    const navigate = useNavigate();
    const spineColors = ["#FEC870", "#FF7676", "#E3ED8D", "#02D3FE", "#B591FB"];

    // Fetch books from Zustand store
    useEffect(() => {
        const loadBooks = async () => {
            setIsLoading(true);
            await fetchBooks();
            setIsLoading(false);
        };
        loadBooks();
    }, [fetchBooks]);

    // Toggle to track if book is open or closed
    const toggleBookOpen = (bookTitle) => {
        if (openedBook === bookTitle) {
            setOpenedBook("none");
        } else {
            setOpenedBook(bookTitle);
        }
    };

    // Edit book
    const handleEdit = (event, id) => {
        event.stopPropagation();
        navigate(`/edit/${id}`);
    };

    // Delete book from store
    const handleDelete = async (event, id) => {
        event.stopPropagation();
        if (window.confirm("Are you sure?")) {
            await deleteBook(id);
        }
        setOpenedBook("none");
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div
            className={`flex flex-wrap gap-6 ${
                openedBook === "none" ? "justify-start" : "justify-center"
            }`}
            style={{ perspective: "1000px" }}>
            {books.map((book, index) => {
                const isOpened = openedBook === book.title;
                const shouldShow = openedBook === "none" || isOpened;

                // Select a color for the spine using the index
                const spineColor = spineColors[index % spineColors.length];
                return (
                    <div
                        key={index}
                        className={`relative cursor-pointer mt-8 hover:mt-4 transition-all duration-300 ${
                            shouldShow ? "block" : "hidden"
                        } ${
                            isOpened ? "w-96 hover:mt-8" : "w-14"
                        } overflow-hidden`}
                        onClick={() => toggleBookOpen(book.title)}>
                        <div
                            className={`h-56 w-12 z-10 relative pt-2 text-center whitespace-nowrap text-black transition-transform duration-300 ${
                                isOpened
                                    ? "rotate-y-65 translate-z-4"
                                    : "rotate-y-0 translate-z-0"
                            }`}
                            style={{
                                backgroundColor: spineColor,
                            }}>
                            <p className="transform rotate-90 pl-4 font-bold">
                                {book.title}
                            </p>
                        </div>
                        <div
                            className={`bg-white h-56 w-36 absolute top-0 left-8 transition-transform duration-300 transform origin-left ${
                                isOpened ? "rotate-y-0" : "-rotate-y-90"
                            } overflow-visible`}>
                            <img
                                src={book.cover}
                                className="object-cover h-full w-full"
                                style={{
                                    clipPath: isOpened ? "none" : "inset(0)",
                                }}
                                alt={book.title}
                            />
                            <div className="absolute top-0 left-40 flex flex-col w-full h-full justify-between">
                                <div>
                                    <p className="font-semibold text-xl">
                                        {book.title}
                                    </p>
                                    <p>{book.author}</p>
                                    <p>{book.year}</p>
                                </div>
                                <div
                                    className="flex items-center justify-center py-1 w-min px-2 mt-6 rounded"
                                    style={{
                                        backgroundColor: spineColor,
                                    }}>
                                    {book.genre}
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        className="flex rounded-full items-center justify-center w-10 h-10 bg-black text-white"
                                        onClick={(e) => handleEdit(e, book.id)}>
                                        <FaRegEdit size={20} />
                                    </button>
                                    <button
                                        className="flex rounded-full items-center justify-center w-10 h-10 bg-red-400 text-red-800 z-10"
                                        onClick={(e) =>
                                            handleDelete(e, book.id)
                                        }>
                                        <FaRegTrashAlt size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Books;
