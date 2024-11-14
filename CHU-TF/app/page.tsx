// page.tsx
'use client'
import React from 'react';
import PiedPage from '@/components/PiedPage';

const HomePage: React.FC = () => {
  return (
    <div>
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
                            <a href="/" className="nav-item nav-link active">Acceuil</a>
                            <a href="/apropos" className="nav-item nav-link ">A propos</a>
                            <a href="/serviceliste" className="nav-item nav-link ">Services</a>
                            <a href="/equipeliste" className="nav-item nav-link">Equipe</a>
                            <a href="/contactdoleance" className="nav-item nav-link">Contact</a>
                        </div>
                    </div>
                </nav>
            </div>
            <div
        className="container-fluid d-flex align-items-center justify-content-center text-center"
        style={{
          backgroundImage: "url('/img/propos1.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '100vh',
          color: 'white',
          flexDirection: 'column',
        }}
      >
        <h1 className="text-white text-uppercase fw-bold mb-4" style={{ letterSpacing: '3px' }}>Bienvenue</h1>
        <h4 className="display-1 text-capitalize text-white mb-4">La meilleure solution de soin dans Haute Matsiatra</h4>
      </div>
      <PiedPage />
      <a href="#" className="btn btn-success btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
    </div>
  );
};

export default HomePage;
