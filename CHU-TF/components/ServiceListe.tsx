// ServiceListe.tsx
'use client'
import React, { useEffect, useState } from 'react';

interface Service {
    ServiceTitre: string;
    ServiceDescription: string;
    ServiceImage: string;
}

const ServiceListe: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/service');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null); // Close modal
    };

    return (
        <div>
            {loading && (
                <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="sr-only">Chargement...</span>
                    </div>
                </div>
            )}
            {/* Main content */}
            <div className="container-fluid pt-5 mt-5" style={{ paddingTop: '130px' }}>
                <div
                    className="container-fluid"
                    style={{
                        backgroundImage: "url('/img/propos1.jpg')",
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '80vh',
                    }}
                ></div>
                <div className="container-fluid service">
                    <div className="container py-5">
                        <div className="section-title mb-5 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="sub-style">
                                <h1 className="sub-title px-3 mb-0">Service</h1>
                            </div>
                            <p style={{ fontSize: '25px' }}>Nous offrons des services dont les patients ont besoin afin d'éviter des déplacements et de sauver leurs vies rapidement.</p>
                        </div>
                        <div className="row g-4 justify-content-center">
                            {services.map((service, index) => (
                                <div key={index} className="col-md-6 col-lg-3 wow fadeInUp" data-wow-delay="0.3s">
                                    <div className="service-item rounded">
                                        <div className="service-img rounded-top">
                                            <img
                                                src={service.ServiceImage}
                                                className="img-fluid rounded-top w-100 active"
                                                alt={service.ServiceTitre}
                                                style={{ height: '240px', cursor: 'pointer' }}
                                                onClick={() => handleImageClick(service.ServiceImage)}
                                            />
                                        </div>
                                        <div className="service-content rounded-bottom bg-light p-4" style={{ justifyContent: 'space-between' }}>
                                            <div className="service-content-inner" style={{ display: 'flex', flexDirection: 'column', minHeight: '350px' }}>
                                                <h3 className="mb-4">{service.ServiceTitre}</h3>
                                                <p
                                                    className="mb-4"
                                                    style={{
                                                        fontSize: '25px',
                                                        flexGrow: 1,  // Prend l'espace restant pour uniformiser les hauteurs
                                                        maxHeight: '8em',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 8,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}
                                                >
                                                    {service.ServiceDescription}
                                                </p>
                                                <a
                                                    href={`/soin${service.ServiceTitre.replace(/\s+/g, '').toLowerCase()}`}
                                                    className="btn btn-primary rounded-pill text-white py-2 px-4 mt-auto mb-2"
                                                    style={{
                                                        alignSelf: 'flex-start',  // Aligne le bouton en bas à gauche
                                                    }}
                                                >
                                                    Offres de soin
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Modal */}
                {selectedImage && (
                    <div className="modal d-flex align-items-center justify-content-center" style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        zIndex: 2000
                    }}>
                        <span className="close text-white" onClick={closeModal} style={{
                            position: 'absolute',
                            top: '20px',
                            right: '30px',
                            fontSize: '40px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>&times;</span>
                        <img src={selectedImage} alt="Enlarged Service" className="img-fluid" style={{ maxHeight: '90%', maxWidth: '90%' }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceListe;
