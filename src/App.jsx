import React, {useState} from "react";
import Login from "./components/Login"
import Dashboard from "./components/Dashboard";

export default function App(){
    const [currentPage, setCurrentPage] = useState("login");
    return(
        <>
            {(currentPage === "login") &&
            <Login navigatePage={()=>setCurrentPage("dashboard")}></Login>
            }

            {(currentPage === "dashboard") &&
            <Dashboard navigatePage={()=>setCurrentPage("login")}></Dashboard>
            }
        </>
    );
}