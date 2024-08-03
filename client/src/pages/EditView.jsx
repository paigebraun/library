import BackBtn from "../components/BackBtn";
import EditForm from "../components/EditForm";

function AddView() {
    return (
        <>
            <div className="flex h-screen items-center justify-center">
                <BackBtn />
                <div className="w-full max-w-md p-4">
                    <EditForm />
                </div>
            </div>
        </>
    );
}

export default AddView;
