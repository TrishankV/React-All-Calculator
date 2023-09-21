import React, { useState } from 'react';

function Scientific() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [ans, setAns] = useState('');
  const [packedRows, setPackedRows] = useState([]);

  const packNumbers = (numbers) => {
    const packedRows = [];
    for (let i = 0; i < numbers.length; i++) {
      if (i % 3 === 0) {
        packedRows.push([]);
      }
      packedRows[packedRows.length - 1].push(numbers[i]);
    }
    if (packedRows.length > 0) {
      packedRows[packedRows.length - 1].push(0);
    }
    return packedRows;
  };


  const calSin = (value) => {
    const rad = (value * Math.PI) / 180;
    return Math.sin(rad) ; 
}

const calCos = (value) => {
    const rad = (value * Math.PI) / 180;
    return Math.cos(rad) ; 
}


  const calculateResult = () => {
    try {
      const newResult = eval(input);
      setResult(newResult.toString()); // Convert result to string
      setAns(newResult);
    } catch (error) {
      setResult('Error');
    }
  };

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      calculateResult();
    } else if (value === 'DEL') {
      if (input.length > 0) {
        setInput(input.slice(0, -1)); // Remove the last character from input
      } else {
        setResult(result.slice(0, -1)); // Remove the last character from result
      }
    } else if (value === 'x^2') {
      setInput(input + '**2');
    } else if (value === 'x^3') {
      setInput(input + '**3');
    } else if (value === 'x^y') {
      setInput(input + '**');
    } else if (value === 'sqrt') {
      setInput('Math.sqrt(' + input + ')');
    } else if (value === 'ln') {
      setInput('Math.log(' + input + ')');
    } else if (value === 'log') {
      setInput('Math.log10(' + input + ')');
    } else if (value === 'sin') {
      setInput('Math.sin(' + input + ')');
    } else if (value === 'cos') {
      setInput('Math.cos(' + input + ')');
    } else if (value === 'tan') {
      setInput('Math.tan(' + input + ')');
    } else if (value === 'e^x') {
      setInput('Math.exp(' + input + ')');
    } else if (value === '10^x') {
      setInput('Math.pow(10,' + input + ')');
    } else if (value === '1/x') {
      setInput('1/(' + input + ')');
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const repeatAns = () => {
    setInput((prevInput) => prevInput + ans);
  };

  const handleInputNumbers = (numbers) => {
    setPackedRows(packNumbers(numbers));
  };


  return (
    <div className="scientific">
      <h2>Scientific Calculator</h2>
      <div className="accent-line"></div>
      <div className="input-display" style={{ color: 'black', background: 'white', borderRadius: '15px' }}>
        {result || input || '\u00a0'}
      </div>
      <div className="button-container">
        <div className="button-row">
          {[7, 8, 9, '*', 'sin', 'cos', 'tan'].map((item) => (
            <button key={item} onClick={() => handleButtonClick(item)}>
              {item}
            </button>
          ))}
          <button onClick={() => handleButtonClick('C')} style={{ background: 'red', color: 'white' }}>
            C
          </button>
        </div>
        <div className="button-row">
          {[4, 5, 6, '+', 'x^2', 'x^3', 'x^y'].map((item) => (
            <button key={item} onClick={() => handleButtonClick(item)}>
              {item}
            </button>
          ))}
          <button onClick={() => handleButtonClick('%')} style={{ background: 'red', color: 'white' }}>
            %
          </button>
        </div>
        <div className="button-row">
          {[1, 2, 3, '-', 'e^x', '10^x', '1/x'].map((item) => (
            <button key={item} onClick={() => handleButtonClick(item)}>
              {item}
            </button>
          ))}
          <button onClick={() => handleButtonClick('DEL')} style={{ background: 'red', color: 'white' }}>
            del
          </button>
        </div>
        <div className="button-row">
          {['(', '0', ')', '/', '.', 'ln', 'log', 'x!', 'e'].map((item) => (
            <button key={item} onClick={() => handleButtonClick(item)}>
              {item}
            </button>
          ))}
          <button onClick={calculateResult} style={{ background: 'green', color: 'white' }}>
            =
          </button>
        </div>
      </div>
      <div className="packed-rows">
        {packedRows.map((row, rowIndex) => (
          <div key={rowIndex} className="packed-row">
            {row.map((num, index) => (
              <span key={index} className="packed-number">
                {num}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scientific;
