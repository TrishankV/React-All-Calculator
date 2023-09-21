import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import { HiSwitchHorizontal } from "react-icons/hi";
import 'react-dropdown/style.css';

function UnitConverter() {
  const [category, setCategory] = useState("Length");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const categories = ["Length", "Mass", "Temperature"];

  const units = {
    Length: ["Meter", "Foot", "Inch" , "Centimeter" , "Kilometer" , "Foot" ,
    "Inch" , "Yard" , "Mile"
  ],
    Mass: ["Kilogram", "Gram","Milligram","Ton" ,"Pound" , "Ounce"],
    Temperature: ["Celsius", "Fahrenheit", "Kelvin"],
  };

  const conversionFactors = {
    Length: {
      Meter: {
        Meter: (m) => m,
        Centimeter: (m) => m * 100,
        Millimeter: (m) => m * 1000,
        Kilometer: (m) => m / 1000,
        Foot: (m) => m * 3.28084,
        Inch: (m) => m * 39.3701,
        Yard: (m) => m * 1.09361,
        Mile: (m) => m * 0.000621371
      },
      Centimeter: {
        Meter: (cm) => cm / 100,
        Centimeter: (cm) => cm,
        Millimeter: (cm) => cm * 10,
        Kilometer: (cm) => cm / 100000,
        Foot: (cm) => cm * 0.0328084,
        Inch: (cm) => cm * 0.393701,
        Yard: (cm) => cm * 0.0109361,
        Mile: (cm) => cm * 0.00000621371
      },
      Millimeter:{
          Meter:(mm)=>mm/1000 ,
          Centimeter:(mm)=>mm/10 ,
          Millimeter:(mm)=>mm ,
          Kilometer:(mm)=>mm/1000000 ,
          Foot:(mm)=>mm*0.00328084 ,
          Inch:(mm)=>mm*0.0393701 ,
          Yard:(mm)=>mm*0.00109361 ,
          Mile:(mm)=>mm*6.2137e-7
      },
      Kilometer:{
          Meter:(km)=>km*1000 ,
          Centimeter:(km)=>km*100000 ,
          Millimeter:(km)=>km*1000000 ,
          Kilometer:(km)=>km ,
          Foot:(km)=>km*3280.84 ,
          Inch:(km)=>km*39370.1 ,
          Yard:(km)=>km*1093.61 ,
          Mile:(km)=>km*0.621371
      },
      Foot:{
          Meter:(ft)=>ft/3.28084 ,
          Centimeter:(ft)=>ft/0.0328084 ,
          Millimeter:(ft)=>ft/0.00328084 ,
          Kilometer:(ft)=>ft/3280.84 ,
          Foot:(ft)=>ft ,
          Inch:(ft)=>ft*12 ,
          Yard:(ft)=>ft/3 ,
          Mile:(ft)=>ft/5280
      },
      Inch:{
           Meter:(inches)=>inches/39.3701 ,
           Centimeter:(inches)=>inches/0.393701 ,
           Millimeter:(inches)=>inches/0.0393701 ,
           Kilometer:(inches)=>inches/39370.1 ,
           Foot:(inches)=>inches/12 ,
           Inch:(inches)=>inches ,
           Yard:(inches)=>inches/36 ,
           Mile:(inches)=>inches/63360
      },
      Yard:{
           Meter:(yards)=>yards/1.09361 ,
           Centimeter:(yards)=>yards/0.0109361 ,
           Millimeter:(yards)=>yards/0.00109361 ,
           Kilometer:(yards)=>yards/1093.61 ,
           Foot:(yards)=>yards*3 ,
           Inch:(yards)=>yards*36 ,
           Yard:(yards)=>yards,
           Mile :(yards) => yards /1760
      },
      Mile:{
            Meter :(miles) => miles / 0.000621371,
            Centimeter :(miles) => miles / 6.2137e-7,
            Millimeter :(miles) => miles /6.2137e-10,
            Kilometer :(miles) => miles / 0.621371,
            Foot :(miles) => miles *5280,
            Inch :(miles) => miles *63360,
            Yard :(miles) => miles *1760,
            Mile :(miles) => miles
      }
    },
    Mass: {
      Kilogram: {
        Kilogram: (kg) => kg,
        Gram: (kg) => kg * 1000,
        Milligram: (kg) => kg * 1000000,
        Ton: (kg) => kg / 1000,
        Pound: (kg) => kg * 2.20462,
        Ounce: (kg) => kg * 35.274
      },
      Gram: {
        Kilogram: (g) => g / 1000,
        Gram: (g) => g,
        Milligram: (g) => g * 1000,
        Ton: (g) => g / 100000,
        Pound: (g) => g * 0.00220462,
        Ounce: (g) => g * 0.035274
      },
      Milligram:{
          Kilogram:(mg)=>mg/1000000 ,
          Gram:(mg)=>mg/1000 ,
          Milligram:(mg)=>mg ,
          Ton:(mg)=>mg/1000000000 ,
          Pound:(mg)=>mg*2.20462e-6 ,
          Ounce:(mg)=>mg*3.5274e-5
      },
      Ton:{
          Kilogram:(ton)=>ton*1000 ,
          Gram:(ton)=>ton*1e+6 ,
          Milligram:(ton)=>ton*1e+9 ,
          Ton:(ton)=>ton ,
          Pound:(ton)=>ton*2204.62 ,
          Ounce:(ton)=>ton*35274
      },
      Pound:{
          Kilogram:(lb)=>lb/2.20462 ,
          Gram:(lb)=>lb/0.00220462 ,
          Milligram:(lb)=>lb/2.20462e-6 ,
          Ton:(lb)=>lb/2204.62 ,
          Pound:(lb)=>lb ,
          Ounce:(lb)=>lb*16
      },
      Ounce:{
           Kilogram:(oz)=>oz/35.274 ,
           Gram:(oz)=>oz/0.035274 ,
           Milligram:(oz)=>oz/3.5274e-5 ,
           Ton:(oz)=>oz/35274 ,
           Pound:(oz)=>oz/16 ,
           Ounce:(oz)=>oz
      }
    }
    ,
    Temperature: {
      Celsius: {
        Celsius: 1,
        Fahrenheit: (c) => (c * 9/5) + 32,
        Kelvin: (c) => c + 273.15,
      },
      Fahrenheit: {
        Celsius: (f) => (f - 32) * 5/9,
        Fahrenheit: 1,
        Kelvin: (f) => ((f - 32) * 5/9) + 273.15,
      },
      Kelvin: {
        Celsius: (k) => k - 273.15,
        Fahrenheit: (k) => ((k - 273.15) * 9/5) + 32,
        Kelvin: 1,
      },
    },
  };
  

  useEffect(() => {
    setFromUnit(units[category][0]);
    setToUnit(units[category][1]);
  }, [category]);

  useEffect(() => {
    convert();
  }, [fromUnit, toUnit, inputValue]);

  function convert() {
    if (!isValidInput()) {
      setOutputValue("Invalid input");
      return;
    }
  
    const conversionFactor = getConversionFactor();
    if (conversionFactor === null) {
      setOutputValue("Invalid conversion");
      return;
    }
  
    const result = calculateResult(conversionFactor);
    setOutputValue(result.toFixed(2)); // Round to 2 decimal places
  }
  
  function isValidInput() {
    return !isNaN(inputValue);
  }
  
  function getConversionFactor() {
    if (category && fromUnit && toUnit) {
      return conversionFactors[category]?.[fromUnit]?.[toUnit];
    }
    return null;
  }
  
  function calculateResult(conversionFactor) {
    if (typeof conversionFactor === "function") {
      return conversionFactor(parseFloat(inputValue));
    }
    return inputValue * conversionFactor;
  }
  

  return (
    <div className="unit-converter">
      <div>
        <h1>Unit Converter</h1>
        <div className="accent-line"></div>
      </div>
      <div className="left">
        <h3>Amount</h3>
        <input
          type="text"
          className="input-d"
          placeholder="Enter the amount"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="container">
        <div className="middle">
          <h3>From</h3>
          <Dropdown
            options={units[category].map((unit) => ({
              value: unit,
              label: unit,
            }))}
            onChange={(e) => setFromUnit(e.value)}
            value={fromUnit}
            placeholder="From"
          />
        </div>
        <div className="switch">
          <HiSwitchHorizontal size="30px" onClick={() => {
            const temp = fromUnit;
            setFromUnit(toUnit);
            setToUnit(temp);
          }} />
        </div>
        <div className="middle">
          <h3>To</h3>
          <Dropdown
            options={units[category].map((unit) => ({
              value: unit,
              label: unit,
            }))}
            onChange={(e) => setToUnit(e.value)}
            value={toUnit}
            placeholder="To"
          />
        </div>
      </div>
      <div className="result-converter">
        <h2>Converted Amount:</h2>
        <p>
          {inputValue + ' ' + fromUnit} ={' '}
          {outputValue + ' ' + toUnit}
        </p>
      </div>
      <div className="category-container">
        <h3>Select Category:</h3>
        <Dropdown
          options={categories.map((category) => ({
            value: category,
            label: category,
          }))}
          onChange={(e) => setCategory(e.value)}
          value={category}
        />
      </div>
    </div>
  );
}

export default UnitConverter;
