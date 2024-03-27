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
            <Navigator title={"Home"} destination={"/"} />
            <Navigator title={"Services"} destination={"/services"} />
            {passport?.token ? (
                <div className="authMenu">
                    <Navigator
                        title={passport?.decodificado?.name}
                        destination={"/profile"} />
                    <div onClick={logOut}>
                        <Navigator title={"Log out"} destination={"/"} />
                    </div>
                </div>) : (
                <div className="authMenu">
                    <Navigator title={"Register"} destination={"/register"} />
                    <Navigator title={"Login"} destination={"/login"} />
                </div>
            )}
        </div>
    )
}