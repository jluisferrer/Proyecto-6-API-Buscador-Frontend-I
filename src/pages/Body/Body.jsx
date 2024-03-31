import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { Services } from "../Services/Services";
import { Appointments } from "../Appointments/Appointments";
import { SuperAdminPanel } from "../../pages/SuperAdmin/SuperAdmin";

export const Body = () => {
    return (
        <Routes>
            {/*Aqui iran cada una de las rutas a las vistas */}
            <Route path="*" element={<Navigate to={"/"} replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/services" element={<Services />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/superadmin" element={<SuperAdminPanel />} />
        </Routes>
    )
}