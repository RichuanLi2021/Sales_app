import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubmitPO = ({ clientID }) => {
  const [lines, setLines] = useState([{ partNo: '', quantity: '' }]);
  const [parts, setParts] = useState([]);
  const [warning, setWarning] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8888/api/parts_list')
      .then(response => setParts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handlePartChange = (index, value) => {
    const newLines = [...lines];
    newLines[index].partNo = value;
    newLines[index].quantity = ''; // Reset quantity when part changes
    setLines(newLines);
    setWarning('');
    setSuccessMessage('');
  };

  const handleQuantityChange = (index, value) => {
    const newLines = [...lines];
    const partNo = newLines[index].partNo;
    const selectedPart = parts.find(part => part.partNo007 === parseInt(partNo, 10));

    if (!selectedPart) {
      console.log(`Part not found for partNo: ${partNo}`); // Debug log
      setWarning('You have to choose the Product first');
      return;
    }

    const newQuantity = parseInt(value, 10);
    if (isNaN(newQuantity) || newQuantity < 0) {
      newLines[index].quantity = '';
      setWarning('');
    } else if (newQuantity > selectedPart.QoH007) {
      newLines[index].quantity = selectedPart.QoH007;
      setWarning('Quantity exceeds available stock');
    } else {
      newLines[index].quantity = newQuantity;
      setWarning('');
    }

    setLines(newLines);
    setSuccessMessage('');
  };

  const addLine = () => {
    if (lines.some(line => !line.partNo)) {
      setWarning('Please select the product first');
      return;
    }
    if (lines.length >= 10) {
      setWarning('You cannot add more products');
      return;
    }
    setLines([...lines, { partNo: '', quantity: '' }]);
    setWarning('');
    setSuccessMessage('');
  };

  const removeLine = index => {
    const newLines = lines.filter((_, i) => i !== index);
    setLines(newLines);
    setWarning('');
    setSuccessMessage('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (lines.some(line => !line.partNo || line.quantity === '' || line.quantity <= 0)) {
      setWarning('Please complete all lines before submitting');
      return;
    }
  
    const payload = {
      clientCompID007: clientID,
      dateOfPO007: new Date().toISOString().split('T')[0],
      lines: lines.map(line => ({
        partNo007: line.partNo,
        qty007: line.quantity,
        priceOrdered007: parts.find(part => part.partNo007 === parseInt(line.partNo, 10)).currentPrice007
      }))
    };
  
    console.log('Payload:', payload); // Debug log
  
    axios.post('http://localhost:8888/api/submit-pos', payload)
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Purchase Order has been placed successfully');
        setLines([{ partNo: '', quantity: '' }]);
      })
      .catch(error => {
        console.error(error);
        setWarning(error.response ? error.response.data.message : 'Error submitting Purchase Order');
      });
  };

  return (
    <div>
      <h2>Submit Purchase Order</h2>
      <p>Client ID: {clientID}</p> {/* Display the client ID */}
      <form onSubmit={handleSubmit}>
        {lines.map((line, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h4>Line {index + 1}</h4>
            <label>
              Part No:
              <select value={line.partNo} onChange={e => handlePartChange(index, e.target.value)}>
                <option value="">Select Part</option>
                {parts.map(part => (
                  <option key={part.partNo007} value={part.partNo007}>
                    {part.partNo007} - {part.partName007}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Quantity:
              <input
                type="number"
                value={line.quantity}
                onChange={e => handleQuantityChange(index, e.target.value)}
                min="0"
                disabled={!line.partNo}
              />
            </label>
            {index === lines.length - 1 && (
              <>
                <button type="button" onClick={addLine}>Add Line</button>
                {lines.length > 1 && (
                  <button type="button" onClick={() => removeLine(index)}>Remove Line</button>
                )}
              </>
            )}
          </div>
        ))}
        <button type="submit">Submit PO</button>
        <p style={{ color: 'red' }}>{warning}</p>
        <p style={{ color: 'green' }}>{successMessage}</p>
      </form>
    </div>
  );
};

export default SubmitPO;