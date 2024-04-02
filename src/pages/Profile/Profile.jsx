import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"
import { GetProfile, UpdateProfile } from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";
import { validame } from "../../utils/function";
import { Header } from "../../common/Header/Header";
import { CButton } from "../../common/CButton/CButton";



export const Profile = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"))
    const navigate = useNavigate()
    const [write, setWrite] = useState("disabled")
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token)
    const [loadedData, setLoadedData] = useState(false)
    const [user, setUser] = useState({
        name: "",
        lastName: "",
        email: "",
    })


    const [userError, setUserError] = useState({
        nameError: "",
        lastNameError: "",
        emailError: "",
    })

    const [msgError, setMsgError] = useState("")

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const checkError = (e) => {
        const error = validame(e.target.name, e.target.value)

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }))
    }
    useEffect(() => {
        if (!tokenStorage) {
            navigate("/")
        }
    }, [tokenStorage])

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const fetched = await GetProfile(tokenStorage);
                setLoadedData(true);
                setUser({
                    name: fetched.data.name,
                    lastName: fetched.data.lastName,
                    email: fetched.data.email,
                });
            } catch (error) {
                setMsgError(error.message);
            }
        };
        if (!loadedData) {
            getUserProfile();
        }
    }, [user]);

    const updatedData = async () => {
        try {
            const fetched = await UpdateProfile(tokenStorage, user)
            if (fetched) {
                setUser({
                    name: fetched.data.name,
                    lastName: fetched.data.lastName,
                    email: fetched.data.email
                });
                setWrite("disabled");
            }
        } catch (error) {
            setMsgError(error.message);
        }
    }
    return (
        <>
            <Header />
            <div className="profileDesign">
                {
                    !loadedData
                        ? (<div>LOADING</div>)
                        : (<div>
                            <CInput
                                className={`inputDesign ${userError.nameError !== "" ? "inputDesignError" : ""
                                    }`}
                                type={"text"}
                                placeholder={""}
                                name={"name"}
                                disabled={write}
                                value={user.name || ""}
                                onChangeFunction={(e) => inputHandler(e)}
                                onBlurFunction={(e) => checkError(e)}
                            />
                            <CInput
                                className={`inputDesign ${userError.lastNameError !== "" ? "inputDesignError" : ""
                                    }`}
                                type={"text"}
                                placeholder={""}
                                name={"lastName"}
                                disabled={write}
                                value={user.lastName || ""}
                                onChangeFunction={(e) => inputHandler(e)}
                                onBlurFunction={(e) => checkError(e)}
                            />
                            <CInput
                                className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                                    }`}
                                type={"email"}
                                placeholder={""}
                                name={"email"}
                                disabled={write}
                                value={user.email || ""}
                                onChangeFunction={(e) => inputHandler(e)}
                                onBlurFunction={(e) => checkError(e)}
                            />
                            <CButton
                                className={write === "" ? "cButtonGreen cButtonDesign" : "cButtonDesign"}
                                title={write === "" ? "Confirmar" : "Editar"}
                                functionEmit={write === "" ? updatedData : () => setWrite("")}
                            />
                        </div>)
                }
            </div>
        </>
    );
};