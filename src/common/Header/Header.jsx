import { Navigator } from "../Navigator/Navigator";
import "./Header.css"

export const Header = () => {
    const token = false

    const logOut = () => {
        //Funcion para desloguear..
    }
    return (
        <div className="headerDesign">
            <Navigator title={"home"} destination={"/"} />

            {token ? (
                <div>
                    <Navigator title={"nickdelusuario"} destination={"/"} />
                    <Navigator title={"log out"} onClick={() => logOut()} />
                </div>) : (
                <div>
                    <Navigator title={"register"} destination={"/register"} />
                </div>
            )}
        </div>
    )
}