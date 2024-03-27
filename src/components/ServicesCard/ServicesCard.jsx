import "./ServicesCard.css"

export const ServicesCard = ({ id, serviceName, description }) => {

    return (
        <div className="servicesCardDesign">
            <h3>{serviceName}</h3>
            <p>ID del servicio: {id}</p>
            <p>{description}</p>
        </div>
    )
}