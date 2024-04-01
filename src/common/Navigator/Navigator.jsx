import "./Navigator.css"
import { useNavigate } from "react-router-dom";

export const Navigator = ({ title, destination }) => {
    const navigate = useNavigate()

    return (
        <div className="navigatorDesign" onClick={() => navigate(destination)}>
            {title}
        </div>
    )
}