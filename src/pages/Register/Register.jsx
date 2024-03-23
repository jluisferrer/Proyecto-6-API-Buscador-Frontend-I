import { useState, useEffect } from "react";

import "./Register.css"
import { CInput } from "../../common/CInput/CInput";

export const Register = () => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password_hash: ""
    })

    //funcion emit que esta aqui en el padre.. se le pasa a custom input

    const inputHandler = (e) => {
        //procedo a bindear
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="registerDesign">
            <CInput
                className={"inputDesign"}
                type={"text"}
                placeholder={"first_name"}
                name={"first_name"}
                value={user.first_name || ""}
                onChangeFunction={(e) => inputHandler(e)}
            />
            <CInput
                className={"inputDesign"}
                type={"text"}
                placeholder={"last_name"}
                name={"last_name"}
                value={user.last_name || ""}
                onChangeFunction={(e) => inputHandler(e)}
            />
            <CInput
                className={"inputDesign"}
                type={"email"}
                placeholder={"email"}
                name={"email"}
                value={user.email || ""}
                onChangeFunction={(e) => inputHandler(e)}
            />
            <CInput
                className={"inputDesign"}
                type={"password"}
                placeholder={"password"}
                name={"password_hash"}
                value={user.password_hash || ""}
                onChangeFunction={(e) => inputHandler(e)}
            />
        </div>
    )
}