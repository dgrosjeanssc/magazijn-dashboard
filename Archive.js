
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Archive() {
  const [archive, setArchive] = useState([]);

  useEffect(() => {
    axios.get('/api/archive')
      .then(response => setArchive(response.data))
      .catch(error => console.error('Error fetching archive:', error));
  }, []);

  return (
    <div>
      <h1>Archief</h1>
      <ul>
        {archive.map(entry => (
          <li key={entry.id}>
            {entry.volgnummer} - {entry.transportfirma} - {entry.aantal_colli} - {entry.cubage} - {entry.lane} - {entry.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Archive;
