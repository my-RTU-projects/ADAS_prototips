import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const Home = () => {
    return (
        <div id="root">
            <Header/>
            <Outlet />
        </div>
    );
}

export default Home;