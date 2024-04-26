import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { PizzaContext } from "../context/PizzaContext";
import brand from "../assets/imgs/brand.png";

const NavBar = () => {
  const { totalPrice } = useContext(PizzaContext);
  return (
    <div>
      <Navbar expand="lg" className="NavBar">
        <Container className="navContainer">
          <div>
            <img
              className="brandMenu"
              src={brand}
              alt="Logo Pizzería Mamma Mia"
            />
            <Navbar.Brand className="fs-3 mx-1">
              <Link to="/" className="link-no-decoration">
                <span className="colorGreen">Pizzería</span>
                <span className="colorWhite"> Mamma</span>
                <span className="colorRed"> Mia</span>
              </Link>
            </Navbar.Brand>
          </div>
          <Link to="/carrito" className="link-no-decoration-icon">
            <FontAwesomeIcon className="iconAwsome" icon={faCartShopping} />
            <p>$ {totalPrice}</p>
          </Link>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
