import BackBtn from "../components/BackBtn";
import BookForm from "../components/BookForm";

function AddView() {
    return (
        <>
            <div className="flex h-screen items-center justify-center">
                <BackBtn />
                <div className="w-full max-w-md p-4">
                    <BookForm isEditing={false} />
                </div>
            </div>
        </>
    );
}

export default AddView;
