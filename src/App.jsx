import React, {useState} from "react";
import Login from "./components/Login"
import Dashboard from "./components/Dashboard";

export default function App(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return(
        <Login></Login>
    );
}