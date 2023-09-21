import React , {useState} from "react"; 

function Computer(){
        
    // Binary to Decimal
    const binaryToDecimal = (binary) => parseInt(binary, 2);

    // Decimal to Binary
    const decimalToBinary = (decimal) => {
        const n = parseInt(decimal)
        const res = n.toString(2);
        return res
    }
    // Binary to Octal
    const binaryToOctal = (binary) => {
    const decimal = binaryToDecimal(binary);
    return decimal.toString(8);
    };

    // Octal to Binary
    const octalToBinary = (octal) => {
    const decimal = parseInt(octal, 8);
    return decimal.toString(2);
    };

    // Binary to Hexadecimal
    const binaryToHexadecimal = (binary) => {
    const decimal = binaryToDecimal(binary);
    return decimal.toString(16).toUpperCase();
    };

    // Hexadecimal to Binary
    const hexadecimalToBinary = (hexadecimal) => {
    const decimal = parseInt(hexadecimal, 16);
    return decimal.toString(2);
    };

    // Decimal to Octal
    const decimalToOctal = (decimal) => {
        const n = parseInt(decimal)
        const res = n.toString(8);
        return res
    };
    // Octal to Decimal
    const octalToDecimal = (octal) => parseInt(octal, 8);

    // Decimal to Hexadecimal
    const decimalToHexadecimal = (decimal) => {
        const n = parseInt(decimal)
        const res = n.toString(16);
        return res.toUpperCase()
    }

    // Hexadecimal to Decimal
    const hexadecimalToDecimal = (hexadecimal) => parseInt(hexadecimal, 16);

    // Octal to Hexadecimal
    const octalToHexadecimal = (octal) => {
    const decimal = octalToDecimal(octal);
    return decimal.toString(16).toUpperCase();
    };

    // Hexadecimal to Octal
    const hexadecimalToOctal = (hexadecimal) => {
    const decimal = hexadecimalToDecimal(hexadecimal);
    return decimal.toString(8);
    };

    function onesComplement(binary) {
        return binary
          .split('')
          .map((bit) => (bit === '0' ? '1' : '0'))
          .join('');
      }
    
      function twosComplement(binary) {
        let invertedBinary = onesComplement(binary);
      
        // Add 1 to the inverted binary number
        let carry = 1;
        let twosComplement = '';
        for (let i = invertedBinary.length - 1; i >= 0; i--) {
          const bit = invertedBinary[i];
          if (bit === '0' && carry === 1) {
            twosComplement = '1' + twosComplement;
            carry = 0;
          } else if (bit === '1' && carry === 1) {
            twosComplement = '0' + twosComplement;
          } else {
            twosComplement = bit + twosComplement;
          }
        }
      
        return twosComplement;
      }
      

    const [binaryValue, setBinaryValue] = useState('');
    const [decimalResult, setDecimalResult] = useState('');
    const [octalValue , setOctalValue] = useState('');
    const [hexValue , setHexValue] = useState('');
    const [inputValue, setInputValue] = useState("");
    const [ones, setOnes] = useState("");
    const [twos, setTwos] = useState(""); 
    const [selectedOption, setSelectedOption] = useState("");

  
    const handleConversion = () => {

        let convertedValue ; 
        if (selectedOption === "Binary") { 

            if (/^[01]+$/.test(inputValue)) {
            const b = inputValue;
            const x = binaryToDecimal(inputValue);
            const x1 = binaryToOctal(inputValue);
            const x2 = binaryToHexadecimal(inputValue);
            setBinaryValue(b);
            setOctalValue(x1);
            setHexValue(x2);
            setDecimalResult(x);
            setOnes(onesComplement(b))
            setTwos(twosComplement(b)) ;
            } else {
            const e = 'NaN';
            setBinaryValue(e);
            setOctalValue(e);
            setHexValue(e);
            setDecimalResult(e);
            setOnes(e) ; 
            setTwos(e) ; 
            }

        } 
        else if (selectedOption === "Decimal") {
            const x = decimalToBinary(inputValue);
            const x1 = decimalToOctal(inputValue) ;
            const x2 = decimalToHexadecimal(inputValue) ;
            const d = inputValue ; 
            setBinaryValue(x)
            setOctalValue(x1) ;
            setHexValue(x2) ; 
            setDecimalResult(d);
            setOnes(onesComplement(x));
            setTwos(twosComplement(x))}
        
        else if (selectedOption === "Octal") {
                const x = octalToBinary(inputValue);
                const x1 = octalToDecimal(inputValue) ;
                const x2 = octalToHexadecimal(inputValue) ;
                const o = inputValue ; 
                setBinaryValue(x)
                setOctalValue(o) ;
                setHexValue(x2) ; 
                setDecimalResult(x1)
                setOnes(onesComplement(x));
                setTwos(twosComplement(x));}

        else if (selectedOption === "Hexadecimal") {
                    const x = hexadecimalToBinary(inputValue);
                    const x1 = hexadecimalToOctal(inputValue) ;
                    const x2 = hexadecimalToDecimal(inputValue) ;
                    const h = inputValue ; 
                    setBinaryValue(x)
                    setOctalValue(x1) ;
                    setHexValue(h) ; 
                    setDecimalResult(x2)
                    setOnes(onesComplement(x));
                    setTwos(twosComplement(x));}
        else {
            convertedValue = ""
        }

    };
  
    return (
      <div className="computer">
        <h2>Computer Number Conversion</h2>
        <div className="accent-line"></div>
        <select className="select-style"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)} >
        <option value="Binary">Binary</option>
        <option value="Decimal">Decimal</option>
        <option value="Octal">Octal</option>
        <option value="Hexadecimal">Hexadecimal</option>
        </select>
        <div><input className="input-d"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="buttonC"
         onClick={handleConversion}>Convert</button></div>
        <table className="table-style">
        <thead>
            <tr>
            <th>Number System</th>
            <th>Conversions</th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <td>Binary:</td>
            <td>{binaryValue}</td>
          </tr>
          <tr>
            <td>Decimal:</td>
            <td>{decimalResult}</td>
          </tr>
          <tr>
            <td>Octal:</td>
            <td>{octalValue}</td>
          </tr>
          <tr>
            <td>Hexadecimal:</td>
            <td>{hexValue}</td>
          </tr>
          <tr>
            <td>1s Complement:</td>
            <td>{ones}</td>
          </tr><tr>
            <td>2s Complement:</td>
            <td>{twos}</td>
          </tr>
        </tbody>
      </table>
      </div>
    );
  }
  
  export default Computer;