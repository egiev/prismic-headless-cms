import logo from "./logo.svg";
import "./App.css";

import Prismic from "@prismicio/client";
import { RichText } from "prismic-reactjs";
import { Client, linkResolver, ref } from "./prismic.configuration";
import { useEffect, useState } from "react";

function App() {
  const [homepageData, setHomepageData] = useState();
  const [featuredData, setFeaturedData] = useState();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const prismicDoc = async () => {
      const homeDoc = await Client().getSingle("homepage", { ref });
      const featuredDoc = await Client().query(
        Prismic.Predicates.at("document.type", "featured"),
        { ref }
      );

      console.log(featuredDoc.results);

      setHomepageData(homeDoc);
      setFeaturedData(featuredDoc.results);
    };

    prismicDoc();
  }, []);

  const tes = () => {
    console.log("test");
    setShowMenu((prevState) => {
      return !prevState;
    });
  };

  if (!homepageData || !featuredData) return <h1>Loading..</h1>;

  return (
    <>
      <nav>
        <div className="container wrapper">
          <a href="/" id="logo">
            <img src="/images/logo.png" alt="Logo" />
          </a>

          <ul className={showMenu ? "slide" : ""}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Product</a>
            </li>
            <li>
              <a href="/">Promo</a>
            </li>
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
          </ul>

          <div className="menu-bar">
            <i className="fas fa-bars" onClick={tes}></i>
          </div>
        </div>
      </nav>

      <section id="banner">
        <div className="container">
          <h1>{RichText.asText(homepageData.data.title)}</h1>
          {RichText.render(homepageData.data.description)}
          <button className="primary">Register Now</button>
        </div>
      </section>

      <section id="dance-tour">
        <div className="container md">
          <h1 className="heading text-center">
            {RichText.asText(
              homepageData.data.body[0].primary.dance_tour_title
            )}
          </h1>
          <p className="sub-heading text-center">
            {RichText.asText(homepageData.data.body[0].primary.dance_sub_title)}
          </p>

          <div className="dance-list">
            {homepageData.data.body[0].items.map((item, i) => (
              <div className="dance-item" key={`dance-item-${i}`}>
                <div className="thumbnail">
                  <img src={item.dance_thumbnail.url} alt="" />
                </div>
                <div className="info">
                  <p className="title">{RichText.asText(item.dance_title)}</p>
                  <p className="description">
                    {RichText.asText(item.dance_sub_title)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="container md">
          <h1 className="heading text-center">
            {RichText.asText(homepageData.data.body[1].primary.pricing_heading)}
          </h1>
          <p className="sub-heading text-center">
            {RichText.asText(
              homepageData.data.body[1].primary.pricing_sub_heading
            )}
          </p>

          <div className="pricing-list">
            {homepageData.data.body[1].items.map((item, i) => (
              <div className="pricing-item" key={`pricing-${i}`}>
                <img
                  src={item.pricing_image.url}
                  alt=""
                  className="pricing-icon"
                />
                <p className="title">{RichText.asText(item.pricing_name)}</p>
                <p className="description">
                  {RichText.asText(item.pricing_description)}
                </p>
                <button className="secondary block">
                  ${RichText.asText(item.pricing_price)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="featured">
        <div className="featured-list">
          {featuredData.map((item, i) => (
            <div className="featured-item" key={`featured-item-${i}`}>
              <div className="left">
                <img src={item.data.image.url} alt="" />
              </div>
              <div className="right">
                <div className="featured-info">
                  <h1 className="heading">
                    {RichText.asText(item.data.title)}
                  </h1>
                  <p className="sub-heading">
                    {RichText.asText(item.data.short_description)}
                  </p>
                  <button className="secondary">READ MORE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
