import "./Navigator.css"

//para poder navegar se importa el hook useNavigate de react-router-dom
import { useNavigate } from "react-router-dom";

export const Navigator = ({title, destination}) =>{
//se instacia useNavigate en una const para pdoer usarlo
const navigate = useNavigate()

return(
    <div className="navigatorDesign" onClick={()=> navigate(destination)}>
        {title}
    </div>
    )
}