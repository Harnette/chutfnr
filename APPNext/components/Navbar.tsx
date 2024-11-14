import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light sticky-top px-4 py-0">
      <a href="#" className="sidebar-toggler flex-shrink-0">
        <i className="text-white fa fa-bars"></i>
      </a>
      <div className="navbar-nav align-items-center ms-auto">
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <img
              className="rounded-circle me-lg-2"
              src="/img/user.jpg"
              alt="User"
              style={{ width: '40px', height: '40px' }}
            />
            <span className="d-none d-lg-inline-flex">John Doe</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
            <Link href="/profile" className="dropdown-item">
              Mon Profile
            </Link>
            <Link href="/login" className="dropdown-item">
              Déconnecter
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
