// components/PiedPage.tsx
'use client'
import React, { useState, useEffect } from 'react';

interface Partenaire {
  PartenairesNom: string;
  PartenairesPage: string;
}

const PiedPage: React.FC = () => {
  const [partenaires, setPartenaires] = useState<Partenaire[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/partenaires'); // Update with the actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch partners');
        }
        const data = await response.json();
        setPartenaires(data);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchPartners();
  }, []);

  return (
    <>
      {/* Footer Content */}
      <div className="container-fluid footer wow fadeIn" data-wow-delay="0.2s">
        <div className="container py-1">
          <div className="row g-5">
            {/* Contact Info */}
            <div className="col-md-6 col-lg-6 col-xl-6">
              <div className="footer-item d-flex flex-column">
                <i className="fab fa-clinic-medical text-white me-2"></i>
                <p className='text-white'>Le Centre Hospitalier Universitaire (CHU) est une institution de santé dédiée à offrir des soins de qualité,
                  accessible à tous, tout en étant un centre d'enseignement et de recherche médicale.
                  Notre mission est d'améliorer la santé publique en formant les professionnels de demain,
                  en développant la recherche, et en assurant un accueil chaleureux
                  et des soins adaptés à chaque patient.</p>
              </div>
            </div>

            {/* Partners List */}
            <div className="col-md-6 col-lg-6 col-xl-6">
              <div className="footer-item d-flex flex-column">
                <h1 className="mb-4 text-white">Partenaires</h1>
                <div className="row g-4">
                  {partenaires.map((partenaire, index) => (
                    <div key={index} className="col-4"> {/* col-4 pour trois colonnes */}
                      <li>
                        <a
                          href={partenaire.PartenairesPage}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ paddingLeft: '10px' }}
                        >
                          {partenaire.PartenairesNom}
                        </a>
                      </li>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container-fluid copyright py-4">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-6 text-center text-md-start mb-md-0">
              <span className="text-secondary">
                <i className="fas fa-copyright  me-2"></i>Centre Hospitalier Universitaire Tambohobe Fianarantsoa {currentYear}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PiedPage;
