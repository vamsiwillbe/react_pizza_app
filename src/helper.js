
import pizzaData from './components/PizzaData.json';



export const getAllPizzas = ()=>{
    return pizzaData.pizzaData;
}

export const getPizzaById = (id)=>{
    console.log(id,"inside helper");
    return pizzaData.pizzaData.find((pizza)=>pizza._id+''===id);
}