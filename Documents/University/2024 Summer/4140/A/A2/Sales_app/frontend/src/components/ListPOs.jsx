import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListPOs = () => {
  const [pos, setPos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8888/api/pos_List')
      .then(response => setPos(response.data))
      .catch(error => console.error(error));
  }, []);

  const calculateTotal = (lines) => {
    return lines.reduce((total, line) => total + (line.priceOrdered007 * line.qty007), 0);
  };

  return (
    <div>
      <h2>Review Purchase Orders</h2>
      <ul>
        {pos.map(po => (
          <li key={po.poNo007}>
            PO#: {po.poNo007}, Client ID: {po.clientCompID007}, Date: {po.dateOfPO007}, Status: {po.status007}
            <div>Total: ${calculateTotal(po.lines)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPOs;