import React, { useEffect, useState } from 'react';
import GitClient from './GitClient';

const gitClient = new GitClient();

function App() {
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    gitClient
      .getRepositories('techiesyed')
      .then((repos) => setRepositories(repos))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>GitHub Repositories</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {repositories.map((repo, index) => (
          <li key={index}>{repo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
