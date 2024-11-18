import React, { useState, useEffect } from 'react';
import { startFlow, updateFlow, getFlow } from './api';
import './App.css';

const App = () => {
  const [flowId, setFlowId] = useState(null);
  const [flowState, setFlowState] = useState('IDLE');
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (flowId && isRunning) {
      intervalId = setInterval(async () => {
        try {
          const flow = await getFlow(flowId);
          console.log('Current flow:', flow);
          setFlowState(flow.state);
        } catch (error) {
          console.error('Error:', error);
        }
      }, 1000);
    }
    return () => intervalId && clearInterval(intervalId);
  }, [flowId, isRunning]);

  const addLog = (message, type = 'info') => {
    const newLog = { message, type, timestamp: new Date() };
    console.log('Log:', newLog);
    setLogs(prev => [...prev, newLog]);
  };

  const wait = async (duration = 3000) => {
    await new Promise(resolve => setTimeout(resolve, duration));
  };

  const handleStart = async () => {
    try {
      setIsRunning(true);
      const flow = await startFlow();
      setFlowId(flow._id);
      simulateFlow(flow._id);
    } catch (error) {
      console.error('Error:', error);
      setIsRunning(false);
    }
  };

  const simulateFlow = async (id) => {
    try {
      await updateFlow(id, 'FIRST_REMINDER');
      setFlowState('FIRST_REMINDER');
      addLog('Sending first reminder');

      await wait(3000);
      await updateFlow(id, 'WAITING_FIRST');
      addLog('Waiting for first response');

      await wait(3000);
      const firstResponse = Math.random() > 0.5;
      console.log('\n[First Response]', {
        renewed: firstResponse,
        timestamp: new Date().toISOString()
      });

      if (firstResponse) {
        await updateFlow(id, 'COMPLETED_SUCCESS');
        addLog('Customer renewed after first reminder!');
        await wait(2000);
        addLog('Sending thank you message');
        setIsRunning(false);
        return;
      }

      await updateFlow(id, 'SECOND_REMINDER');
      addLog('Customer did not renew - Sending second reminder');

      await wait(3000);
      await updateFlow(id, 'WAITING_SECOND');
      addLog('Waiting for second response');

      await wait(3000);
      const secondResponse = Math.random() > 0.5;
      console.log('\n[Second Response]', {
        renewed: secondResponse,
        timestamp: new Date().toISOString()
      });

      if (secondResponse) {
        await updateFlow(id, 'COMPLETED_SUCCESS');
        addLog('Customer renewed after second reminder!');
        await wait(2000);
        addLog('Sending thank you message');
      } else {
        await updateFlow(id, 'COMPLETED_FAILURE');
        addLog('Customer did not renew after second reminder');
      }
      setIsRunning(false);
    } catch (error) {
      console.error('\n[Flow Error]', error);
      addLog('Flow simulation failed');
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setFlowId(null);
    setFlowState('IDLE');
    setLogs([]);
    setIsRunning(false);
  };

  return (
    <div className="container">
      <h1>Newsletter Renewal Flow</h1>
      
      <div className="controls">
        <button onClick={handleStart} disabled={isRunning}>
          Start Flow
        </button>
        <button onClick={handleReset} disabled={isRunning}>
          Reset
        </button>
      </div>

      <div className="status">
        <h2>Status: {flowState}</h2>
      </div>

      <div className="steps">
        <div className={`step ${flowState === 'FIRST_REMINDER' ? 'active' : ''}`}>
          First Reminder
        </div>
        <div className={`step ${flowState === 'WAITING_FIRST' ? 'active' : ''}`}>
          Awaiting First Response
        </div>
        <div className={`step ${flowState === 'SECOND_REMINDER' ? 'active' : ''}`}>
          Second Reminder
        </div>
        <div className={`step ${flowState === 'WAITING_SECOND' ? 'active' : ''}`}>
          Awaiting Final Response
        </div>
      </div>

      <div className="logs">
        <h2>Activity Log</h2>
        {logs.map((log, index) => (
          <div key={index} className="log-entry">
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
