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
    loading: false,
    Country_select: "global",
    category_select: "general",
    News_Select_url: "No",
  });
  const [hover, setHover] = useState({ category: false, country: false });
  const fetch = async (url) => {
    setNews((pre) => ({ ...pre, loading: true }));
    let res = await axios.get(url);
    setNews((pre) => ({
      ...pre,
      total: res.data.totalResults,
      news: res.data.articles,
      loading: false,
    }));
  };
  useEffect(() => {
    fetch("https://saurav.tech/NewsAPI/everything/bbc-news.json");
  }, []);
  function country(item) {
    setNews((pre) => ({ ...pre, Country_select: item }));
    if (news.category_select === "general") {
      fetch(
        `https://saurav.tech/NewsAPI/top-headlines/category/general/${item}.json`
      );
    } else {
      fetch(
        `https://saurav.tech/NewsAPI/top-headlines/category/${news.category_select}/${item}.json`
      );
    }
  }
  function category(item) {
    setNews((pre) => ({ ...pre, category_select: item }));
    if (news.Country_select === "global") {
      fetch(
        `https://saurav.tech/NewsAPI/top-headlines/category/${item}/us.json`
      );
    } else {
      fetch(
        `https://saurav.tech/NewsAPI/top-headlines/category/${item}/${news.Country_select}.json`
      );
    }
  }
  function NewsSelect(item) {
    let url = data.News.find((ele) => ele.code === item);
    setNews((pre) => ({ ...pre, News_Select_url: url.url }));
    fetch(`https://saurav.tech/NewsAPI/everything/${item}.json`);
  }
  return (
    <>
      <header>
        <div>
          <p
            id={!hover.country ? "deactivate" : "activated"}
            onMouseOver={() => setHover((pre) => ({ ...pre, country: true }))}
            onMouseOut={() => setHover((pre) => ({ ...pre, country: false }))}
            onClick={() =>
              setHover((pre) => ({ ...pre, country: !hover.country }))
            }
          >
            {news.Country_select === "global" ? (
              "Country"
            ) : (
              <>
                <img
                  src={
                    data.Country.find(
                      (item) => item.code === news.Country_select
                    ).url
                  }
                  alt="country"
                />
                <span>
                  {
                    data.Country.find(
                      (item) => item.code === news.Country_select
                    ).name
                  }
                </span>
              </>
            )}
          </p>
          <p
            id={!hover.category ? "deactivate" : "activated"}
            onClick={() =>
              setHover((pre) => ({ ...pre, category: !hover.category }))
            }
            onMouseOver={() => setHover((pre) => ({ ...pre, category: true }))}
            onMouseOut={() => setHover((pre) => ({ ...pre, category: false }))}
          >
            {news.category_select === "general"
              ? "Category"
              : data.category.find((item) => item.code === news.category_select)
                  .name}
          </p>
        </div>
        <div>
          <button
            id="News_button"
            onMouseOver={() => setNews((pre) => ({ ...pre, NewsChange: true }))}
            onMouseOut={() => setNews((pre) => ({ ...pre, NewsChange: false }))}
            onClick={() =>
              setNews((pre) => ({ ...pre, NewsChange: !news.NewsChange }))
            }
          >
            News
          </button>
        </div>
      </header>
      <div
        className={
          hover.category ? "category_container" : "category_container hide"
        }
        onMouseOver={() =>
          setNews((pre) => ({
            ...pre,
            category: true,
          }))
        }
        onMouseOut={() =>
          setNews((pre) => ({
            ...pre,
            category: false,
          }))
        }
      >
        {data.category.map((item) => (
          <p key={item.name} onClick={() => category(item.code)}>
            {item.name}
          </p>
        ))}
      </div>
      <div
        className={
          hover.country ? "country_container" : "country_container hide"
        }
        onMouseOver={() =>
          setNews((pre) => ({
            ...pre,
            country: true,
          }))
        }
        onMouseOut={() =>
          setNews((pre) => ({
            ...pre,
            country: false,
          }))
        }
      >
        {data.Country.map((item, index) => (
          <div
            className="country"
            key={`parent_${index}`}
            onClick={() => country(item.code)}
          >
            <img src={item.url} alt={item.name} key={`${item.name} flag`} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div id={news.NewsChange ? "News_Channels" : "News_channels_Hide"}>
        {data.News.map((item, index) => (
          <div
            id={item.name}
            key={`News_Selection${index}`}
            onClick={() => NewsSelect(item.code)}
          >
            <img src={item.url} alt={item.alt} />
            <p>{item.name}</p>
          </div>
        ))}
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
              key={`${item.title}${index}`}
            />
            <div id="content_container" key={`content_container${index}`}>
              <h1 key={`heading ${index}`}>{item.title}</h1>
              <p key={`content ${index}`}>{item.description}</p>
              <div id="View_More" key={`ViewMore`}>
                <a href={item.url}>{`Read More  :)`}</a>
                <span>{`${
                  item.publishedAt.split("T").pop().split("Z")[0]
                }`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
