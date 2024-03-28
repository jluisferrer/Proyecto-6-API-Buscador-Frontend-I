import { useState, useEffect } from "react";
import { ServicesCard } from "../../components/ServicesCard/ServicesCard";
import { GetServices } from "../../services/apiCalls";
import "./Services.css";
import { Header } from "../../common/Header/Header";
import { useNavigate } from "react-router-dom";

export const Services = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {                
                const response = await GetServices(); // Esta función debe manejar la conversión de la respuesta a JSON
                if (response.success) {
                    setServices(response.data);
                } else {
                    setError('No se pudieron recuperar los servicios.');
                }
            } catch (error) {
                setError('Error al solicitar los servicios: ' + error.message);
            }
        };

        fetchServices();
    }, []); // Las dependencias están vacías para que el efecto se ejecute solo una vez al montar el componente

    return (
        <>
            <Header />
            <div className="servicesDesign"> 
                {error ? (
                    <p>{error}</p>
                ) : (
                    services.map(service => (
                        <ServicesCard
                            // key={service.id} 
                            id={service.id}
                            serviceName={service.serviceName}
                            description={service.description}
                        />
                    ))
                )}
            </div>
        </>
    );
};