import BackBtn from "../components/BackBtn";
import AddForm from "../components/AddForm";

function AddView() {
    return (
        <>
            <div className="flex h-screen items-center justify-center">
                <BackBtn />
                <div className="w-full max-w-md p-4">
                    <AddForm />
                </div>
            </div>
        </>
    );
}

export default AddView;
