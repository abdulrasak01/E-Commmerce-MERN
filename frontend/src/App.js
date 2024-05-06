import { useState } from 'react';
import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Cart from './pages/Cart';
function App() {
  const [cartItems,setCartItems] = useState([])
  // const navigate = useNavigate()
  return (
    <div className="App">
      <ToastContainer theme='dark' position="top-center"

/>
      <Header cartItems={cartItems}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/search' element={<Home/>}/>
          <Route path='/product/:id' element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems}/>}/>
          <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems}/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
