'use client'
import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';

interface Soins {
  SoinsId: number;
  SoinsTitre: string;
}

interface Condition {
  ConditionId: number;
  ConditionList: string;
  SoinsId: number;
}

const ConditionComponent: React.FC = () => {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [filteredCondition, setFilteredCondition] = useState<Condition[]>([]);
  const [soinsOptions, setSoinsOptions] = useState<Soins[]>([]);
  const [newCondition, setNewCondition] = useState<Condition>({ ConditionId: 0, ConditionList: '', SoinsId: 0 });
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const conditionPerPage = 5;

  useEffect(() => {
    // Fetch conditions
    fetch('http://127.0.0.1:8000/conditions')
      .then((response) => response.json())
      .then((data) => {
        setConditions(data);
        setFilteredCondition(data);
      })
      .catch((error) => console.error(error));

    // Fetch soins for dropdown
    fetch('http://127.0.0.1:8000/soins')
      .then((response) => response.json())
      .then((data) => setSoinsOptions(data))
      .catch((error) => console.error(error));
  }, []);

  // Gestion du filtrage
  useEffect(() => {
    const filtered = conditions.filter(
      (condition) =>
      condition.ConditionList.includes(searchQuery) ||
      condition.ConditionList.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCondition(filtered);
    setCurrentPage(1); // Réinitialise à la première page lors d'un filtrage
  }, [searchQuery, conditions]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Pagination
  const indexOfLastSoins = currentPage * conditionPerPage;
  const indexOfFirstSoins = indexOfLastSoins - conditionPerPage;
  const currentCondition = filteredCondition.slice(indexOfFirstSoins, indexOfLastSoins);
  const totalPages = Math.ceil(filteredCondition.length / conditionPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleAddCondition = () => {
    fetch('http://127.0.0.1:8000/conditions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCondition),
    })
      .then((response) => response.json())
      .then((data) => {
        setConditions([...conditions, data]);
        setShowAddModal(false);
        setNewCondition({ ConditionId: 0, ConditionList: '', SoinsId: 0 });
      })
      .catch((error) => console.error(error));
  };

  const handleEditCondition = () => {
    if (!selectedCondition) return;

    fetch(`http://127.0.0.1:8000/conditions/${selectedCondition.ConditionId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedCondition),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedConditions = conditions.map((cond) =>
          cond.ConditionId === data.ConditionId ? data : cond
        );
        setConditions(updatedConditions);
        setShowEditModal(false);
        setSelectedCondition(null);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteCondition = () => {
    if (!selectedCondition) return;

    fetch(`http://127.0.0.1:8000/conditions/${selectedCondition.ConditionId}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setConditions(conditions.filter((cond) => cond.ConditionId !== selectedCondition.ConditionId));
        setShowDeleteModal(false);
        setSelectedCondition(null);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container py-3">
      <h1>CONDITIONS</h1>

      {/* Add Condition Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une condition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Condition"
                value={newCondition.ConditionList}
                onChange={(e) => setNewCondition({ ...newCondition, ConditionList: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <Form.Select
                value={newCondition.SoinsId}
                onChange={(e) => setNewCondition({ ...newCondition, SoinsId: parseInt(e.target.value) })}
              >
                <option value="">Sélectionner un soin</option>
                {soinsOptions.map((soins) => (
                  <option key={soins.SoinsId} value={soins.SoinsId}>
                    {soins.SoinsTitre}
                  </option>
                ))}
              </Form.Select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Annuler
          </Button>
          <Button variant="success" onClick={handleAddCondition}>
            Soumettre
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Condition Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier une condition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Condition"
                value={selectedCondition?.ConditionList || ''}
                onChange={(e) =>
                  setSelectedCondition({ ...selectedCondition, ConditionList: e.target.value } as Condition)
                }
              />
            </div>
            <div className="mb-3">
              <Form.Select
                value={selectedCondition?.SoinsId || ''}
                onChange={(e) =>
                  setSelectedCondition({ ...selectedCondition, SoinsId: parseInt(e.target.value) } as Condition)
                }
              >
                <option value="">Sélectionner un soin</option>
                {soinsOptions.map((soins) => (
                  <option key={soins.SoinsId} value={soins.SoinsId}>
                    {soins.SoinsTitre}
                  </option>
                ))}
              </Form.Select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Annuler
          </Button>
          <Button variant="success" onClick={handleEditCondition}>
            Soumettre
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Condition Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: 'red' }}>
          <Modal.Title>Supprimer une condition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Voulez-vous vraiment supprimer cette condition ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Non
          </Button>
          <Button variant="danger" onClick={handleDeleteCondition}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Conditions List Table */}
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
              placeholder="Recherche par liste"
              value={searchQuery}
              onChange={handleSearchChange}
              className="form-control my-3"
              style={{
                float: 'right',
                width: '180px',
                boxShadow: searchQuery ? '0px 4px 8px rgba(0, 185, 142, 0.5)' : 'none',
                borderColor: searchQuery ? '#00B98E' : '#ced4da',
              }}
            />
      <Table className="text-center align-middle table-bordered table-hover mt-4">
        <thead>
          <tr>
            <th>Condition</th>
            <th>Soin</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCondition.map((condition) => (
            <tr key={condition.ConditionId}>
              <td>{condition.ConditionList}</td>
              <td>{soinsOptions.find((soins) => soins.SoinsId === condition.SoinsId)?.SoinsTitre}</td>
              <td>
                <a href="#" onClick={() => {
                  setSelectedCondition(condition);
                  setShowEditModal(true);
                }}>
                  <i className="fas fa-edit" style={{ color: 'orange' }}></i>
                </a>
                </td>
                <td>
                <a href="#" onClick={() => {
                  setSelectedCondition(condition);
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

export default ConditionComponent;