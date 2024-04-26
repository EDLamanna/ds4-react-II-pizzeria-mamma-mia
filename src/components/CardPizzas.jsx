import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { PizzaContext } from "../context/PizzaContext";

const CardPizzas = () => {
  const { pizza, setPizza } = useContext(PizzaContext);
  const navigate = useNavigate();

  const handleNavigate = (pizzaName) => {
    navigate(`/pizza/${pizzaName}`);
  };

  const addAndRemoveBuyCar = (id, quantity) => {
    const newPizza = pizza.map((pizzaItem) => {
      if (pizzaItem.id === id) {
        return {
          ...pizzaItem,
          buy: quantity >= 1,
          quantity: quantity,
        };
      }
      return pizzaItem;
    });
    setPizza(newPizza);
  };

  const handleQuantityChange = (id, value) => {
    if (value >= 0) {
      addAndRemoveBuyCar(id, value);
      setPizza((prevPizza) =>
        prevPizza.map((pizzaItem) =>
          pizzaItem.id === id
            ? { ...pizzaItem, quantity: parseInt(value) }
            : pizzaItem
        )
      );
    }
  };

  return (
    <>
      {pizza.map((pizzaItem) => (
        <Card
          key={pizzaItem.id}
          className="no-border"
          style={{ width: "18rem" }}
        >
          <Card.Img variant="top" src={pizzaItem.img} />
          <Card.Body>
            <Card.Title>{pizzaItem.name}</Card.Title>
            <hr />
          </Card.Body>
          <ListGroup className="listGroup" variant="flush">
            <h5 className="list-group-item">Ingredientes:</h5>
            {pizzaItem.ingredients.map((ingredient, id) => (
              <ListGroup.Item key={id}>
                <img
                  className="imgPizza"
                  src="src/assets/imgs/iconDescriptionPizza.png"
                  alt="icono de pizza"
                />
                {ingredient}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Card.Body className="btnPrincipalContainer">
            <p className="precio">$ {pizzaItem.price}</p>
            <div className="btnContainer">
              <Link
                className="moreDetailsBtn"
                to={`/pizza/${pizzaItem.name}`}
                onClick={() => handleNavigate(pizzaItem.name)}
              >
                Ver Más
                <img
                  className="imgEyes"
                  src="src/assets/imgs/iconEyes.png"
                  alt="icono ojos para ver detalles de la pizza"
                />
              </Link>
              <span className="addToCarBtn">
                Añadir
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  min="0"
                  value={pizzaItem.quantity || 0}
                  onChange={(e) =>
                    handleQuantityChange(pizzaItem.id, e.target.value)
                  }
                />
                <FontAwesomeIcon
                  icon={faCartShopping}
                  flip="horizontal"
                  size="lg"
                  style={{ color: pizzaItem.quantity >= 1 ? "red" : "white" }}
                />
              </span>
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default CardPizzas;
