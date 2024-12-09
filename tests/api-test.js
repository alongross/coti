import axios from 'axios';
import { expect } from 'chai';

describe('End-to-End Transaction Flow', function () {
  this.timeout(60000);

  const apiBaseUrl = 'https://api.your-blockchain-service.com';
  let transactionId;

  it('should execute a transaction flow successfully', async function () {
    // Step 1: Initiate Transaction
    const initiateResponse = await axios.post(`${apiBaseUrl}/transactions`, {
      amount: 100,
      recipient: '0xRecipientAddressHere',
    });
    expect(initiateResponse.status).to.equal(201);
    transactionId = initiateResponse.data.transactionId;

    // Step 2: Verify Transaction Details
    const verifyResponse = await axios.get(`${apiBaseUrl}/transactions/${transactionId}`);
    expect(verifyResponse.status).to.equal(200);
    expect(verifyResponse.data.transactionId).to.equal(transactionId);
    expect(verifyResponse.data.status).to.equal('Pending');

    // Step 3: Monitor Transaction Status
    let status = 'Pending';
    let attempts = 0;
    while (status === 'Pending' && attempts < 10) {
      const statusResponse = await axios.get(`${apiBaseUrl}/transactions/${transactionId}`);
      status = statusResponse.data.status;
      if (status === 'Processed') break;
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    }
    expect(status).to.equal('Processed');
  });
});
