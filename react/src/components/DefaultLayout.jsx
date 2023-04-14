import {Outlet} from "react-router-dom";

export default function DefaultLayout() {

    return (
        <div>
            <header>

            </header>
            <main>
                <Outlet />
            </main>

        </div>
    )
}
