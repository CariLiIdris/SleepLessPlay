// DisplayNews.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const NewsDisplay = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Fetch news data from API
    axios.get('http://localhost:8002/news')
      .then(res => {
        setNews(res.data);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }, []);

  return (
    <div className="news-container">
      <h1>Latest News</h1>
      {news.map(item => (
        <div key={item.id} className="news-items">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <Link to={`/news/${item.id}`} className="read-more-link">Read More</Link>
        </div>
      ))}
    </div>
  );
};