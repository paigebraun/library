import { useNavigate } from "react-router-dom";

function AddForm() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col p-4">
            <h1 className="font-bold text-3xl mb-4">Add Book</h1>
            <form className="flex flex-col gap-2">
                <label>
                    <input
                        className="w-full max-w-md px-2 text-lg border-2 border-gray-200 rounded focus:outline-black"
                        type="text"
                        placeholder="Title"
                    />
                </label>
                <label>
                    <input
                        className="w-full max-w-md px-2 text-lg border-2 border-gray-200 rounded focus:outline-black"
                        type="text"
                        placeholder="Author"
                    />
                </label>
                <label>
                    <input
                        className="w-full max-w-md px-2 text-lg border-2 border-gray-200 rounded focus:outline-black"
                        type="text"
                        placeholder="Year Published"
                    />
                </label>
                <label>
                    <input
                        className="w-full max-w-md px-2 text-lg border-2 border-gray-200 rounded focus:outline-black"
                        type="text"
                        placeholder="Genre"
                    />
                </label>
                <div className="flex justify-end gap-4 mt-2">
                    <button className="bg-[#7CC563] px-6 py-2 rounded focus:outline-black">
                        Save
                    </button>
                    <button
                        className="bg-[#FF7676] px-6 py-2 rounded focus:outline-black"
                        onClick={() => navigate("/")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddForm;
