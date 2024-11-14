import 'bootstrap/dist/css/bootstrap.min.css';
const Header = () => {

  return (
    <header className="fixed-top bg-light text-center text-lg-start">
    <div className="container p-4">
      <div className="row">
      <div className="text-left p-3">
      <a className="text-reset fw-bold" href="https://mybusiness.com">mybusiness.com</a>
    </div>
        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
          <a href="https://facebook.com" className="me-4 text-reset">
            Facebook
          </a>
        </div>

        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Partners</h5>
          <ul className="list-unstyled mb-0">
            <li>
              <a href="#!" className="text-reset">Partner 1</a>
            </li>
            <li>
              <a href="#!" className="text-reset">Partner 2</a>
            </li>
            <li>
              <a href="#!" className="text-reset">Partner 3</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  );
};

export default Header;
