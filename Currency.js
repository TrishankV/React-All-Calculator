// const Freecurrencyapi = new Freecurrencyapi('fca_live_K3ZKnMrpT4laGcyDl78qisEKSCXqd3byYExXY5Bu');
  // const access_key = "c09dfbf47d6841c27124b27e3bf3049e"; // Replace with your own access key
// Import React and useState hook
// App.js
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';

function Currency() {
  // User-friendly currency names
  const currencyOptions = [
    { value: 'usd', label: 'US Dollar' },
    { value: 'eur', label: 'Euro' },
    { value: 'inr', label: 'Indian Rupee' },
    { value: 'cad', label: 'Canadian Dollar' },
    { value: 'aud', label: 'Australian Dollar' },
    { value: 'jpy', label: 'Japanese Yen' },
    { value: 'chf', label: 'Sweiss Franc' },
    { value: 'cny', label: 'Chinese Yuan' },
    { value: 'krw', label: 'South Korean Won' },
    { value: 'brl', label: 'Brazilian Real' },
    { value: 'zar', label: 'South African Rand' },
    { value: 'rub', label: 'Russian Rubble' },
    { value: 'mxn', label: 'Mexican Peso' },
    { value: 'hkd', label: 'Hong Kong Dollar' },
    { value: 'nzd', label: 'New Zealand Dollar' },
    { value: 'sek', label: 'Swedish Krona' },
    { value: 'nok', label: 'Norweigan Krona' },
    { value: 'sar', label: 'Saudi Riyal' },

    // Add more currencies here
  ];

  // Initializing all the state variables
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('eur'); // Default currency
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

  // Calling the API whenever the dependency changes
  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    )
      .then((res) => {
        setInfo(res.data[from]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [from]);

  // Calling the convert function whenever a user switches the currency
  useEffect(() => {
    setOptions(currencyOptions);
    convert();
  }, [currencyOptions]);

  // Function to convert the currency
  function convert() {
    var rate = info[to];
    setOutput(input * rate);
  }

  // Function to switch between two currency
  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
    <div className="currency">
      <div>
        <h1>Currency converter</h1>
        <div className="accent-line"></div>
      </div>
      <div className="left">
        <h3>Amount</h3>
        <input
          type="text"
          className="input-d"
          placeholder="Enter the amount"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="container">
        <div className="middle">
          <h3>From</h3>
          <Dropdown
            options={currencyOptions.map((currency) => ({
              value: currency.value,
              label: currency.label,
            }))}
            onChange={(e) => {
              setFrom(e.value);
            }}
            value={from}
            placeholder="From"
          />
        </div>
        <div className="switch">
          <HiSwitchHorizontal size="30px" onClick={() => flip()} />
        </div>
        <div className="middle">
          <h3>To</h3>
          <Dropdown 
            options={currencyOptions.map((currency) => ({
              value: currency.value,
              label: currency.label,
            }))}
            onChange={(e) => {
              setTo(e.value);
            }}
            value={to}
            placeholder="To"
          />
        </div>
      </div>
      <div className="result">
        <h2>Converted Amount:</h2>
        <p>
          {input + ' ' + currencyOptions.find((c) => c.value === from)?.label} ={' '}
          {output.toFixed(2) + ' ' + currencyOptions.find((c) => c.value === to)?.label}
        </p>
      </div>
    </div>
  );
}

export default Currency;
