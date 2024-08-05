import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function BackBtn() {
    const navigate = useNavigate();

    return (
        <button
            className="flex mt-10 items-center absolute top-0 left-6 justify-center bg-black drop-shadow-md hover:scale-110 rounded-full w-8 h-8 text-white"
            onClick={() => navigate("/")}>
            <FaArrowLeft size={20} />
        </button>
    );
}

export default BackBtn;
