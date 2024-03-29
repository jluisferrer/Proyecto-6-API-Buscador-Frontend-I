import "./AppoinmentsCard.css"

export const AppointmentsCard = ({ service_id, appointmentDate, appointmentId, onDelete }) => {
    return (
        <div className="appoinmentsCardDesign">
            <div>{service_id}</div>
            <div>{appointmentDate}</div>
            <button className="deleteDesign" onClick={() => onDelete(appointmentId)}>Anular cita</button>
        </div>
    )
}

