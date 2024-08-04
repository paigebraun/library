import { useState } from "react";
import Books from "../components/Books";
import AddBtn from "../components/AddBtn";
import { IoSearch } from "react-icons/io5";

function HomeView() {
    const [searchQuery, setSearchQuery] = useState("");
    const [openedBook, setOpenedBook] = useState("none");

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
        setOpenedBook("none");
    };

    return (
        <div className="relative h-[90vh]">
            <div className="flex items-center mt-4">
                <IoSearch />

                <input
                    type="text"
                    placeholder="Search"
                    className="p-2 focus:outline-none"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <h1 className="font-semibold text-3xl mt-4">Library</h1>
            <Books
                searchQuery={searchQuery}
                openedBook={openedBook}
                setOpenedBook={setOpenedBook}
            />
            <AddBtn />
        </div>
    );
}

export default HomeView;
