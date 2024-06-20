import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListParts = () => {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8888/api/parts_list')
      .then(response => setParts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Parts for Sale</h2>
      <ul>
        {parts.map(part => (
          <li key={part.partNo007}>
            Part No: {part.partNo007} - {part.partName007} - ${part.currentPrice007}
            <div>Current Stock: {part.QoH007}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListParts;