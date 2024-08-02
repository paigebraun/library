import { Route, Routes } from "react-router-dom";

import HomeView from "./pages/HomeView";
import AddView from "./pages/AddView";

function App() {
    return (
        <div className="mx-10">
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/add" element={<AddView />} />
            </Routes>
        </div>
    );
}

export default App;
