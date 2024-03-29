import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointments.css"
import { GetAppointments, PostAppointments } from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";
import { validame } from "../../utils/function";
import { CButton } from "../../common/CButton/CButton";
import { AppointmentsCard } from "../../components/AppointmentsCard/AppoinmentsCard";
import { Header } from "../../common/Header/Header";

export const Appointments = () => {
    const navigate = useNavigate()
    const datosUser = JSON.parse(localStorage.getItem("passport"))
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token)
    const [appointments, setAppointments] = useState([])
    const [appointmentsData, setAppointmentsData] = useState({
        appointmentDate: "",
        service_id: ""
    })

    const appointmentsInputHandler = (e) => {
        setAppointmentsData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const [write, setWrite] = useState("disabled")
    const [loadedData, setLoadedData] = useState(true)
    useEffect(() => {
        const RecoverData = async () => {
            try {
                const fetched = await GetAppointments(tokenStorage);
                setAppointments(fetched.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (appointments?.length === 0) {
            RecoverData();
        }
    }, [appointments, tokenStorage]);

    const putAppointment = async () => {
        try {
            const fetched = await PostAppointments(tokenStorage, appointmentsData);
            console.log(fetched)
            if (fetched.success) {
                navigate("/appointments");
            } else {
                console.error(fetched.message);
            }
        } catch (error) {
            console.error(error);
            setMsgError(error.message);
        }
    };
    return (
        <>
            <Header />
            <div className="appointmentsDesign"><p>Sus proximas citas</p>
                {appointments?.map(
                    appointment => {
                        return (
                            <AppointmentsCard
                                key={appointment.id}
                                service_id={appointment.service.serviceName}
                                appointmentDate={appointment.appointmentDate}
                                onDelete={funcionDelete}
                            />
                        )
                    }
                )
                }
                {!loadedData
                    ? (<div>LOADING</div>)
                    : (<div>
                        <p>Reserve ahora su cita</p>
                        {/* <pre>{JSON.stringify(appointmentsData, null, 2)}</pre> */}
                        <CInput
                            className={`inputDesign`}
                            type={"date"}
                            placeholder={""}
                            name={"appointmentDate"}
                            value={appointmentsData.appointmentDate || ""}
                            onChangeFunction={(e) => appointmentsInputHandler(e)}
                        />
                        <CInput
                            className={`inputDesign`}
                            type={"text"}
                            placeholder={"Service Id"}
                            name={"service_id"}
                            value={appointmentsData.service_id || ""}
                            onChangeFunction={(e) => appointmentsInputHandler(e)}
                        />
                        <CButton
                            className={write === "" ? "cButtonGreen cButtonDesign" : "cButtonDesign"}
                            title={write === "" ? "Confirmar" : "Reservar"}
                            functionEmit={write === "" ? putAppointment : () => setWrite("")}
                        />
                    </div>)
                }
            </div>
        </>
    );
}