import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddBtn() {
    const navigate = useNavigate();

    return (
        <button
            className="absolute bottom-0 right-0 bg-black drop-shadow-lg w-12 h-12 hover:scale-110 rounded-full flex items-center justify-center text-white"
            onClick={() => navigate("/add")}>
            <FaPlus size={25} />
        </button>
    );
}

export default AddBtn;
