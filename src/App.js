import React from 'react';
import {Routes,Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Result from './pages/Result';
import BuyCredit from './pages/BuyCredit';
import { Form } from 'react-router-dom';
import Navbar from './components/Landing/Navbar';

function App() {
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b frm-teal-50 to-orange-50'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/result' element={ <Result/>}/>
        <Route path='/BuyCredit' element={<BuyCredit/>}/>
      </Routes>
    </div>
  );
}

export default App;
