import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2' ;
ChartJS.register(ArcElement, Tooltip, Legend);


function InterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState(1);
  const [simpleInterest, setSimpleInterest] = useState('');
  const [compoundInterest, setCompoundInterest] = useState('');
  
  useEffect(() => {
    calculateSimpleInterest();
    calculateCompoundInterest();
  }, [principal, rate, time]);

  const calculateSimpleInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;

    if (!isNaN(p) && !isNaN(r) && !isNaN(time)) {
      const calculatedInterest = (p * r * time).toFixed(2);
      setSimpleInterest(`Simple Interest: Rs. ${calculatedInterest}`);
    } else {
      setSimpleInterest('Please enter valid numbers.');
    }
  };

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;

    if (!isNaN(p) && !isNaN(r) && !isNaN(time)) {
      const calculatedInterest = (
        p * Math.pow(1 + r, time) - p
      ).toFixed(2);
      setCompoundInterest(`Compound Interest: Rs. ${calculatedInterest}`);
    } else {
      setCompoundInterest('Please enter valid numbers.');
    }
  };
  const principalValue = parseFloat(principal);
  const rateValue = parseFloat(rate) / 100;
  const simpleInterestValue = !isNaN(principalValue) && !isNaN(rateValue) && !isNaN(time)
    ? (principalValue * rateValue * time).toFixed(2)
    : 0;
  const compoundInterestValue = !isNaN(principalValue) && !isNaN(rateValue) && !isNaN(time)
    ? (principalValue * Math.pow(1 + rateValue, time) - principalValue).toFixed(2)
    : 0;

  // Define data for Simple Interest Pie Chart
  const simpleInterestChartData = {
    labels: ['Principal', 'Simple Interest'],
    datasets: [
      {
        data: [principal, simpleInterestValue],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  // Define data for Compound Interest Pie Chart
  const compoundInterestChartData = {
    labels: ['Principal', 'Compound Interest'],
    datasets: [
      {
        data: [principalValue, compoundInterestValue],
        backgroundColor: ['#FF6384', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="interest">
      <h2>Interest Calculator</h2>
      <div className="accent-line"></div>
      <table className="input-container">
        <tbody>
          <tr>
            <td>Principal (P): Rs.</td>
            <td>
              <input className='input-di'
                type="text"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </td>
            <td>
              <input
                type="range"
                value={principal}
                min="1000"
                max="1000000"
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>ROI (p.a.) (R):</td>
            <td>
              <input className='input-di'
                type="text"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              /> %
            </td>
            <td>
              <input
                type="range"
                value={rate}
                min="1"
                max="50"
                step="0.1"
                onChange={(e) => setRate(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Time (T):</td>
            <td>
              <input className='input-di'
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              /> Years
            </td>
            <td>
              <input 
                type="range"
                min="1"
                max="10"
                step="1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="result">{simpleInterest}</div>
      <div className="result">{compoundInterest}</div>
      <div className='charts-container'>   
        <div className='chart' style={{ float: 'left', width: '50%' }}>
          <h3>Principal vs Simple Interest</h3>
          <Pie data={simpleInterestChartData} />
        </div>
        <div className='chart' style={{ float: 'left', width: '50%' }}>
          <h3>Principal vs CompoundInterest</h3>
          <Pie data={compoundInterestChartData} />
        </div>
      </div>
    </div>
  );
  };
  
  export default InterestCalculator ; 