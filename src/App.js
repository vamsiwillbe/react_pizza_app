import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import About from './pages/About';
import Products from './components/Products';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Navigation from './components/Navigation';
import { useEffect, useState } from 'react';
import { CartContext } from './CartContext';

const App = () =>{

const [cart, setCart] = useState({});

//fetch cart from local storage
useEffect(() => {
  const cart = window.localStorage.getItem('cart');
  setCart(JSON.parse(cart));
  

},[])
useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart));

},[cart])



    return (
        <>
            <Router>
                <CartContext.Provider value={{ cart, setCart  }}>
                <Navigation />
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    {/* <Route path="/About" component={About}></Route> */}
                    <Route path="/products"  element={<Products />}/>
                    <Route path="/products/:_id"  element={<SingleProduct/>}/>
                    <Route path="/cart" element={<Cart/>}/>

                </Routes>
                </CartContext.Provider>
            </Router>
        </>
    )
}
export default App;








