import { useState } from "react";
import "./Register.css"
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { RegisterUser } from "../../services/apiCalls";
import { validame } from "../../utils/function";
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";

export const Register = () => {
    const navigate = useNavigate()

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

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const checkError = (e) => {
        const error = validame(e.target.name, e.target.value)

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }))
    }

    const registerMe = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("All fields must be filled out")
                }
            }
            const fetched = await RegisterUser(user)

            setMsgError(fetched.message)
            setTimeout(() => {
                navigate("/")
            }, 1200)

        } catch (error) {
            setMsgError(error.message)
        }
    }
    return (
        <>
            <Header />
            <div className="registerDesign">
                <CInput
                    className={`inputDesign ${userError.first_nameError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    placeholder={"first_name"}
                    name={"first_name"}
                    value={user.first_name || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.first_nameError}</div>
                <CInput
                    className={`inputDesign ${userError.last_nameError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"text"}
                    placeholder={"last_name"}
                    name={"last_name"}
                    value={user.last_name || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.last_nameError}</div>
                <CInput
                    className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"email"}
                    placeholder={"email"}
                    name={"email"}
                    value={user.email || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.emailError}</div>
                <CInput
                    className={`inputDesign ${userError.password_hashError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"password"}
                    placeholder={"password"}
                    name={"password_hash"}
                    value={user.password_hash || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.password_hashError}</div>
                <CButton
                    className={"cButtonDesign"}
                    title={"Register"}
                    functionEmit={registerMe}
                />
                <div className="error">{msgError}</div>
            </div>
        </>
    )
}