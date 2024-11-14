'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';

interface Soins {
  SoinsId: number;
  SoinsTitre: string;
  SoinsDescription: string;
  SoinsImage?: File | string;
  ServiceId: number;
  ServiceTitre?: string;
}

interface Service {
  ServiceId: number;
  ServiceTitre: string;
}

const SoinsComponent: React.FC = () => {
  const [soins, setSoins] = useState<Soins[]>([]);
  const [filteredSoins, setFilteredSoins] = useState<Soins[]>([]);
  const [serviceOptions, setServiceOptions] = useState<Service[]>([]);
  const [newSoins, setNewSoins] = useState<Soins>({ SoinsId: 0, SoinsTitre: '', SoinsDescription: '', ServiceId: 0 });
  const [selectedSoins, setSelectedSoins] = useState<Soins | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const soinsPerPage = 5;

  useEffect(() => {
    // Fetch soins
    fetch('http://127.0.0.1:8000/soins')
      .then((response) => response.json())
      .then((data) => {
        setSoins(data);
        setFilteredSoins(data);
      })
      .catch((error) => console.error(error));

    // Fetch services for dropdown
    fetch('http://127.0.0.1:8000/service')
      .then((response) => response.json())
      .then((data) => setServiceOptions(data))
      .catch((error) => console.error(error));
  }, []);

  // Gestion du filtrage
  useEffect(() => {
    const filtered = soins.filter(
      (soin) =>
        soin.SoinsTitre?.includes(searchQuery) ||
        soin.SoinsDescription?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSoins(filtered);
    setCurrentPage(1);
  }, [searchQuery, soins]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Pagination
  const indexOfLastSoins = currentPage * soinsPerPage;
  const indexOfFirstSoins = indexOfLastSoins - soinsPerPage;
  const currentSoins = filteredSoins.slice(indexOfFirstSoins, indexOfLastSoins);
  const totalPages = Math.ceil(filteredSoins.length / soinsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (isEditing && selectedSoins) {
        setSelectedSoins({ ...selectedSoins, SoinsImage: file });
      } else {
        setNewSoins({ ...newSoins, SoinsImage: file });
      }
    }
  };
  

  const handleAddSoins = () => {
    const formData = new FormData();
    formData.append('SoinsTitre', newSoins.SoinsTitre);
    formData.append('SoinsDescription', newSoins.SoinsDescription);
    formData.append('ServiceId', newSoins.ServiceId.toString());
    if (newSoins.SoinsImage) formData.append('SoinsImage', newSoins.SoinsImage);

    fetch('http://127.0.0.1:8000/soins/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setSoins([...soins, data]);
        setShowAddModal(false);
        setNewSoins({ SoinsId: 0, SoinsTitre: '', SoinsDescription: '', ServiceId: 0 });
      })
      .catch((error) => console.error(error));
  };

  const handleEditSoins = () => {
    if (!selectedSoins) return;

    const formData = new FormData();
    formData.append('SoinsTitre', selectedSoins.SoinsTitre);
    formData.append('SoinsDescription', selectedSoins.SoinsDescription);
    formData.append('ServiceId', selectedSoins.ServiceId.toString());
    if (selectedSoins.SoinsImage instanceof File) {
      formData.append('SoinsImage', selectedSoins.SoinsImage);
    }

    fetch(`http://127.0.0.1:8000/soins/${selectedSoins.SoinsId}/`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedSoins = soins.map((soin) => (soin.SoinsId === data.SoinsId ? data : soin));
        setSoins(updatedSoins);
        setShowEditModal(false);
        setSelectedSoins(null);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteSoins = () => {
    if (!selectedSoins) return;

    fetch(`http://127.0.0.1:8000/soins/${selectedSoins.SoinsId}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setSoins(soins.filter((soin) => soin.SoinsId !== selectedSoins.SoinsId));
        setShowDeleteModal(false);
        setSelectedSoins(null);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container py-3">
      <h1>SOINS</h1>

      {/* Add Soins Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un soin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Titre du Soin"
                value={newSoins.SoinsTitre}
                onChange={(e) => setNewSoins({ ...newSoins, SoinsTitre: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description du Soin"
                value={newSoins.SoinsDescription}
                onChange={(e) => setNewSoins({ ...newSoins, SoinsDescription: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <Form.Select
                value={newSoins.ServiceId}
                onChange={(e) => setNewSoins({ ...newSoins, ServiceId: parseInt(e.target.value) })}
              >
                <option value="">Sélectionner un service</option>
                {serviceOptions.map((service) => (
                  <option key={service.ServiceId} value={service.ServiceId}>
                    {service.ServiceTitre}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                onChange={(e) => handleImageChange(e)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Annuler
          </Button>
          <Button variant="success" onClick={handleAddSoins}>
            Soumettre
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Soins Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un soin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Titre du Soin"
                value={selectedSoins?.SoinsTitre || ''}
                onChange={(e) =>
                  setSelectedSoins({ ...selectedSoins, SoinsTitre: e.target.value } as Soins)
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description du Soin"
                value={selectedSoins?.SoinsDescription || ''}
                onChange={(e) =>
                  setSelectedSoins({ ...selectedSoins, SoinsDescription: e.target.value } as Soins)
                }
              />
            </div>
            <div className="mb-3">
              <Form.Select
                value={selectedSoins?.ServiceId || ''}
                onChange={(e) =>
                  setSelectedSoins({ ...selectedSoins, ServiceId: parseInt(e.target.value) } as Soins)
                }
              >
                <option value="">Sélectionner un service</option>
                {serviceOptions.map((service) => (
                  <option key={service.ServiceId} value={service.ServiceId}>
                    {service.ServiceTitre}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                onChange={(e) => handleImageChange(e, true)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Annuler
          </Button>
          <Button variant="success" onClick={handleEditSoins}>
            Soumettre
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Soins Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: 'red' }}>
          <Modal.Title>Supprimer un soin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Voulez-vous vraiment supprimer ce soin ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Non
          </Button>
          <Button variant="danger" onClick={handleDeleteSoins}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Soins List Table */}
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
              placeholder="Recherche par titre ou description"
              value={searchQuery}
              onChange={handleSearchChange}
              className="form-control my-3"
              style={{
                float: 'right',
                width: '300px',
                boxShadow: searchQuery ? '0px 4px 8px rgba(0, 185, 142, 0.5)' : 'none',
                borderColor: searchQuery ? '#00B98E' : '#ced4da',
              }}
            />
      <Table  className="text-center align-middle table-bordered table-hover mt-4">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Image</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentSoins.map((soin) => (
            <tr key={soin.SoinsId}>
              <td>{soin.SoinsTitre}</td>
              <td>{soin.SoinsDescription}</td>
              <td><img src={soin.SoinsImage} width="80" height="80" /></td>
              <td>
              <a
                        href="#" onClick={() => {
                  setSelectedSoins(soin);
                  setShowEditModal(true);
                }}>
                  <i className="fas fa-edit" style={{ color: 'orange' }}></i>
                </a>
                </td>
                    <td>
                <a
                        href="#" onClick={() => {
                  setSelectedSoins(soin);
                  setShowDeleteModal(true);
                }} className="ms-2">
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

export default SoinsComponent;