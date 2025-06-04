
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    axios.get('/api/trucks')
      .then(response => setTrucks(response.data))
      .catch(error => console.error('Error fetching trucks:', error));
  }, []);

  const handleComplete = (id) => {
    axios.post(`/api/trucks/${id}/complete`)
      .then(() => setTrucks(trucks.filter(truck => truck.id !== id)))
      .catch(error => console.error('Error completing truck:', error));
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {trucks.map(truck => (
          <li key={truck.id}>
            {truck.volgnummer} - {truck.transportfirma} - {truck.aantal_colli} - {truck.cubage} - {truck.lane}
            <button onClick={() => handleComplete(truck.id)}>Afgehandeld</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
