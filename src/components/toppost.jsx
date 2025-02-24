import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { toppost_content } from "../assets/data";
import Postcard from "./postcard";
import { useEffect, useState } from "react";
import { allNEWS, sportsNEWS, businessNEWS, techNEWS, entertainmentNEWS } from "../assets/staticData";

const Toppost = () => {
  const [Allnews, setAllNews] = useState(allNEWS.articles);
  const [Sports, setSports] = useState(sportsNEWS.articles);
  const [Entertainment, setEntertainment] = useState(entertainmentNEWS.articles);
  const [Technology, setTechnology] = useState(techNEWS.articles);
  const [Business, setBusiness] = useState(businessNEWS.articles);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // useEffect(() => {
  //   const fetchNews = async () => {
  //     try {
  //       // Fetch All News
  //       const allResponse = await fetch(`${BASE_URL}/api/homeallnews`);
  //       const allData = await allResponse.json();
  //       console.log(allData); 
  //       setAllNews(allData.articles);

  //       // Fetch Sports News
  //       const sportsResponse = await fetch(`${BASE_URL}/api/homesportsnews`);
  //       const sportsData = await sportsResponse.json();
  //       setSports(sportsData.articles);

  //       // Fetch Entertainment News
  //       const entertainmentResponse = await fetch(`${BASE_URL}/api/homeentertainmentnews`);
  //       const entertainmentData = await entertainmentResponse.json();
  //       setEntertainment(entertainmentData.articles);

  //       // Fetch Technology News
  //       const technologyResponse = await fetch(`${BASE_URL}/api/hometechnologynews`);
  //       const technologyData = await technologyResponse.json();
  //       setTechnology(technologyData.articles);

  //       // Fetch Business News
  //       const businessResponse = await fetch(`${BASE_URL}/api/homebusinessnews`);
  //       const businessData = await businessResponse.json();
  //       console.log(businessData);
  //       setBusiness(businessData.articles);
  //     } catch (error) {
  //       console.error("Error fetching news:", error);
  //     }
  //   };

  //   fetchNews();
  // }, []);

  return (
    <>
      <Tabs id="custom-animation" value="html" className="mt-2">
        <TabsHeader className="bg-gray-200">
          {toppost_content.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>

        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {toppost_content.map(({ value, label }) => (
            <TabPanel
              key={value}
              value={value}
              label={label}
              className="bg-gray-200 h-auto grid md:grid-cols-4 grid-cols-1 gap-3 overflow-auto"
            >
              {label === "All" ? (
                Allnews.length ? (
                  Allnews.map((article, index) => (
                    <Postcard
                      key={index}
                      heading={article.title}
                      content={article.description}
                      imageURL={article.urlToImage}
                      newsURL={article.url}
                    />
                  ))
                ) : (
                  <p>Loading news...</p>
                )
              ) : label === "Sports" ? (
                Sports.length ? (
                  Sports.map((article, index) => (
                    <Postcard
                      key={index}
                      heading={article.title}
                      content={article.description}
                      imageURL={article.urlToImage}
                      newsURL={article.url}
                    />
                  ))
                ) : (
                  <p>Loading news...</p>
                )
              ) : label === "Technology" ? (
                Technology.length ? (
                  Technology.map((article, index) => (
                    <Postcard
                      key={index}
                      heading={article.title}
                      content={article.description}
                      imageURL={article.urlToImage}
                      newsURL={article.url}
                    />
                  ))
                ) : (
                  <p>Loading news...</p>
                )
              ) : label === "Entertainment" ? (
                Entertainment.length ? (
                  Entertainment.map((article, index) => (
                    <Postcard
                      key={index}
                      heading={article.title}
                      content={article.description}
                      imageURL={article.urlToImage}
                      newsURL={article.url}
                    />
                  ))
                ) : (
                  <p>Loading news...</p>
                )
              ) : label === "Business" ? (
                Business.length ? (
                  Business.map((article, index) => (
                    <Postcard
                      key={index}
                      heading={article.title}
                      content={article.description}
                      imageURL={article.urlToImage}
                      newsURL={article.url}
                    />
                  ))
                ) : (
                  <p>Loading news...</p>
                )
              ) : (
                <p>No news available</p>
              )}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  );
};

export default Toppost;
