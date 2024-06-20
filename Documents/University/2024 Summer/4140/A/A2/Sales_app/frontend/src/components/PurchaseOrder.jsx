import React, { useState } from 'react';
import PreparePO from './PreparePO';
import SubmitPO from './SubmitPO';

const PurchaseOrder = () => {
  const [clientID, setClientID] = useState('');

  return (
    <div>
      <PreparePO clientID={clientID} setClientID={setClientID} />
      <SubmitPO clientID={clientID} />
    </div>
  );
};

export default PurchaseOrder;