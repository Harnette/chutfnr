'use client'
import React, { useState, useEffect } from 'react';
import {  Table } from 'react-bootstrap';

interface Doleancee {
  formatted_date: string;
  ServiceTitre_display: string;
  Message: string;
}

const Doleances: React.FC = () => {
  const [doleances, setDoleances] = useState<Doleancee[]>([]);
  const [filteredDoleances, setFilteredDoleances] = useState<Doleancee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const doleancesPerPage = 5;

  // Recuperer données depuis backend
  useEffect(() => {
    fetch('http://127.0.0.1:8000/doleances')
      .then((response) => response.json())
      .then((data) => {
        setDoleances(data);
        setFilteredDoleances(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Gestion du filtrage
  useEffect(() => {
    const filtered = doleances.filter(
      (doleance) =>
        doleance.formatted_date.includes(searchQuery) ||
        doleance.ServiceTitre_display.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoleances(filtered);
    setCurrentPage(1); // Réinitialise à la première page lors d'un filtrage
  }, [searchQuery, doleances]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Pagination
  const indexOfLastDoleance = currentPage * doleancesPerPage;
  const indexOfFirstDoleance = indexOfLastDoleance - doleancesPerPage;
  const currentDoleances = filteredDoleances.slice(indexOfFirstDoleance, indexOfLastDoleance);
  const totalPages = Math.ceil(filteredDoleances.length / doleancesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="container py-3">
      <h1>DOLEANCE</h1>

      {/* Contact List Table */}
      <div className="container-fluid pt-4 px-4">
        <div className="text-center rounded p-4">
          <div className="table-responsive">
            {/* Champ de recherche */}
            <input
              type="text"
              placeholder="Recherche par date ou servicce"
              value={searchQuery}
              onChange={handleSearchChange}
              className="form-control my-3"
              style={{
                float: 'right',
                width: '280px',
                boxShadow: searchQuery ? '0px 4px 8px rgba(0, 185, 142, 0.5)' : 'none',
                borderColor: searchQuery ? '#00B98E' : '#ced4da',
              }}
            />
            <Table className="text-center align-middle table-bordered table-hover mt-4">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Titre service</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
              {currentDoleances.map((doleance, index) => (
        <tr key={index}>
            <td>{doleance.formatted_date}</td>
            <td>{doleance.ServiceTitre_display}</td> {/* Display the service title */}
            <td>{doleance.Message}</td>
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

export default Doleances;
