import { useEffect, useState } from "react";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { validame } from "../../utils/function";
import "./Login.css";
import { LoginUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { Header } from "../../common/Header/Header";


export const Login = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"))
    const navigate = useNavigate()
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token)

    const [credenciales, setCredenciales] = useState({
        email: "",
        password_hash: ""
    })

    const [credencialesError, setCredencialesError] = useState({
        emailError: "",
        password_hashError: ""
    })

    const [msgError, setMsgError] = useState("")

    useEffect(() => {
        if (tokenStorage) {
            navigate("/");
        }
    }, [tokenStorage]);

    const inputHandler = (e) => {
        setCredenciales((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const checkError = (e) => {
        const error = validame(e.target.name, e.target.value)

        setCredencialesError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
            //el truco del almen nos dice que seria.. nameError:error, o emailError:error
        }))
    }

    const loginMe = async () => {
        try {
            for (let elemento in credenciales) {
                if (credenciales[elemento] === "") {
                    throw new Error("All fields must be filled out");
                }
            }

            const fetched = await LoginUser(credenciales);

            const decodificado = decodeToken(fetched.token)

            const passport = {
                token: fetched.token,
                decodificado: decodificado,
            }

            localStorage.setItem("passport", JSON.stringify(passport))

            console.log(decodificado)

            setMsgError(`Hello ${decodificado.name}, welcome`)

            setTimeout(() => {
                navigate("/")
            }, 2000)

        } catch (error) {
            setMsgError(error.message);
        }
    };
    return (
        <>
            <Header />
            <div className="loginDesign">
                <CInput
                    className={`inputDesign ${credencialesError.emailError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"email"}
                    placeholder={"email"}
                    name={"email"}
                    disabled={""}
                    value={credenciales.email || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{credencialesError.emailError}</div>
                <CInput
                    className={`inputDesign ${credencialesError.password_hashError !== "" ? "inputDesignError" : ""
                        }`}
                    type={"password"}
                    placeholder={"password"}
                    name={"password_hash"}
                    disabled={""}
                    value={credenciales.password_hash || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{credencialesError.password_hashError}</div>
                <CButton
                    className={"cButtonDesign"}
                    title={"Login"}
                    functionEmit={loginMe}
                />
                <div className="error">{msgError}</div>
            </div>
        </>

    )
};