import { useState, useEffect } from "react";

const Books = () => {
    const [openedBook, setOpenedBook] = useState("none");
    const [books, setBooks] = useState([]);

    const spineColors = ["#FEC870", "#E3ED8D", "#FF7676", "#02D3FE", "#B591FB"];

    // Fetch books from server
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(`http://localhost:3000/books`);
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, []);

    // Toggle to track if book is open or closed
    const toggleBookOpen = (bookTitle) => {
        if (openedBook === bookTitle) {
            setOpenedBook("none");
        } else {
            setOpenedBook(bookTitle);
        }
    };

    return (
        <div
            className={`flex flex-wrap mt-4 ${
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
                        className={`relative mt-4 cursor-pointer transition-all duration-300 ${
                            shouldShow ? "block" : "hidden"
                        } ${isOpened ? "w-96" : "w-14"} overflow-hidden`}
                        onClick={() => toggleBookOpen(book.title)}>
                        <div
                            className={`h-56 w-8 text-center whitespace-nowrap text-black transition-transform duration-300 ${
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
                            className={`bg-white h-56 w-36 absolute top-0 left-6 transition-transform duration-300 transform origin-left ${
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
                            <div className="absolute top-0 left-40 flex flex-col whitespace-nowrap">
                                <p className="font-semibold text-xl">
                                    {book.title}
                                </p>
                                <p>{book.author}</p>
                                <p>{book.year}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Books;
