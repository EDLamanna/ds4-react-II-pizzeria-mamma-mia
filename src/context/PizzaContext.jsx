import { createContext, useEffect, useState } from "react";

export const PizzaContext = createContext();

const PizzaProvider = ({ children }) => {
  const [pizza, setPizza] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchPizza = async () => {
    try {
      const response = await fetch("/pizzas.json");
      if (!response.ok) {
        throw new Error("Fallo en consultar datos de la pizza");
      }
      const data = await response.json();
      const PizzaDetails = data.map((pizza) => ({
        ...pizza,
        name: pizza.name.replace(/\b\w/, (char) => char.toUpperCase()),
        ingredients: pizza.ingredients.map((ingredient) =>
          ingredient.replace(/\b\w/, (char) => char.toUpperCase())
        ),
        price: pizza.price.toLocaleString(),
        buy: false,
        quantity: 0,
      }));

      setPizza(PizzaDetails);
    } catch (error) {
      console.log("error consultando datos de la pizza", error);
      setPizza([]);
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    pizza.forEach((pizzaItem) => {
      total += pizzaItem.price * pizzaItem.quantity * 1000;
    });
    setTotalPrice(total.toLocaleString());
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [pizza]);

  const changePizzaQuantity = (id, quantity) => {
    const newPizza = pizza.map((pizzaItem) => {
      if (pizzaItem.id === id) {
        return {
          ...pizzaItem,
          quantity: parseInt(quantity),
        };
      }
      return pizzaItem;
    });
    setPizza(newPizza);
  };

  useEffect(() => {
    fetchPizza();
  }, []);

  return (
    <PizzaContext.Provider
      value={{
        pizza,
        selectedPizza,
        fetchPizza,
        setPizza,
        changePizzaQuantity,
        totalPrice,
      }}
    >
      {children}
    </PizzaContext.Provider>
  );
};

export default PizzaProvider;
