import React, {useState,  useEffect } from 'react'

export default function LatestPosts() {
    const [posts, setPosts] = useState([]);
    const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=858043bd50e64b938b421764116abca7' ;
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                console.log(data);
    
                // Assuming titles are part of the fetched data
                const titles = data.articles.map(article => article.title);
                setPosts(titles);
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchPosts();
    }, [url]); // Dependency array added
    
return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f4f9' }}>
        <h1 className='text-center text-2xl font-serif bg-gray-300 p-3'>Latest Posts</h1>
 {posts.map((post, index) => (
                <div 
                className='p-4 font-bold bg-white shadow-md rounded-lg m-2 transition-transform transform hover:scale-105' 
                key={index}
                style={{ borderLeft: '5px solid #007BFF' }}
                >
                <p>
                {post}
                </p>
                </div>
            ))}

    </div>
)
}
