'use client'
import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

interface Equipe {
  EquipeId: number;
  EquipeNom: string;
  EquipeFonction: string;
  EquipePhoto: string;
}

const EquipeComponent: React.FC = () => {
  const [equipeList, setEquipeList] = useState<Equipe[]>([]);
  const [filteredEquipe, setFilteredEquipe] = useState<Equipe[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEquipe, setSelectedEquipe] = useState<Equipe | null>(null);
  const [newEquipe, setNewEquipe] = useState({ EquipeNom: '', EquipeFonction: '', EquipePhoto: '' });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const equipePerPage = 5;

  useEffect(() => {
    fetch('http://127.0.0.1:8000/equipe/')
      .then((response) => response.json())
      .then((data) => {
        setEquipeList(data);
        setFilteredEquipe(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoFile(e.target.files ? e.target.files[0] : null);
  };

  // Gestion du filtrage
  useEffect(() => {
    const filtered = equipeList.filter(
      (equipe) =>
      equipe.EquipeNom?.includes(searchQuery) ||
      equipe.EquipeFonction?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEquipe(filtered);
    setCurrentPage(1); // Réinitialise à la première page lors d'un filtrage
  }, [searchQuery, equipeList]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Pagination
  const indexOfLastEquipe = currentPage * equipePerPage;
  const indexOfFirstEquipe = indexOfLastEquipe - equipePerPage;
  const currentEquipe = filteredEquipe.slice(indexOfFirstEquipe, indexOfLastEquipe);
  const totalPages = Math.ceil(filteredEquipe.length / equipePerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleAddEquipe = () => {
    const formData = new FormData();
    formData.append('EquipeNom', newEquipe.EquipeNom);
    formData.append('EquipeFonction', newEquipe.EquipeFonction);
    if (photoFile) formData.append('EquipePhoto', photoFile);

    fetch('http://127.0.0.1:8000/equipe/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setEquipeList([...equipeList, data]);
        setShowAddModal(false);
        setNewEquipe({ EquipeNom: '', EquipeFonction: '', EquipePhoto: '' });
        setPhotoFile(null);
      })
      .catch((error) => console.error(error));
  };

  const handleEditEquipe = () => {
    if (!selectedEquipe) return;

    const formData = new FormData();
    formData.append('EquipeNom', selectedEquipe.EquipeNom);
    formData.append('EquipeFonction', selectedEquipe.EquipeFonction);
    if (photoFile) formData.append('EquipePhoto', photoFile);

    fetch(`http://127.0.0.1:8000/equipe/${selectedEquipe.EquipeId}/`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedEquipeList = equipeList.map((equipe) =>
          equipe.EquipeId === data.EquipeId ? data : equipe
        );
        setEquipeList(updatedEquipeList);
        setShowEditModal(false);
        setPhotoFile(null);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteEquipe = () => {
    if (!selectedEquipe) return;

    fetch(`http://127.0.0.1:8000/equipe/${selectedEquipe.EquipeId}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setEquipeList(equipeList.filter((equipe) => equipe.EquipeId !== selectedEquipe.EquipeId));
        setShowDeleteModal(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container py-3">
      <h1>ÉQUIPE</h1>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un membre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Nom"
            value={newEquipe.EquipeNom}
            onChange={(e) => setNewEquipe({ ...newEquipe, EquipeNom: e.target.value })}
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Fonction"
            value={newEquipe.EquipeFonction}
            onChange={(e) => setNewEquipe({ ...newEquipe, EquipeFonction: e.target.value })}
          />
          <input type="file" className="form-control mt-2" onChange={handleFileChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Annuler</Button>
          <Button variant="success" onClick={handleAddEquipe}>Soumettre</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: 'orange' }}>
          <Modal.Title>Modifier un membre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Nom"
            value={selectedEquipe?.EquipeNom || ''}
            onChange={(e) =>
              setSelectedEquipe({ ...selectedEquipe, EquipeNom: e.target.value } as Equipe)
            }
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Fonction"
            value={selectedEquipe?.EquipeFonction || ''}
            onChange={(e) =>
              setSelectedEquipe({ ...selectedEquipe, EquipeFonction: e.target.value } as Equipe)
            }
          />
          <input type="file" className="form-control mt-2" onChange={handleFileChange} />
          {selectedEquipe?.EquipePhoto && (
            <div className="mt-2">
              <p>Photo actuelle :</p>
              <img src={selectedEquipe.EquipePhoto} alt={selectedEquipe.EquipeNom} width="100" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'orange' }}>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Annuler</Button>
          <Button variant="success" onClick={handleEditEquipe}>Soumettre</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: 'red' }}>
          <Modal.Title>Supprimer un membre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Voulez-vous supprimer ce membre ?</p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'red' }}>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Non</Button>
          <Button variant="danger" onClick={handleDeleteEquipe}>Oui</Button>
        </Modal.Footer>
      </Modal>

      {/* Équipe List Table */}
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
              placeholder="Recherche par nom ou fonction"
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
            <th>Nom</th>
            <th>Fonction</th>
            <th>Photo</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEquipe.map((equipe) => (
            <tr key={equipe.EquipeId}>
              <td>{equipe.EquipeNom}</td>
              <td>{equipe.EquipeFonction}</td>
              <td><img src={equipe.EquipePhoto} width="80" height="80" /></td>
              <td>
              <a
                        href="#"
                  onClick={() => {
                    setSelectedEquipe(equipe);
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
                    setSelectedEquipe(equipe);
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

export default EquipeComponent;