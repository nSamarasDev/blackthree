import React from 'react';
import axios from 'axios';

const QuantumDashboard = () => {
  const runPythonScript = () => {
    axios
      .get('api/particle/run-python-script/my_python_script')
      .then((response) => {
        console.log('Received data from Python script:', response.data);
        // Update the state or perform any other action with the received data
      })
      .catch((error) => {
        console.error('Error executing Python script:', error);
      });
  };

  return (
    <div className="container">
      <h1>Quantum Particle Design</h1>
      <button onClick={runPythonScript}>Run Python Script</button>
    </div>
  );
};

export default QuantumDashboard;
