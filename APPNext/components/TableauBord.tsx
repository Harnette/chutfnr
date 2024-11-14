'use client'
import React, { useState, useEffect } from 'react';
import { Table, Card, Row, Col, Form, Pagination } from 'react-bootstrap';

interface ServiceData {
  ServiceTitre: string;
  SoinsTitre: string[];
}

interface DashboardData {
  total_services: number;
  total_soins: number;
  services: ServiceData[];
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [filteredServices, setFilteredServices] = useState<ServiceData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Nombre de services par page

  useEffect(() => {
    fetch('http://127.0.0.1:8000/dashboard-data')
      .then((response) => response.json())
      .then((data) => {
        setDashboardData(data);
        setFilteredServices(data.services);
      })
      .catch((error) => console.error('Error fetching dashboard data:', error));
  }, []);

  useEffect(() => {
    if (dashboardData) {
      const filtered = dashboardData.services.filter((service) =>
        service.ServiceTitre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(filtered);
      setCurrentPage(1); // Réinitialise la page lors de la recherche
    }
  }, [searchTerm, dashboardData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const displayedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (!dashboardData) return <p>Chargement...</p>;

  return (
    <div className="container py-4">
      <h1>TABLEAU DE BORD</h1>

      <Row className="my-4">
        <Col className='col-md-6 alert alert-success'>
          <Card>
            <Card.Body>
              <Card.Title>Total Services</Card.Title>
              <Card.Text>{dashboardData.total_services}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className='col-md-6 alert alert-success'>
          <Card>
            <Card.Body>
              <Card.Title>Total Soins</Card.Title>
              <Card.Text>{dashboardData.total_soins}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="container-fluid pt-4 px-4">
        <div className="text-center rounded p-4">
          <div className="table-responsive">

            {/* Barre de recherche */}
            <Form className="mb-3">
              <Form.Control
                type="text"
                placeholder="Recherche un service"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  float: 'right',
                  width: '300px',
                  boxShadow: searchTerm ? '0px 4px 8px rgba(0, 185, 142, 0.5)' : 'none',
                  borderColor: searchTerm ? '#00B98E' : '#ced4da',
                }}
              />
            </Form>

            <Table className="text-center align-middle table-bordered table-hover mt-4">
              <thead>
                <tr>
                  <th>Titre Service</th>
                  <th>Titre Soins</th>
                </tr>
              </thead>
              <tbody>
                {displayedServices.map((service, index) => (
                  <tr key={index}>
                    <td>{service.ServiceTitre}</td>
                    <td>{service.SoinsTitre.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Pagination */}
            <nav>
              <ul className="pagination justify-content-end">
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <a href="#" className="page-link" onClick={() => paginate(i + 1)}
                      style={{
                        backgroundColor: currentPage === i + 1 ? '#00B98E' : '',
                        color: currentPage === i + 1 ? 'white' : '',
                        boxShadow: currentPage === i + 1 ? '0px 4px 8px rgba(0, 185, 142, 0.5)' : '',
                        borderColor: 'transparent',
                      }}
                    >
                      {i + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
