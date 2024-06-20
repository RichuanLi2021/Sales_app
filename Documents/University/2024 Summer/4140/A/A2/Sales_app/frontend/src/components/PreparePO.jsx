import React, { useState } from 'react';
import axios from 'axios';

const PreparePO = ({ clientID, setClientID }) => {
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const handleChange = e => {
    setClientID(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.get(`http://localhost:8888/api/auth_client/validate-client/${clientID}`)
      .then(response => {
        if (response.data.isValid) {
          setMessage('Client ID is valid');
          setMessageColor('green');
        } else {
          setMessage('Client ID is invalid');
          setMessageColor('red');
        }
      })
      .catch(error => {
        console.error(error);
        setMessage('Error validating Client ID');
        setMessageColor('red');
      });
  };

  return (
    <div>
      <h2>Prepare Purchase Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Client ID:
          <input type="text" value={clientID} onChange={handleChange} />
        </label>
        <button type="submit">Prepare PO</button>
      </form>
      <p style={{ color: messageColor }}>{message}</p>
    </div>
  );
};

export default PreparePO;