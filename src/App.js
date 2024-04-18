import { useEffect, useState } from "react";
import NewsImage from "./news.jpg";
import "./App.css";
import axios from "axios";
import data from "./data";
function App() {
  const [news, setNews] = useState({
    category: false,
    country: false,
    NewsChange: false,
  });
  const fetch = async () => {
    console.log("how many");
    let res = await axios.get(
      "https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json"
    );
    setNews((pre) => ({
      ...pre,
      total: res.data.totalResults,
      news: res.data.articles,
    }));
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <header>
        <div>
          <p
            onClick={() =>
              setNews((pre) => ({
                ...pre,
                country: !news.country,
                category: false,
              }))
            }
          >
            Country
          </p>
          <p
            onClick={() =>
              setNews((pre) => ({
                ...pre,
                category: !news.category,
                country: false,
              }))
            }
          >
            Category
          </p>
        </div>
        <div>
          <img
            onClick={() =>
              setNews((pre) => ({ ...pre, NewsChange: !news.NewsChange }))
            }
            src="https://cdn-icons-png.flaticon.com/128/2540/2540832.png"
            alt="News_icon"
          />
        </div>
      </header>
      <div
        className={
          news.category ? "category_container" : "category_container hide"
        }
      >
        {data.category.map((item) => (
          <p key={item.name}>{item.name}</p>
        ))}
      </div>
      <div
        className={
          news.country ? "country_container" : "country_container hide"
        }
      >
        {data.Country.map((item, index) => (
          <div className="country" key={`parent_${index}`}>
            <img src={item.url} alt={item.name} key={`${item.name} flag`} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div id={news.NewsChange ? "News_Channels" : "News_channels_Hide"}>
        <div id="BBC_News">
          <img
            src="https://download.logo.wine/logo/BBC_News/BBC_News-Logo.wine.png"
            alt="BBC_NEWS_icon"
          />
          <p>BBC News</p>
        </div>
        <div id="CNN_News">
          <img
            src="https://download.logo.wine/logo/CNN/CNN-Logo.wine.png"
            alt="CNN_NEWS_icon"
          />
          <p>CNN News</p>
        </div>
        <div id="FOX_News">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/11/Fox-News-Channel-Emblem.png"
            alt="FOX_NEWS_icon"
          />
          <p>FOX News</p>
        </div>
        <div id="GOOGLE_News">
          <img
            src="https://cdn-icons-png.flaticon.com/128/2702/2702605.png"
            alt="GOOGLE_NEWS_icon"
          />
          <p>GOOGLE </p>
        </div>
      </div>
      <div className="Home">
        {news?.news?.map((item, index) => (
          <div id="News" key={`News${index + 1}`}>
            <img
              src={
                item.urlToImage === " " || item.urlToImage === undefined
                  ? NewsImage
                  : item.urlToImage
              }
              alt="Image"
              key={item.title}
            />
            <div id="content_container">
              <h1 key={`heading ${index}`}>{item.title}</h1>
              <p key={`content ${index}`}>{item.description}</p>
              <span>{`${item.publishedAt.split("T")[0]} / ${
                item.publishedAt.split("T").pop().split("Z")[0]
              }`}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
