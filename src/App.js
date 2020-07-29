import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories",{
      title: `Novo Projeto ${Date.now()}`,
      url: "https://github.com/carvalhow/",
      techs: ["NodeJS", "ReactJS"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    const deletedRepositoryIndex = repositories.findIndex(repository => repository.id === id);
    const updatedRepositories = [].concat(repositories)
    updatedRepositories.splice(deletedRepositoryIndex, 1);

    setRepositories(updatedRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={ () => handleRemoveRepository(repository.id) }>
              Remover
            </button>
          </li>
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
