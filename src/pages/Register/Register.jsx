import { useState, useEffect } from "react";
import "./Register.css"
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { RegisterUser } from "../../services/apiCalls";
import { validame } from "../../utils/function";

export const Register = () => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password_hash: ""
    })

    const [userError, setUserError] = useState({
        first_nameError: "",
        last_nameError: "",
        emailError: "",
        password_hashError: ""
    })

    const [msgError, setMsgError] = useState("")

    //funcion emit que esta aqui en el padre.. se le pasa a custom input
    const inputHandler = (e) => {
        //procedo a bindear
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const checkError = (e) => {
        const error = validame(e.target.name, e.target.value)

        console.log(error)
    }
    //function emit que también esta aqui en el padre.. en este caso para registrar
    const registerMe = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("All fields must be filled out")
                }
            }

            const fetched = await RegisterUser()
            console.log(fetched)
        } catch (error) {
            setMsgError(error.message)
        }
    }
    return (
        <div className="registerDesign">
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <CInput
                className={"inputDesign"}
                type={"text"}
                placeholder={"first_name"}
                name={"first_name"}
                value={user.first_name || ""}
                onChangeFunction={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
            />
            {userError.first_nameError}
            <CInput
                className={"inputDesign"}
                type={"text"}
                placeholder={"last_name"}
                name={"last_name"}
                value={user.last_name || ""}
                onChangeFunction={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
            />
            {userError.last_nameError}
            <CInput
                className={"inputDesign"}
                type={"email"}
                placeholder={"email"}
                name={"email"}
                value={user.email || ""}
                onChangeFunction={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
            />
            {userError.emailError}
            <CInput
                className={"inputDesign"}
                type={"password"}
                placeholder={"password"}
                name={"password_hash"}
                value={user.password_hash || ""}
                onChangeFunction={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
            />
            {userError.password_hashError}
            <CButton
                className={"cButtonDesign"}
                title={"Register"}
                functionEmit={registerMe}
            />
            {msgError}
        </div>
    )
}