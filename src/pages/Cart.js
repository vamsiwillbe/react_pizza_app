import {useContext, useEffect,useState} from 'react';
import { CartContext } from '../CartContext';
import pizzaData from '../components/PizzaData.json';
import {getPizzaById} from '../helper';


const Cart = () => {
  let total=0;
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const [PriceFetched, togglePriceFetched] = useState(false);

  const fetchPizzaData = () => {
    if (!cart.items) {
      return;
    }

    if (PriceFetched) {
      return;
    }

    const productIds = Object.keys(cart.items);
    const fetchedProducts = productIds.map(productId => {
      return getPizzaById(productId, pizzaData);
    });
    setProducts(fetchedProducts);
    togglePriceFetched(true);
  };

  useEffect(() => {
    fetchPizzaData();
  }, [cart]);
  const getQty = (productId) =>{
    return cart.items[productId];
  }
  const increment = (productId) =>{
    const existingQty=cart.items[productId];
    const _cart={...cart};
    _cart.items[productId] = existingQty+1;
    _cart.totalItems+=1;
    setCart(_cart);
  }
  const decrement =(productId) =>{

    const existingQty=cart.items[productId];
    if(existingQty===1){
      return;
    }
    const _cart={...cart};
    _cart.items[productId] = existingQty-1;
    _cart.totalItems-=1;
    setCart(_cart);
  }
  const getSum = (productId,Price)=>{
    const sum =Price*getQty(productId);
    total+=sum;
    return sum;
   
  }
  const handleDelete =(productId)=>{
    const _cart ={...cart};
    const qty=_cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems -=qty;
    setCart(_cart);
    setProducts(products.filter((product)=> product._id !== productId));
  }
  const handleOrderNow=()=>{
    window.alert('order placed successfully!');
    setProducts([]);
    setCart({});
  }
  return (
    products.length?
    <div  className="container mx-auto lg:w-1/2 w-full pb-24"> 
        <h1 className="my-12 font-bold">Cart items</h1>
        <ul>
          {
            products.map(prod => {
              return(
                <li className="mb-12" key={prod._id}> 
                <div className="flex items-center justify-between">
                     <div className="flex items-center" >
                        <img  className="h-16" src={prod.image} alt="pizza" />
                        <span className="font-bold ml-4 w-48">{prod.name}</span>
                     </div>
                     <div>
                      <button onClick={()=> {decrement(prod._id)}} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">-</button>
                      <b className="px-4">{ getQty(prod._id)}</b>
                      <button onClick={()=> {increment(prod._id)}} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">+</button>
                     </div>
                     <span>₹{ getSum(prod._id,prod.Price)}</span>
                     <button onClick={()=>{ handleDelete(prod._id)}} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">Delete</button>
                </div>
              </li>
              )
                   

            })
          }
         
        
        </ul>
        <hr className="my-6"/>
        <div className="text-right ">
         <b> Grand Total:</b> ₹ {total} 
        </div>
        <div className="text-right mt-6">
          <button onClick={handleOrderNow} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">Order Now</button>
        </div>
    </div>
    : 
    <img className="mx-auto w-1/2 mt-12"src="https://588773510-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/assets%2F-Lz7UFvjOB-fzWNJ7GjT%2F-M6qLK-SWrk1gacEZduR%2F-M6qQ58_Pzi3bE2enWer%2Fimage.png?alt=media&token=d5d18a42-bb5b-426e-83cf-a703508b3eb8"/>
  )
}

export default Cart;