import Books from "../components/Books";
import AddBtn from "../components/AddBtn";

function HomeView() {
    return (
        <div className="relative h-[90vh]">
            <h1 className="font-semibold text-3xl mt-10">Library</h1>
            <Books />
            <AddBtn />
        </div>
    );
}

export default HomeView;
