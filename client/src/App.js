import './App.css';
//import Layout from './components/layout/Layout.js';
import {Routes,Route} from 'react-router-dom';
//import Header from './components/layout/Header';
import About from './pages/About';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import Policy from './pages/Policy';
import Register from './pages/auth/Register';

function App() {
  return (
     <>
     <Routes>
      <Route path='/' element={<HomePage/>}/> 
      <Route path='/register' element={<Register/>}/>
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='*' element={<PageNotFound/>}/>
     </Routes>
      
     </>
  );
}

export default App;
