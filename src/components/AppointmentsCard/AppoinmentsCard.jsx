import "./AppoinmentsCard.css"

export const AppointmentsCard = ({ service_id, appointmentDate, appointmentId, onDelete }) => {
    return (
        <div className="appoinmentsCardDesign">
            <div>Nombre del servicio: {service_id}</div>
            <div>Fecha de la cita: {appointmentDate}</div>
            <div>ID de la cita: {appointmentId}</div>
            <button className="deleteDesign" onClick={() => onDelete(appointmentId)}>Anular cita</button>
        </div>
    )
}

