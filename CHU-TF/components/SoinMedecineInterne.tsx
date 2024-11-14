'use client';
import React, { useState, useEffect } from 'react';

interface Soin {
    SoinsId: number;
    SoinsTitre: string;
    SoinsDescription: string;
    SoinsImage: string;
}

const SoinMedecineInterne: React.FC = () => {
    const [soinsData, setSoinsData] = useState<Soin[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/soins-medecine-interne')
            .then((response) => response.json())
            .then((data) => setSoinsData(data))
            .catch((error) => console.error('Error fetching soins data:', error));
    }, []);

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null); // Close modal
    };

    if (!soinsData.length) return <p>Chargement...</p>;

    return (
        <div>
            {/* Main content */}
            <div className="container-fluid pt-5 mt-5" style={{ paddingTop: '130px' }}>
                <div
                    className="container-fluid d-flex align-items-center justify-content-center text-center"
                    style={{
                        backgroundImage: "url('/img/batiment-medecine-interne.jpg')",
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '80vh',
                    }}
                >
                    <h1 className="display-1 text-capitalize text-white mb-4">SERVICE MEDECINE INTERNE</h1>
                </div>

                {/* Offre de soins */}
                <div className="container-fluid service">
                    <div className="container py-5">
                        <div className="section-title mb-5">
                            <div className="sub-style">
                                <h1 className="sub-title px-3 mb-0">OFFRE DE SOINS</h1>
                            </div>
                            <p className="mb-4" style={{ fontSize: '25px' }}>Vous trouvez ci-dessous nos soins pour le service medecine interne.</p>
                        </div>
                        <div className="row g-4 justify-content-center">
                            {soinsData.map((soin) => (
                                <div className="col-md-6 col-lg-4" key={soin.SoinsId}>
                                    <div className="service-item rounded">
                                        <div className="service-img rounded-top">
                                            <img
                                                src={soin.SoinsImage}
                                                alt={soin.SoinsTitre}
                                                className="img-fluid rounded-top w-100 active"
                                                style={{ height: '240px', cursor: 'pointer' }}
                                                onClick={() => handleImageClick(soin.SoinsImage)}
                                            />
                                        </div>
                                        <div className="service-content rounded-bottom bg-light p-4" style={{ display: 'flex', flexDirection: 'column', height: '290px' }}>
                                            <div className="service-content-inner">
                                                <h3 className="mb-4">{soin.SoinsTitre}</h3>
                                                <p className="mb-4" style={{ fontSize: '25px' }} >{soin.SoinsDescription}</p>
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

export default SoinMedecineInterne;