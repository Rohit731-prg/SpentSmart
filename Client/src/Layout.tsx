import { Outlet } from "react-router-dom";
import Navber from "./Components/Navber";

function Layout() {
    return (
        <div className="flex min-h-screen">
            <Navber />

            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;