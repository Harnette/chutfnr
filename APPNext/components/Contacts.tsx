'use client'
import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

interface Contact {
  ContactId: number;
  date: string;
  NumeroUrgence: string;
  Email: string;
}

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newContact, setNewContact] = useState({ NumeroUrgence: '', Email: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;

  // Recuperer données depuis backend
  useEffect(() => {
    fetch('http://127.0.0.1:8000/contact')
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
        setFilteredContacts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Gestion du filtrage
  useEffect(() => {
    const filtered = contacts.filter(
      (contact) =>
        contact.NumeroUrgence.includes(searchQuery) ||
        contact.Email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContacts(filtered);
    setCurrentPage(1); // Réinitialise à la première page lors d'un filtrage
  }, [searchQuery, contacts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Pagination
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleAddContact = () => {
    fetch('http://127.0.0.1:8000/contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
      .then((data) => {
        setContacts([...contacts, data]);
        setShowAddModal(false);
        setNewContact({ NumeroUrgence: '', Email: '' });
      })
      .catch((error) => console.error(error));
  };

  const handleEditContact = () => {
    if (!selectedContact) return;

    fetch(`http://127.0.0.1:8000/contact/${selectedContact.ContactId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedContact),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedContacts = contacts.map((contact) =>
          contact.ContactId === data.ContactId ? data : contact
        );
        setContacts(updatedContacts);
        setShowEditModal(false);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteContact = () => {
    if (!selectedContact) return;

    fetch(`http://127.0.0.1:8000/contact/${selectedContact.ContactId}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setContacts(contacts.filter((contact) => contact.ContactId !== selectedContact.ContactId));
        setShowDeleteModal(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container py-3">
      <h1>CONTACT</h1>

      {/* Nouveau Contact Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter des contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Numero d'urgence"
                value={newContact.NumeroUrgence}
                onChange={(e) => setNewContact({ ...newContact, NumeroUrgence: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={newContact.Email}
                onChange={(e) => setNewContact({ ...newContact, Email: e.target.value })}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Annuler
          </Button>
          <Button variant="success" onClick={handleAddContact}>
            Soumettre
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modification Contact Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: 'orange' }}>
          <Modal.Title>Modifier contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Numero d'urgence"
                value={selectedContact?.NumeroUrgence || ''}
                onChange={(e) =>
                  setSelectedContact({
                    ...selectedContact,
                    NumeroUrgence: e.target.value,
                  } as Contact)
                }
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={selectedContact?.Email || ''}
                onChange={(e) =>
                  setSelectedContact({
                    ...selectedContact,
                    Email: e.target.value,
                  } as Contact)
                }
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'orange' }}>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Annuler
          </Button>
          <Button variant="success" onClick={handleEditContact}>
            Soumettre
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Suppression Contact Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: 'red' }}>
          <Modal.Title>Supprimer contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Voulez-vous supprimer ce contact ?</p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'red' }}>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Non
          </Button>
          <Button variant="success" onClick={handleDeleteContact}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Contact List Table */}
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
              placeholder="Recherche par numéro d'urgence ou email"
              value={searchQuery}
              onChange={handleSearchChange}
              className="form-control my-3"
              style={{
                float: 'right',
                width: '360px',
                boxShadow: searchQuery ? '0px 4px 8px rgba(0, 185, 142, 0.5)' : 'none',
                borderColor: searchQuery ? '#00B98E' : '#ced4da',
              }}
            />
            <Table className="text-center align-middle table-bordered table-hover mt-4">
              <thead>
                <tr>
                  <th>Numéro urgence</th>
                  <th>Email</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentContacts.map((contact) => (
                  <tr key={contact.ContactId}>
                    <td>{contact.NumeroUrgence}</td>
                    <td>{contact.Email}</td>
                    <td>
                      <a
                        href="#"
                        onClick={() => {
                          setSelectedContact(contact);
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
                          setSelectedContact(contact);
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

export default Contacts;
