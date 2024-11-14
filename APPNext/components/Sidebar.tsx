'use client'
import Link from 'next/link';
import  { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="sidebar pe-4 pb-3">
      <nav className="navbar navbar-light">
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img src="http://127.0.0.1:8000/images/logochu.png" alt="" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="ms-3">
            <h6 className="text-white">Centre Hospitalier Universitaire Tambohobe Fianarantsoa</h6>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <Link href="/tableaubord" className={`nav-item nav-link ${pathname === '/tableaubord' ? 'active' : ''}`}>
            <i className="fa fa-home me-2"></i>Tableau de bord
          </Link>
          <Link href="/contact" className={`nav-item nav-link ${pathname === '/contact' ? 'active' : ''}`}>
            <i className="fa fa-phone-alt me-2"></i>Contact
          </Link>
          <Link href="/equipe" className={`nav-item nav-link ${pathname === '/equipe' ? 'active' : ''}`}>
            <i className="fa fa-users me-2"></i>Equipe
          </Link>
          <Link href="/doleance" className={`nav-item nav-link ${pathname === '/doleance' ? 'active' : ''}`}>
            <i className="fa fa-pencil-alt me-2"></i>Doleance
          </Link>
          <Link href="/partenaires" className={`nav-item nav-link ${pathname === '/partenaires' ? 'active' : ''}`}>
            <i className="fa fa-user me-2"></i>Parténaire
          </Link>
          <Link href="/service" className={`nav-item nav-link ${pathname === '/service' ? 'active' : ''}`}>
            <i className="fa fa-wrench me-2"></i>Service
          </Link>
          <Link href="/soins" className={`nav-item nav-link ${pathname === '/soins' ? 'active' : ''}`}>
            <i className="fa fa-briefcase-medical me-2"></i>Soins
          </Link>
          <Link href="/conditions" className={`nav-item nav-link ${pathname === '/conditions' ? 'active' : ''}`}>
            <i className="fa fa-info-circle me-2"></i>Condition
          </Link>
          <br /><br /><br /><br />
          <Link href="/connexion" className={`nav-item nav-link ${pathname === '/connexion' ? 'active' : ''}`}>
            <i className="fa fa-sign-out-alt me-2"></i>Déconnecter
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
