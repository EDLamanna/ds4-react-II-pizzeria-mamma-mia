import React, { useContext } from "react";
import { PizzaContext } from "../context/PizzaContext";

const Carrito = () => {
  const { pizza, totalPrice, changePizzaQuantity, fetchPizza } =
    useContext(PizzaContext);

  const handleQuantityChange = (id, change) => {
    const newQuantity = pizza.map((pizzaItem) =>
      pizzaItem.id === id
        ? { ...pizzaItem, quantity: pizzaItem.quantity + change }
        : pizzaItem
    );
    changePizzaQuantity(
      id,
      newQuantity.find((item) => item.id === id).quantity
    );
  };

  const pizzasToDisplay = pizza.filter(
    (pizzaItem) => pizzaItem.buy && pizzaItem.quantity > 0
  );

  const handlePay = () => {
    alert("¡Gracias por su compra!");
    fetchPizza();
  };

  return (
    <div className="bgCarBuy">
      <div className="carBuyContainer">
        <h1 className="titleCarBuy">Detalles del pedido</h1>
        {pizzasToDisplay.map((pizzaItem) => (
          <div className="pizzaSelectedContainer" key={pizzaItem.id}>
            <img
              className="imgPizzaSelected"
              src={pizzaItem.img}
              alt={pizzaItem.name}
            />
            <h3 className="namePizza">{pizzaItem.name}</h3>
            <div className="salesContainer">
              <p className="netPizza">
                $
                {(pizzaItem.price * pizzaItem.quantity * 1000).toLocaleString()}
              </p>
              <button
                className="btnMinus"
                onClick={() => handleQuantityChange(pizzaItem.id, -1)}
                disabled={pizzaItem.quantity === 0}
              >
                -
              </button>
              <p>{pizzaItem.quantity}</p>
              <button
                className="btnPlus"
                onClick={() => handleQuantityChange(pizzaItem.id, 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
        <h2>Total: ${totalPrice.toLocaleString()}</h2>
        <button
          className="payBtn"
          onClick={handlePay}
          disabled={pizzasToDisplay.length === 0}
        >
          ir a Pagar
        </button>
      </div>
    </div>
  );
};

export default Carrito;
