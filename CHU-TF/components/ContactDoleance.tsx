'use client'
import React, { useEffect, useState } from 'react';

interface Contact {
    NumeroUrgence: string;
    Email: string;
}

interface Service {
    ServiceId: number;
    ServiceTitre: string;
}

const ContactDoleance: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState(true);

    // Fetch contact information
    // Recuperer données depuis backend
    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/contact');
                if (!response.ok) {
                    throw new Error('Failed to fetch contact information');
                }
                const data = await response.json();
                setContacts(data);
            } catch (error) {
                console.error('Error fetching contact info:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, []);

    // Fetch list of services
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/service');
                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    // Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await fetch('http://127.0.0.1:8000/doleances/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ServiceTitre: selectedService, // Correctly send the service ID
                Message: message,
            }),
        });
        if (response.ok) {
            alert('Doléance envoyée avec succès');
            setMessage('');
            setSelectedService('');
        } else {
            throw new Error('Failed to send doléance');
        }
    } catch (error) {
        console.error('Error submitting doléance:', error);
        alert("Erreur lors de l'envoi de la doléance");
    }
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
                            <a href="/equipeliste" className="nav-item nav-link">Equipe</a>
                            <a href="/contactdoleance" className="nav-item nav-link active">Contact</a>
                        </div>
                    </div>
                </nav>
            </div>
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
            <div className="container-xxl py-4 section-title mb-5 wow fadeInUp" data-wow-delay="0.2s">
                <div className="sub-style">
                    <h1 className="sub-title px-3 mb-0">Contact</h1>
                </div>
            </div>
            <div className="container-fluid contactdoleance">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.2">
                            <div className="section-title text-start">
                                <p className="mb-4 text-black-50" style={{ fontSize: '20px' }}>
                                    A l'hôpital Centre Hospitalier Universitaire Tambohobe Fianarantsoa,
                                    votre santé et votre bien-être sont notre priorité absolue.
                                    Nous mettons tout en oeuvre pour offirir des soins de qualité, adapté à vos besoins.
                                    Nous sommes ici pour vous servir 24 heures sur 24 et 7 jours sur 7.
                                    Nous vous remercierons pour votre confiance et sommes honorés de pouvoir contribuer à votre
                                    santé et à votre bien-être.
                                    Nous sommes impatients de vous accueillir et de vous fournir les meilleurs soins possibles :
                                </p>
                                <div className="row g-4" style={{ fontSize: '20px' }}>
                                    <div className="col-sm-6">
                                        <div className="mb-4">
                                            <h4 className="mb-3"><i className="fa fa-check text-success me-2"></i> En cas d'urgence :</h4>
                                            {contacts.map((contact) => (
                                                <p className="mb-0 text-black-50">{contact.NumeroUrgence}</p>

                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <i className="fa fa-envelope-open fa-2x text-orange"></i>
                                            {contacts.map((contact) => (
                                                <p className="mb-0 text-black-50">{contact.Email} </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInRight" data-wow-delay="0.4s">
                            <div className="contactdoleance-form rounded p-5">
                                <h4 className="display-5 mb-4">Veuillez mettre votre doléance</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="row gy-3 gx-4">
                                        <div className="col-12">
                                        <select
    className="form-select py-10 border-success bg-transparent"
    value={selectedService}
    onChange={(e) => setSelectedService(e.target.value)}
    required
    style={{ fontSize: '20px' }}
>
    <option value="" disabled>Service</option>
    {services.map((service) => (
        <option key={service.ServiceId} value={service.ServiceId}>{service.ServiceTitre}</option>
    ))}
</select>
                                        </div>
                                        <div className="col-12">
                                            <textarea
                                                className="form-control border-success bg-transparent text-black"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                rows={5}
                                                placeholder="Message"
                                                required
                                                style={{ fontSize: '20px' }}
                                            ></textarea>
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-success text-white w-100 py-3 px-5">Envoyer</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactDoleance;
