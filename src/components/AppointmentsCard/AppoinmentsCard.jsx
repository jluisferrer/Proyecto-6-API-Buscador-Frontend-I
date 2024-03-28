import "./AppoinmentsCard.css"

export const AppointmentsCard = ({service_id, appointmentDate, appointmentId}) =>{
    return(
        <div className="appoinmentsCardDesign">
            <div>{service_id}</div>
            <div>{appointmentDate}</div>
            <div>{appointmentId}</div>
        </div>
    )
}