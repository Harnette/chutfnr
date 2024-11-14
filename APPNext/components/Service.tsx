'use client'
import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

interface Service {
  ServiceId: number;
  ServiceTitre: string;
  ServiceDescription: string;
  ServiceImage: string;
}

const ServiceComponent: React.FC = () => {
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [filteredService, setFilteredService] = useState<Service[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [newService, setNewService] = useState({ ServiceTitre: '', ServiceDescription: '', ServiceImage: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;

  useEffect(() => {
    fetch('http://127.0.0.1:8000/service')
      .then((response) => response.json())
      .then((data) => {
        setServiceList(data);
        setFilteredService(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Gestion du filtrage
  useEffect(() => {
    const filtered = serviceList.filter(
      (service) =>
      service.ServiceTitre.includes(searchQuery) ||
      service.ServiceDescription.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredService(filtered);
    setCurrentPage(1); // Réinitialise à la première page lors d'un filtrage
  }, [searchQuery, serviceList]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Pagination
  const indexOfLastService = currentPage * contactsPerPage;
  const indexOfFirstService = indexOfLastService - contactsPerPage;
  const currentService = filteredService.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredService.length / contactsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files ? e.target.files[0] : null);
  };

  const handleAddService = () => {
    const formData = new FormData();
    formData.append('ServiceTitre', newService.ServiceTitre);
    formData.append('ServiceDescription', newService.ServiceDescription);
    if (imageFile) formData.append('ServiceImage', imageFile);

    fetch('http://127.0.0.1:8000/service/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setServiceList([...serviceList, data]);
        setShowAddModal(false);
        setNewService({ ServiceTitre: '', ServiceDescription: '', ServiceImage: '' });
        setImageFile(null);
      })
      .catch((error) => console.error(error));
  };

  const handleEditService = () => {
    if (!selectedService) return;

    const formData = new FormData();
    formData.append('ServiceTitre', selectedService.ServiceTitre);
    formData.append('ServiceDescription', selectedService.ServiceDescription);
    if (imageFile) formData.append('ServiceImage', imageFile);

    fetch(`http://127.0.0.1:8000/service/${selectedService.ServiceId}/`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedServiceList = serviceList.map((service) =>
          service.ServiceId === data.ServiceId ? data : service
        );
        setServiceList(updatedServiceList);
        setShowEditModal(false);
        setImageFile(null);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteService = () => {
    if (!selectedService) return;

    fetch(`http://127.0.0.1:8000/service/${selectedService.ServiceId}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setServiceList(serviceList.filter((service) => service.ServiceId !== selectedService.ServiceId));
        setShowDeleteModal(false);
        setSelectedService(null);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container py-3">
      <h1>SERVICE</h1>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Titre"
            value={newService.ServiceTitre}
            onChange={(e) => setNewService({ ...newService, ServiceTitre: e.target.value })}
          />
          <textarea
            className="form-control mt-2"
            placeholder="Description"
            value={newService.ServiceDescription}
            onChange={(e) => setNewService({ ...newService, ServiceDescription: e.target.value })}
          />
          <input type="file" className="form-control mt-2" onChange={handleFileChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Annuler</Button>
          <Button variant="success" onClick={handleAddService}>Soumettre</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: 'orange' }}>
          <Modal.Title>Modifier un service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Titre"
            value={selectedService?.ServiceTitre || ''}
            onChange={(e) =>
              setSelectedService({ ...selectedService, ServiceTitre: e.target.value } as Service)
            }
          />
          <textarea
            className="form-control mt-2"
            placeholder="Description"
            value={selectedService?.ServiceDescription || ''}
            onChange={(e) =>
              setSelectedService({ ...selectedService, ServiceDescription: e.target.value } as Service)
            }
          />
          <input type="file" className="form-control mt-2" onChange={handleFileChange} />
          {selectedService?.ServiceImage && (
            <div className="mt-2">
              <p>Image actuelle :</p>
              <img src={selectedService.ServiceImage} alt={selectedService.ServiceTitre} width="100" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'orange' }}>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Annuler</Button>
          <Button variant="success" onClick={handleEditService}>Soumettre</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: 'red' }}>
          <Modal.Title>Supprimer un service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Voulez-vous supprimer ce service ?</p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'red' }}>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Non</Button>
          <Button variant="danger" onClick={handleDeleteService}>Oui</Button>
        </Modal.Footer>
      </Modal>

      {/* Service List Table */}
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
          {currentService.map((service) => (
            <tr key={service.ServiceId}>
              <td>{service.ServiceTitre}</td>
              <td>{service.ServiceDescription}</td>
              <td><img src={service.ServiceImage} alt={service.ServiceTitre} width="80" height="80" /></td>
              <td>
              <a
                        href="#"
                  onClick={() => {
                    setSelectedService(service);
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
                    setSelectedService(service);
                    setShowDeleteModal(true);
                  }}
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

export default ServiceComponent;