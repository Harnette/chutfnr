import Image from 'next/image';
import proposImage from '../public/img/propos1.jpg';

export default function Apropos() {
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
                            <a href="/" className="nav-item nav-link">Acceuil</a>
                            <a href="/apropos" className="nav-item nav-link active">A propos</a>
                            <a href="/serviceliste" className="nav-item nav-link ">Services</a>
                            <a href="/equipeliste" className="nav-item nav-link">Equipe</a>
                            <a href="/contactdoleance" className="nav-item nav-link">Contact</a>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="container-fluid pt-5 mt-5" style={{ paddingTop: '130px' }}></div>
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
            {/* Titre Section */}
            <div className="section-title py-4 mb-5 wow fadeInUp" data-wow-delay="0.2s">
                <div className="sub-style">
                    <h1 className="sub-title px-3 mb-0">A PROPOS</h1>
                </div>
                <p className="mb-4" style={{ fontSize: '25px' }}>Santé pour tous et par tous</p>
            </div>
            <div className="container-fluid apropos bg-light">
            <div className="container">
                <div className="row g-5 align-items-center">
                    {/* Image Section Gauche */}
                    <div className="col-lg-5 wow fadeInLeft" data-wow-delay="0.2s">
                        <div className="apropos-img pb-5 ps-5">
                            <Image
                                src={proposImage}
                                alt="Image"
                                className="img-fluid rounded w-100"
                                style={{ objectFit: 'cover', height: 'auto' }}
                            />
                            <div className="apropos-experience">
                                <h4 style={{ color: '#00B98E' }}>123 ans existance</h4>
                            </div>
                        </div>
                    </div>

                    {/* Text Section Droite */}
                    <div className="col-lg-7 wow fadeInRight" data-wow-delay="0.4s">
                        <div className="section-title text-start mb-5">
                            <h3 className="mb-4 text-secondary">
                                Le Centre Hospitalier Universitaire (CHU) Tambohobe est un centre de référence ou un ensemble de
                                compétences pluridisciplinaires hospitalières organisées autour des équipes médicales spécialisées qui
                                offre des soins aux habitants de la ville de Fianarantsoa. Son siège est situé à Tambohobe, Fianarantsoa.
                            </h3>
                            <p className="mb-4 text-black-500" style={{ fontSize: '25px' }}>
                                Pour communiquer avec le Centre Hospitalier Universitaire Tambohobe, vous pouvez utiliser les
                                informations suivantes :
                            </p>
                            <div className="mb-4">
                                <h3>
                                    <p className="text-secondary">
                                        <i className="fa fa-check me-2" style={{ color: '#00B98E' }}></i> Boîte postale : 1050.
                                    </p>
                                    <p className="text-secondary">
                                        <i className="fa fa-check me-2" style={{ color: '#00B98E' }}></i> Code postal : 301.
                                    </p>
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Section Historique */}
                    <h1 >HISTORIQUE :</h1>
                    <p className="justify-content-center text-secondary" style={{ fontSize: '25px' }}>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; L'histoire du Centre Hospitalier Universitaire (CHU) Tambohobe de Fianarantsoa remonte à
                        1901, avec la construction du premier hôpital à Tsianolondroa. <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; En 1902, l'administration coloniale française décide de reconstruire l'hôpital sur la
                        colline de Tambohobe, sous la direction du Dr PICK de la LMS, et il devient fonctionnel la même année. <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; L'année suivante, en 1903, les premiers bâtiments de l'hôpital sont construits. <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; En 1904, l'établissement est officiellement nommé « Hôpital Central de Fianarantsoa » et en
                        1905, il devient l’Hôpital Mixte de Fianarantsoa. <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; En 1950, deux nouveaux bâtiments sont ajoutés : l'un pour la chirurgie et l'autre pour la
                        maternité, en mémoire de Rarandrana, la première sage-femme de la région Betsileo, honorée par la communauté « Tendry ».
                        <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Les années suivantes voient une série d'extensions et de modernisations. <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; En 1970, l'hôpital est agrandi par l'État malgache. <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; En 1980, un bâtiment de trois étages, appelé bâtiment Colas, est construit. <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; En 1990, le pavillon de Malte est ajouté. <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Entre 1960 et 1998, l'hôpital porte le nom d'Hôpital Principal de Fianarantsoa. <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; En 1998, de nouveaux bâtiments pour la maternité et la chirurgie sont construits et les
                        installations électriques et téléphoniques sont rénovées en collaboration avec l'association Électriciens sans Frontières.
                        <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; En 2002, l'hôpital devient le Centre Hospitalier de Référence Provincial de Fianarantsoa.
                        <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Trois ans plus tard, en 2005, il est désigné Centre Hospitalier de Référence Régional de la
                        Haute Matsiatra, avec la réhabilitation de plus de 70% des bâtiments, la création d'une salle de conférence et d'un centre
                        d'hébergement pour les accompagnants des malades. <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; En 2007, il obtient le statut de Centre Hospitalier Universitaire de Fianarantsoa. De
                        nouveaux services sont créés dans les années suivantes : le service de neurochirurgie en 2008 sous la direction du Pr
                        RABARIJAONA Mamiarisoa, le service d'oncologie en 2009 en collaboration avec la fondation AKBARALY, et le service de
                        néonatalogie en 2010. <br />
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; En 2013, un nouveau bâtiment pour le CRTS est construit.
                    </p>

                    {/* Section Historique */}
                    <div className='py-5'>
                    <h1 >SITUATION GEOGRAPHIQUE :</h1>
                    <a href="https://www.google.com/maps/@-21.4440938,47.087405,17z/data=!3m1!1e3?force=pwa&source=mlapk">
                    <div
                className="container-fluid py-5"
                style={{
                    backgroundImage: "url('/img/situation-geographique.jpeg')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '100vh',
                }}> </div></a>
                </div>
                </div>
            </div>
            
            </div>
        </div>
    );
}
