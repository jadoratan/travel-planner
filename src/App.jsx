import React, {useState} from "react";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

export default function App(){
    const [currentPage, setCurrentPage] = useState("login");
    const [userId, setUserId] = useState(null);
    return(
        <>
            {(currentPage === "login") &&
                <Login navigatePage={setCurrentPage} onLogin={setUserId} />
            }

            {(currentPage === "dashboard") &&
                <Dashboard navigatePage={setCurrentPage} userId={userId} />
            }

            {(currentPage === "signup") &&
                <Signup navigatePage={setCurrentPage} />
            }
        </>
    );
}