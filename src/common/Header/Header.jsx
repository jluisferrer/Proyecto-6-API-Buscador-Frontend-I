import { Navigator } from "../Navigator/Navigator";
import { useNavigate } from "react-router-dom";
import "./Header.css"

export const Header = () => {
    const navigate = useNavigate()
    const passport = JSON.parse(localStorage.getItem("passport"))
    const logOut = () => {
        localStorage.removeItem("passport")
        navigate("/login")
    }
    return (
        <div className="headerDesign">
            <img className="logo" src="src/img/logo2.jpg" alt="Logo de la empresa" />
            <Navigator title={"Home"} destination={"/"} />
            <Navigator title={"Servicios"} destination={"/services"} />
            {passport?.token ? (
                <div className="authMenu">
                    <Navigator title={"Mis citas"} destination={"/appointments"} />
                    <Navigator title={passport?.decodificado?.name} destination={"/profile"} />
                    <div onClick={logOut}>
                        <Navigator title={"Log out"} destination={"/"} />
                    </div>
                </div>) : (
                <div className="authMenu">
                    <Navigator title={"Registrar"} destination={"/register"} />
                    <Navigator title={"Login"} destination={"/login"} />
                </div>
            )}
            {passport?.token && passport?.decodificado?.roleName === "super_admin" ? (<div className="authMenu">
                <Navigator title={"ADMINISTRACION"} destination={"/superadmin"} />
            </div>) : <div className="authMenu"></div>}
        </div>
    )
}