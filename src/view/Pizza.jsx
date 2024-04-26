import { useParams } from "react-router-dom";
import React, { useContext } from "react";
import { PizzaContext } from "../context/PizzaContext";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import iconIndex from "../assets/imgs/iconIndex.png";
import iconDescriptionPizza from "../assets/imgs/iconDescriptionPizza.png";

const Pizza = () => {
  const { name } = useParams();
  const { pizza, setPizza } = useContext(PizzaContext);
  const selectedPizza = pizza.find((pizza) => pizza.name === name);

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
    }
  };

  return (
    <div className="pizzaContainer">
      <div>
        {selectedPizza && (
          <img
            className="ImgPizza"
            src={selectedPizza.img}
            alt={selectedPizza.name}
          />
        )}
      </div>
      <div>
        {selectedPizza && (
          <Card className="p-1">
            <Card.Title>{selectedPizza.name}</Card.Title>
            <Card.Text>{selectedPizza.desc}</Card.Text>
            <ListGroup variant="flush">
              <h5>Ingredientes:</h5>
              {selectedPizza.ingredients.map((ingredient, id) => (
                <ListGroup.Item className="list-group-item" key={id}>
                  <img
                    className="imgPizza"
                    src={iconDescriptionPizza}
                    alt="icono de pizza"
                  />
                  {ingredient}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Body>
              <div className="priceAndBtnContainer">
                <p className="precio">$ {selectedPizza.price}</p>
                <div className="btnContainer">
                  <Link className="moreDetailsBtn" to="/">
                    Inicio
                    <img
                      className="imgBackToIndex"
                      src={iconIndex}
                      alt="icono volver a inicio"
                    />
                  </Link>
                  <span className="addToCarBtn">
                    Añadir
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      min="0"
                      value={selectedPizza.quantity || 0}
                      onChange={(e) =>
                        handleQuantityChange(
                          selectedPizza.id,
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      flip="horizontal"
                      size="lg"
                      style={{
                        color: selectedPizza.quantity >= 1 ? "red" : "white",
                      }}
                    />
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Pizza;
