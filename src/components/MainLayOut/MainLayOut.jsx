import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const MainLayOut = () => {
    return (
        <div>

            <Header/>

            <Outlet></Outlet>
            
        </div>
    );
};

export default MainLayOut;