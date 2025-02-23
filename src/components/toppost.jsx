import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import { toppost_content } from "../assets/data";
import Postcard from "./postcard";
import { useEffect , useState } from "react";


const Toppost = () => {

  const [Allnews , setAllNews ] = useState([]);
  const [Sports , setSports ] = useState([]);
  const [Entertainment , setEntertainment ] = useState([]);
  const [Technology , setTechnology ] = useState([]);
  const [Business , setBusiness ] = useState([]);
  

  useEffect( () => {
    //  Defining the fetchnews function : 
        const fetchnews = async () => {
          try{
                const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=331e844264f040ebb02be43ba4a9ddd7')
                const data = await response.json() ;
                setAllNews(data.articles)
          }
          catch(error){
            console.error("Error fetching the news : ", error ); 
          }
        }; 

        fetchnews(); 

  } , [] ); 

  useEffect( () => {
    //  Defining the fetchnews function : 
        const fetchnews = async () => {
          try{
                const response = await fetch('https://newsapi.org/v2/top-headlines?category=sports&country=us&apiKey=331e844264f040ebb02be43ba4a9ddd7')
                const Sportsdata = await response.json() ;
                setSports(Sportsdata.articles)
          }
          catch(error){
            console.error("Error fetching the news : ", error ); 
          }
        }; 

        fetchnews(); 

  } , [] ); 

  useEffect( () => {
    //  Defining the fetchnews function : 
        const fetchnews = async () => {
          try{
                const response = await fetch('https://newsapi.org/v2/top-headlines?category=entertainment&country=us&apiKey=331e844264f040ebb02be43ba4a9ddd7')
                const data = await response.json() ;
                setEntertainment(data.articles)
          }
          catch(error){
            console.error("Error fetching the news : ", error ); 
          }
        }; 

        fetchnews(); 

  } , [] ); 

  useEffect( () => {
    //  Defining the fetchnews function : 
        const fetchnews = async () => {
          try{
                const response = await fetch('https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=331e844264f040ebb02be43ba4a9ddd7')
                const Sportsdata = await response.json() ;
                setTechnology(Sportsdata.articles)
          }
          catch(error){
            console.error("Error fetching the news : ", error ); 
          }
        }; 

        fetchnews(); 

  } , [] ); 

  useEffect( () => {
    //  Defining the fetchnews function : 
        const fetchnews = async () => {
          try{
                const response = await fetch('https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=331e844264f040ebb02be43ba4a9ddd7')
                const Sportsdata = await response.json() ;
                setBusiness(Sportsdata.articles)
          }
          catch(error){
            console.error("Error fetching the news : ", error ); 
          }
        }; 

        fetchnews(); 

  } , [] );



  return (
    <>
    <Tabs id="custom-animation" value="html" className="mt-2  ">
      <TabsHeader className="bg-gray-200">
        {toppost_content.map(({ label, value }) => (
          <Tab key={value} value={value} >
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
            <TabPanel key={value} value={value}  label = {label}className="bg-gray-200 h-auto grid md:grid-cols-4 grid-cols-1 gap-3 overflow-auto">
            { label === 'All' ? (
                Allnews.length ? (
                  Allnews.map((article, index) => (
                    <Postcard heading={article.title} content={article.description} imageURL = {article.urlToImage} newsURL={article.url}/>
                  ))
                ) : (
                  <p>Loading news...</p>
                )
            ) : label === 'Sports' ? Sports.length ? (
              Sports.map((article, index) => (
                <Postcard heading={article.title} content={article.description} imageURL = {article.urlToImage} newsURL={article.url}/>
              ))
            ) : (
              <p>Loading news...</p>
            ) : label === 'Technology' ? Technology.length ? (
              Technology.map((article, index) => (
                <Postcard heading={article.title} content={article.description} imageURL = {article.urlToImage} newsURL={article.url}/>
              ))
            ) : (
              <p>Loading news...</p>
            ) : label === 'Entertainment' ? Entertainment.length ? (
              Entertainment.map((article, index) => (
                <Postcard heading={article.title} content={article.description} imageURL = {article.urlToImage} newsURL={article.url}/>
              ))
            ) : (
              <p>Loading news...</p>
            ): label === 'Business' ? Business.length ? (
              Business.map((article, index) => (
                <Postcard heading={article.title} content={article.description} imageURL = {article.urlToImage} newsURL={article.url}/>
              ))
            ) : (
              <p>Loading news...</p>
            ) : <p>  No news available </p>

          }
          </TabPanel>
        ))}

      </TabsBody>
    </Tabs>

    {/* *************************   THE END ********************************** */}


    </>
  )


     


}

export default Toppost
