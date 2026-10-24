import React, {useState} from "react";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

export default function App(){
    const [currentPage, setCurrentPage] = useState("login");
    return(
        <>
            {(currentPage === "login") &&
                <Login navigatePage={setCurrentPage} />
            }

            {(currentPage === "dashboard") &&
                <Dashboard navigatePage={setCurrentPage} />
            }

            {(currentPage === "signup") &&
                <Signup navigatePage={setCurrentPage} />
            }
        </>
    );
}