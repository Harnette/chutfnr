// EquipeListe.tsx
'use client'
import React, { useEffect, useState } from 'react';

interface Equipe {
    EquipeNom: string;
    EquipeFonction: string;
    EquipePhoto: string;
}

const EquipeListe: React.FC = () => {
    const [equipe, setEquipe] = useState<Equipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEquipe = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/equipe');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEquipe(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEquipe();
    }, []);

    return (
        <div>
            {loading && (
                <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="sr-only">Chargement...</span>
                    </div>
                </div>
            )}
            {/* Topbar */}
            <div className="container-fluid bg-dark px-5 d-none d-lg-block position-fixed top-0 start-0 w-100" style={{ zIndex: 1020 }}>
                <div className="row gx-0 align-items-center" style={{ height: '65px' }}>
                    <div className="col-lg-8 text-center text-lg-start mb-lg-0">
                        <div className="d-flex flex-wrap">
                            <h4><a href="https://www.google.com/maps/@-21.4440938,47.087405,17z/data=!3m1!1e3?force=pwa&source=mlapk"
                                className="text-light me-4" style={{ textDecoration: 'none' }}>
                                <i className="fas fa-map-marker-alt text-primary me-2"></i>Tambohobe, Fianarantsoa, Madagascar
                            </a></h4>
                        </div>
                    </div>
                    <div className="col-lg-4 text-center text-lg-end">
                        <div className="d-flex align-items-center justify-content-end">
                            <h3><a href="https://www.facebook.com/CHUTFNR" className="btn btn-primary border rounded-circle nav-fill me-0">
                                <i className="fab fa-facebook-f text-white me-2"></i>
                            </a></h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <div className="container-fluid position-fixed top-0 start-0 w-100 mt-5" style={{ zIndex: 1010 }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <a className="navbar-brand p-0">
                        <h5 className="m-0" style={{ color: '#00B98E' }}>
                            <img src="/img/fahaleovantena.jpg" alt="Logo" />
                            <img src="/img/logodgfs.jpg" alt="Logo" />
                            <img src="/img/logochu.png" alt="Logo" />Centre Hospitalier Universitaire Tambohobe Fianarantsoa
                        </h5>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                            <a href="/" className="nav-item nav-link">Acceuil</a>
                            <a href="/apropos" className="nav-item nav-link ">A propos</a>
                            <a href="/serviceliste" className="nav-item nav-link ">Services</a>
                            <a href="/equipeliste" className="nav-item nav-link active">Equipe</a>
                            <a href="/contactdoleance" className="nav-item nav-link">Contact</a>
                        </div>
                    </div>
                </nav>
            </div>
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
                {/* Debut équipe */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="section-title mb-5 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="sub-style">
                                <h1 className="sub-title px-3 mb-0">Équipe</h1>
                            </div>
                            <p className="mb-4" style={{ fontSize: '25px' }}>Grande membres qui dirigent le Centre Hospitalier Universitaire Tambohobe Fianarantsoa.</p>
                        </div>
                        <div className="row g-4">
                            {equipe.map((member, index) => (
                                <div key={index} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={`${index * 0.2}s`}>
                                    <div className="team-item">
                                        <div style={{ height: '170px' }}>
                                            <h4>{member.EquipeNom}</h4>
                                            <p className="mb-4" style={{ fontSize: '20px' }}>{member.EquipeFonction}</p>
                                        </div>
                                        <img style={{ width: '300px', height: '300px', objectFit: 'cover' }} className="img-fluid rounded-circle w-100 mb-4" src={member.EquipePhoto} alt={member.EquipeNom} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Fin équipe */}
            </div>
        </div>
    );
};

export default EquipeListe;
