'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';

interface Partenaire {
  PartenairesId: number;
  PartenairesNom: string;
  PartenairesPage: string;
}

const PartenairesComponent: React.FC = () => {
  const [partenaires, setPartenaires] = useState<Partenaire[]>([]);
  const [filteredPartenaire, setFilteredPartenaire] = useState<Partenaire[]>([]);
  const [newPartenaire, setNewPartenaire] = useState<Partenaire>({ PartenairesId: 0, PartenairesNom: '', PartenairesPage: '' });
  const [selectedPartenaire, setSelectedPartenaire] = useState<Partenaire | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const partenairePerPage = 5;

  useEffect(() => {
    // Fetch partenaires
    fetch('http://127.0.0.1:8000/partenaires')
      .then((response) => response.json())
      .then((data) => {
        setPartenaires(data);
        setFilteredPartenaire(data);
      })
      .catch((error) => console.error(error));
  }, []);

// Gestion du filtrage
useEffect(() => {
  const filtered = partenaires.filter(
    (partenaire) =>
    partenaire.PartenairesNom.includes(searchQuery) ||
    partenaire.PartenairesPage.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredPartenaire(filtered);
  setCurrentPage(1); // Réinitialise à la première page lors d'un filtrage
}, [searchQuery, partenaires]);

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value);
};

// Pagination
const indexOfLastPartenaire = currentPage * partenairePerPage;
const indexOfFirstPartenaire = indexOfLastPartenaire - partenairePerPage;
const currentPartenaire = filteredPartenaire.slice(indexOfFirstPartenaire, indexOfLastPartenaire);
const totalPages = Math.ceil(filteredPartenaire.length / partenairePerPage);

const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleAddPartenaire = () => {
    fetch('http://127.0.0.1:8000/partenaires/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPartenaire),
    })
      .then((response) => response.json())
      .then((data) => {
        setPartenaires([...partenaires, data]);
        setShowAddModal(false);
        setNewPartenaire({ PartenairesId: 0, PartenairesNom: '', PartenairesPage: '' });
      })
      .catch((error) => console.error(error));
  };

  const handleEditPartenaire = () => {
    if (!selectedPartenaire) return;

    fetch(`http://127.0.0.1:8000/partenaires/${selectedPartenaire.PartenairesId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedPartenaire),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedPartenaires = partenaires.map((partenaire) => (partenaire.PartenairesId === data.PartenairesId ? data : partenaire));
        setPartenaires(updatedPartenaires);
        setShowEditModal(false);
        setSelectedPartenaire(null);
      })
      .catch((error) => console.error(error));
  };

  const handleDeletePartenaire = () => {
    if (!selectedPartenaire) return;

    fetch(`http://127.0.0.1:8000/partenaires/${selectedPartenaire.PartenairesId}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setPartenaires(partenaires.filter((partenaire) => partenaire.PartenairesId !== selectedPartenaire.PartenairesId));
        setShowDeleteModal(false);
        setSelectedPartenaire(null);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container py-3">
      <h1>PARTENAIRE</h1>

      {/* Add Partenaire Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un partenaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nom du Partenaire"
                value={newPartenaire.PartenairesNom}
                onChange={(e) => setNewPartenaire({ ...newPartenaire, PartenairesNom: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="url"
                className="form-control"
                placeholder="Lien vers la page du Partenaire"
                value={newPartenaire.PartenairesPage}
                onChange={(e) => setNewPartenaire({ ...newPartenaire, PartenairesPage: e.target.value })}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Annuler
          </Button>
          <Button variant="success" onClick={handleAddPartenaire}>
            Soumettre
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Partenaire Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un partenaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nom du Partenaire"
                value={selectedPartenaire?.PartenairesNom || ''}
                onChange={(e) =>
                  setSelectedPartenaire({ ...selectedPartenaire, PartenairesNom: e.target.value } as Partenaire)
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="url"
                className="form-control"
                placeholder="Lien vers la page du Partenaire"
                value={selectedPartenaire?.PartenairesPage || ''}
                onChange={(e) =>
                  setSelectedPartenaire({ ...selectedPartenaire, PartenairesPage: e.target.value } as Partenaire)
                }
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Annuler
          </Button>
          <Button variant="success" onClick={handleEditPartenaire}>
            Soumettre
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Partenaire Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: 'red' }}>
          <Modal.Title>Supprimer un partenaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Voulez-vous vraiment supprimer ce partenaire ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Non
          </Button>
          <Button variant="danger" onClick={handleDeletePartenaire}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Partenaires List Table */}
      <div className="container-fluid pt-4 px-4">
        <div className="text-center rounded p-4">
          <div className="table-responsive">
                  {/* Button pour ouvrir nouvel Modal */}
      <Button
        style={{ backgroundColor: '#00B98E', float: 'left' }}
        onClick={() => setShowAddModal(true)}
      >
        <i className="text-white fas fa-plus"></i>
      </Button>
            {/* Champ de recherche */}
            <input
              type="text"
              placeholder="Recherche par nom"
              value={searchQuery}
              onChange={handleSearchChange}
              className="form-control my-3"
              style={{
                float: 'right',
                width: '200px',
                boxShadow: searchQuery ? '0px 4px 8px rgba(0, 185, 142, 0.5)' : 'none',
                borderColor: searchQuery ? '#00B98E' : '#ced4da',
              }}
            />
      <Table  className="text-center align-middle table-bordered table-hover mt-4">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Page</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPartenaire.map((partenaire) => (
            <tr key={partenaire.PartenairesId}>
              <td>{partenaire.PartenairesNom}</td>
              <td>
                <a href={partenaire.PartenairesPage} target="_blank" rel="noopener noreferrer">
                  {partenaire.PartenairesPage}
                </a>
              </td>
              <td>
              <a
                        href="#"
                  onClick={() => {
                    setSelectedPartenaire(partenaire);
                    setShowEditModal(true);
                  }}
                >
                   <i className="fas fa-edit" style={{ color: 'orange' }}></i>
                </a>
                </td>
                    <td>
                <a
                        href="#"
                  onClick={() => {
                    setSelectedPartenaire(partenaire);
                    setShowDeleteModal(true);
                  }}
                  className="ms-2"
                >
                  <i className="fas fa-trash-alt" style={{ color: 'red' }}></i>
                </a>
              </td>
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

export default PartenairesComponent;