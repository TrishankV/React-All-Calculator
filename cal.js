import React , {useState} from 'react' ;

function Calculator() {
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
    } 
    else if (value === 'DEL') 
    {
        if (input.length > 0) {
          setInput(input.slice(0, -1)); // Remove the last character from input
        } else {
          setResult(result.slice(0, -1)); // Remove the last character from result
        }
      }
      else {
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
    <div className="calculator">
      <>
      <h2>Basic Calculator</h2></>
      <div className="accent-line"></div>
      <div className="input-display" style={{ color: 'black' , background: 'white' , borderRadius:'15px'}}>
      {result || input || '\u00a0'}
      </div>
      <div className="button-container">
      {/* <div className="button-row">           */}
          {/* <button onClick={repeatAns}>Ans</button> */}
        {/* </div> */}
        <div className="button-row">
          {[7, 8, 9, '*'].map((item) => (
            <button key={item} onClick={() => handleButtonClick(item)}>
              {item}
            </button>
          ))}
          <button onClick={() => handleButtonClick('C')} style={{ background: 'red', color: 'white' }}>
            C
          </button>
        </div>
        <div className="button-row">
          {[4, 5, 6, '+'].map((item) => (
            <button key={item} onClick={() => handleButtonClick(item)}>
              {item}
            </button>
          ))}
          <button onClick={() => handleButtonClick('%')} style={{ background: 'red', color: 'white' }}>
            %
          </button>
        </div>
        <div className="button-row">
          {[1, 2, 3, '-'].map((item) => (
            <button key={item} onClick={() => handleButtonClick(item)}>
              {item}
            </button>
          ))}
          <button onClick={() => handleButtonClick('DEL')} style={{ background: 'red', color: 'white' }}>
            del
          </button>
        </div>
        <div className="button-row">
          {['(', '0', ')', '/', '.'].map((item) => (
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
export default Calculator ; 