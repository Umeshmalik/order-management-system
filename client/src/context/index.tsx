import React, { useState, useEffect, createContext, FC, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserInfo } from "../types";

export const UserContext = createContext<UserInfo>({});
const ALLOWED_PATHS = ["/user/signin", "/user/signup"];

const UserProvider: FC<{children: ReactNode}> = (props) => {
    const [user, setUser] = useState<UserInfo>({});
    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const stringified = localStorage.getItem("userInfo") || "";
        const userInfo = stringified ? JSON.parse(stringified) : {};
        setUser({token, ...userInfo});

        if (!token && !ALLOWED_PATHS.includes(location.pathname)) {
            navigate("/user/signin");
        }
        if(token && ALLOWED_PATHS.includes(location.pathname)){
            navigate("/")
        }

    }, [navigate]);

    return (
        <>
            <UserContext.Provider
                value={user}
            >
                {props.children}
            </UserContext.Provider>
        </>
    );
};

export default UserProvider;