import { Route, Routes } from "react-router-dom";

import HomeView from "./pages/HomeView";
import AddView from "./pages/AddView";
import EditView from "./pages/EditView";

function App() {
    return (
        <div className="mx-10">
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/add" element={<AddView />} />
                <Route path="/edit/:id" element={<EditView />} />
            </Routes>
        </div>
    );
}

export default App;
