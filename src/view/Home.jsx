import CardPizzas from "../components/CardPizzas";
import brand from "../assets/imgs/brand.png";

const Home = () => {
  return (
    <>
      <div className="bannerContainer">
        <div className="description">
          <h3>¡Tenemos las mejores pizzas que podrás encontrar!</h3>
        </div>
        <div className="BrandContainerImg">
          <img className="imgBrand" src={brand} alt="Marca Mamma Mia" />
        </div>
      </div>
      <div className="container">
        <div className="gallery grid-columns-2 p-3">
          <CardPizzas />
        </div>
      </div>
    </>
  );
};

export default Home;
