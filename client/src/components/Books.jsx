import { useState, useEffect } from "react";
import useBooks from "../hooks/useBooks";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeletePopup from "./DeletePopup";
import "../spinner.css";

const Books = () => {
    const [openedBook, setOpenedBook] = useState("none");
    const [isLoading, setIsLoading] = useState(true);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

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
        setOpenedBook(openedBook === bookTitle ? "none" : bookTitle);
    };

    // Edit book
    const handleEdit = (event, id) => {
        event.stopPropagation();
        navigate(`/edit/${id}`);
    };

    // Delete book from store
    const handleDelete = (event, book) => {
        event.stopPropagation();
        setBookToDelete(book);
        setShowDeletePopup(true);
    };

    const confirmDelete = async () => {
        if (bookToDelete) {
            await deleteBook(bookToDelete.id);
            setBookToDelete(null);
            setShowDeletePopup(false);
            setOpenedBook("none");
        }
    };

    const cancelDelete = () => {
        setBookToDelete(null);
        setShowDeletePopup(false);
    };

    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            (text) =>
                text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div
            className={`flex flex-wrap gap-2 md:gap-0 ${
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
                        className={`relative cursor-pointer mt-4 md:mt-8 hover:mt-2 md:hover:mt-4 transition-all duration-300 ${
                            shouldShow ? "block" : "hidden"
                        } ${
                            isOpened
                                ? "w-56 md:w-96 hover:mt-4"
                                : "w-16 md:w-24"
                        }`}
                        onClick={() => toggleBookOpen(book.title)}>
                        <div
                            className={`h-40 md:h-56 w-10 md:w-12 z-10 relative pt-2 text-center overflow-hidden whitespace-nowrap text-black transition-transform duration-300 ${
                                isOpened
                                    ? "rotate-y-65 translate-z-4"
                                    : "rotate-y-0 translate-z-0"
                            }`}
                            style={{
                                backgroundColor: spineColor,
                            }}>
                            <p
                                className={`font-semibold transform rotate-90 pl-2 md:pl-4 font-bold ${
                                    book.title.length > 25
                                        ? "text-xs md:text-sm"
                                        : "text-sm md:text-md"
                                }`}>
                                {toTitleCase(book.title)}
                            </p>
                        </div>
                        <div
                            className={`bg-white h-40 md:h-56 w-24 md:w-36 absolute top-0 left-6 md:left-8 transition-transform duration-300 transform origin-left ${
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
                            <div className="absolute top-0 left-28 md:left-40 flex flex-col w-[150%] h-full justify-between">
                                <div>
                                    <p
                                        className={`font-semibold ${
                                            book.title.length > 25
                                                ? "text-base md:text-lg"
                                                : "text-lg md:text-xl"
                                        }`}>
                                        {toTitleCase(book.title)}
                                    </p>
                                    <p className="text-sm md:text-base">
                                        {toTitleCase(book.author)}
                                    </p>
                                    <p className="text-sm md:text-base">
                                        {book.year}
                                    </p>
                                </div>
                                <div
                                    className="flex items-center justify-center py-1 w-min px-2 mt-4 md:mt-6 rounded"
                                    style={{
                                        backgroundColor: spineColor,
                                    }}>
                                    <p className="text-sm md:text-base">
                                        {toTitleCase(book.genre)}
                                    </p>
                                </div>
                                <div className="flex gap-2 md:gap-4 mt-4">
                                    <button
                                        className="flex rounded-full items-center justify-center w-8 md:w-10 h-8 md:h-10 bg-black text-white z-10 shadow-md hover:scale-110"
                                        onClick={(e) => handleEdit(e, book.id)}>
                                        <FaRegEdit size={16} />
                                    </button>
                                    <button
                                        className="flex rounded-full items-center justify-center w-8 md:w-10 h-8 md:h-10 bg-red-400 text-red-800 z-10 shadow-md hover:scale-110"
                                        onClick={(e) => handleDelete(e, book)}>
                                        <FaRegTrashAlt size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            {showDeletePopup && (
                <DeletePopup
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
};

export default Books;
