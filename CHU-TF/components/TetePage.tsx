// components/TetePage.tsx
'use client'
import React from 'react';

const TetePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/*  */}
      <div className="container-fluid bg-dark px-5 d-none d-lg-block position-fixed top-0 start-0 w-100" style={{ zIndex: 1020 }}>
        <div className="row gx-0 align-items-center" style={{ height: '65px' }}>
          <div className="col-lg-8 text-center text-lg-start mb-lg-0">
            <div className="d-flex flex-wrap">
              <h4>
                <a
                  href="https://www.google.com/maps/@-21.4440938,47.087405,17z/data=!3m1!1e3?force=pwa&source=mlapk"
                  className="text-light me-4"
                  style={{ textDecoration: 'none' }}
                >
                  <i className="fas fa-map-marker-alt text-primary me-2"></i>Tambohobe, Fianarantsoa, Madagascar
                </a>
              </h4>
            </div>
          </div>
          <div className="col-lg-4 text-center text-lg-end">
            <div className="d-flex align-items-center justify-content-end">
              <h3>
                <a
                  href="https://www.facebook.com/CHUTFNR"
                  className="btn btn-primary border rounded-circle nav-fill me-0"
                >
                  <i className="fab fa-facebook-f text-white me-2"></i>
                </a>
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="container-fluid position-fixed top-0 start-0 w-100 mt-5" style={{ zIndex: 1010 }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-white ">
          <a className="navbar-brand p-0">
            <h5 className="m-0" style={{ color: '#00B98E' }}>
              <img src="/img/fahaleovantena.jpg" alt="Logo" />
              <img src="/img/logodgfs.jpg" alt="Logo" />
              <img src="/img/logochu.png" alt="Logo" />
              Centre Hospitalier Universitaire Tambohobe Fianarantsoa
            </h5>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
              <a href="/" className="nav-item nav-link">
                Acceuil
              </a>
              <a href="/apropos" className="nav-item nav-link">
                A propos
              </a>
              <a href="/serviceliste" className="nav-item nav-link active">
                Services
              </a>
              <a href="/equipeliste" className="nav-item nav-link">
                Equipe
              </a>
              <a href="/contactdoleance" className="nav-item nav-link">
                Contact
              </a>
            </div>
          </div>
        </nav>
      </div>
</main>
)
};

export default TetePage;
