import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HomePage.css";
import service from "../services/config.services";
import image1 from "../img/image1.jpg";
import image2 from "../img/image2.jpg";
import image3 from "../img/image3.jpg";
import image4 from "../img/image4.jpg";

function HomePage() {
  const [dataOnlyForLoggedUsers, setData] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getData();
    getProducts();
  }, []);

  const getData = async () => {
    try {
      // call a private route here...
      // call a private route here...
      const response = await service.get(`/example-private-route`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getProducts = async () => {
    try {
      const response = await service.get(`/products`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="allpage">
      <div className="blocks">
        <section className="bestProduct">
          <div className="text">
            <div className="textentry">
              <div className="titleentry">
                ✦ Nouvelle plateforme <span> 2026</span>
              </div>

              <h2>
                Achète, vends &
                <br />
                collectionne tes
                <br />
                <span> poupées préférées </span>
              </h2>

              <p>
                La communauté pour tous les fans <br />
                de barbie, Bratz et bien plus.
                <br /> Trouve ta poupée de rêve ou vends ta collection !{" "}
              </p>
            </div>
            <div className="homepagebuttonss">
              <button>
                <h1>Become Seller</h1>
              </button>
              <button>
                <h1>See Dolls</h1>
              </button>
            </div>
          </div>
          <div className="blockProduct">
            <div className="productCardi">
              <img src={image1} alt="product 1" />
            </div>

            <div className="productCardi">
              <img src={image2} alt="product 2" />
            </div>

            <div className="productCardi">
              <img src={image3} alt="product 2" />
            </div>
            <div className="productCardi">
              <img src={image4} alt="product 2" />
            </div>
          </div>
        </section>

  <section class="defilementbar">
  <div class="popup">
    <span class="popup-item"><span class="popup-star">✦</span> Découvrez notre nouvelle plateforme de vente de poupées !</span>
    <span class="popup-item"><span class="popup-star">✦</span> Barbie Dolls</span>
    <span class="popup-item"><span class="popup-star">✦</span> Bratz Dolls</span>
    <span class="popup-item"><span class="popup-star">✦</span> Join community</span>
    <span class="popup-item"><span class="popup-star">✦</span> Become a seller</span>
    <span class="popup-item"><span class="popup-star">✦</span> Buy dolls</span>
       <span class="popup-item"><span class="popup-star">✦</span> Découvrez notre nouvelle plateforme de vente de poupées !</span>
    <span class="popup-item"><span class="popup-star">✦</span> Barbie Dolls</span>
    <span class="popup-item"><span class="popup-star">✦</span> Barbie Dolls</span>
    <span class="popup-item"><span class="popup-star">✦</span> Bratz Dolls</span>
        <span class="popup-item"><span class="popup-star">✦</span> Bratz Dolls</span>
    <span class="popup-item"><span class="popup-star">✦</span> Join community</span>
   
   
  </div>
</section>

        <section className="explication">
          <div className="explicationContent">
            <div className="explicationtexte">
              <div className="Titleexplication">
                <h2>
                  Trendy <span>Dolls</span>
                </h2>
              </div>
              <div className="pexpplication">
                <p>the most trendy and stylish dolls on the market!</p>
              </div>
            </div>
            <div className="productexplication">
              <div className="product">
                {products
                  .sort(() => 0.5 - Math.random()) // shuffle
                  .slice(0, 4) // take first 4
                  .map((product) => (
                    <div className="productTrendy" key={product._id}>
                      <img src={product.imageUrl} alt={product.name} />
                      <div className="textexplin">
                        <h3>{product.name}</h3>
                        <p className="categories">{product.category}</p>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                <p>Explore Dolls ➡︎</p>
              </div>
            </div>
          </div>
        </section>

        <section className="review">
          <div className="reviewCard">
            <div className="reviewtexte">
              <h2>
                how it <span>works</span>
              </h2>
              <p>simple and easy to use</p>
            </div>
            <div className="explicationBlocks">
              <div className="steps">
                <h1>1</h1>
                <h3> Create an account</h3>
                <p>
                  Sign up for free and create your profile to start buying and
                </p>
              </div>
              <div className="steps">
                <h1>2</h1>
                <h3>Browse and Buy Dolls</h3>
                <p>
                  Explore our wide selection of trendy dolls and make your
                  purchase.
                </p>
              </div>
              <div className="steps">
                <h1>3</h1>
                <h3>Sell Your Dolls</h3>
                <p>
                  List your dolls for sale and connect with buyers in our
                  community.
                </p>
              </div>
            </div>
          </div>
          <div className="commentaire">
            <div className="commentairetexte">
              <h1>✦ Rejoins-nous gratuitement</h1>
              <h2>Tu peux acheter, vendre ou compléter ta collection !</h2>
              <p>Des milliers de poupées t'attendent 🎀</p>
            </div>
            <div className="commentaireButtons">
              <button>Rejoindre</button>
              <button>explore</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
