'use client'
import { useState } from 'react';

const InscriptionForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/admins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ AuthentificationNom: username, AuthentificationMotDePasse: password }),
        });

        if (response.ok) {
            // Gérer la réussite
            alert('Inscription réussie');
        } else {
            // Gérer l'erreur
            alert('Erreur lors de l\'inscription');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4><label>Nom :</label></h4>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <h4><label>Mot de passe :</label></h4>
            <div className="form-floating mb-3">
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-success py-3 w-100 mb-4">S'inscrire</button>
            <p className="text-center mb-0">vous avez déjà un compte? 
            <a href="http://127.0.0.1:3000/connexion">Se connecter</a></p>
        </form>
    );
};

export default InscriptionForm;