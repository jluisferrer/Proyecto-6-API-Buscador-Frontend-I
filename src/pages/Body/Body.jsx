import { Routes, Route } from "react-router-dom";
import { Home } from "../Home/Home";
import { Register } from "../Register/Register";

export const Body = () => {
    return (
        <Routes>
            {/*Aqui iran cada una de las rutas a las vistas */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}