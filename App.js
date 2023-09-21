import React, { useState } from 'react';
import './Calculator.css';
import Calculator from './cal';
import Navbar from './nav';
import './nav.css' ;
import { BrowserRouter as Router, Route ,Routes, Link } from 'react-router-dom';
import Scientific from './Scientific'
import Computer from './COmputer';
import InterestCalculator from './interest';
import UnitConvertor from './COnverter' ; 
import { Pie } from 'react-chartjs-2';
import Currency from './Currency';
import Area from './area';


const Footer = () => (
	<footer className="footer">
		<p>©Trishank and Gpt lol </p>

	</footer>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Include the Navbar component */}
        <div className="center-container">
          <Routes>
            <Route path="/" element={<Calculator />} />
            <Route path="/scientific" element={<Scientific />} />
            <Route path="/computer" element={<Computer />} />
            <Route path="/interest" element={<InterestCalculator />} />
            <Route path="/converter" element={<UnitConvertor />} />
            <Route path="/currency" element={<Currency />} />
            <Route path="/area" element={<Area />} />


            
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;