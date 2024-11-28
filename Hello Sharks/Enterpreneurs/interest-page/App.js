import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Sharks");
  const [likedCards, setLikedCards] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [showLikedOnly, setShowLikedOnly] = useState(false); // State for the toggle
  const [news, setNews] = useState([]); // State to hold the news articles

  const sharkData = [
    {
      id: 0,
      name: "Aman Gupta",
      title: "Co-Founder, boAt",
      image: "https://via.placeholder.com/150",
      bio: "Aman Gupta is a co-founder of boAt, a leading brand in consumer electronics and lifestyle products.",
    },
    {
      id: 1,
      name: "Anupam Mittal",
      title: "Founder, Shaadi.com",
      image: "https://via.placeholder.com/150",
      bio: "Anupam Mittal is a renowned entrepreneur and founder of Shaadi.com, India's leading matrimonial platform.",
    },
    {
      id: 2,
      name: "Vineeta Singh",
      title: "CEO, Sugar Cosmetics",
      image: "https://via.placeholder.com/150",
      bio: "Vineeta Singh is the CEO of Sugar Cosmetics, a fast-growing beauty brand in India.",
    },
    {
      id: 3,
      name: "Peyush Bansal",
      title: "Co-Founder, Lenskart",
      image: "https://via.placeholder.com/150",
      bio: "Peyush Bansal is a co-founder of Lenskart, a leading eyewear company revolutionizing the retail industry.",
    },
  ];

  const handleLikeClick = (cardId) => {
    setCurrentCard(cardId);
    setShowPopup(true);
  };

  const confirmLike = () => {
    setLikedCards((prev) => [...prev, currentCard]);
    setShowPopup(false);
    setCurrentCard(null);
  };

  const cancelLike = () => {
    setShowPopup(false);
    setCurrentCard(null);
  };

  const toggleLikedOnly = (isChecked) => {
    setShowLikedOnly(isChecked);
  };

  const filteredSharkData = showLikedOnly
    ? sharkData.filter((shark) => likedCards.includes(shark.id))
    : sharkData;

  // Fetch news articles when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=c9089297ed904d6aae75a3b8cba3cc12`
        );
        const data = await response.json();
        setNews(data.articles.slice(0, 3)); // Display top 3 news articles
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="app-container">
     

      {/* Sidebar for navigation */}
      <div className="sidebar">
        <button
          className={activePage === "Profile" ? "active" : ""}
          onClick={() => setActivePage("Profile")}
        >
          Profile
        </button>
        <button
          className={activePage === "Sharks" ? "active" : ""}
          onClick={() => setActivePage("Sharks")}
        >
          Sharks
        </button>
        <button
          className={activePage === "Meeting" ? "active" : ""}
          onClick={() => setActivePage("Meeting")}
        >
          Meeting
        </button>
      </div>

      {/* Main content */}
      <div className="main-content">
        {activePage === "Profile" && (
          <div className="profile-page">
            <h1>Profile</h1>
            <p>This is the Profile page.</p>
          </div>
        )}
        {activePage === "Sharks" && (
          <div className="sharks-page">
            <div className="header">
              <h1>Sharks</h1>
              <button className="logout-button">Logout</button>
            </div>

             {/* Live news section */}
      <div className="news-bar">
        {news.length > 0 ? (
          <marquee>
            {news.map((article, index) => (
              <span key={index} className="news-item">
                {article.title}
                {index < news.length - 1 && " | "}
              </span>
            ))}
          </marquee>
        ) : (
          <p>Loading latest business news...</p>
        )}
      </div>

            <div className="toggle-container">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  className="toggle-input"
                  onChange={(e) => toggleLikedOnly(e.target.checked)}
                />
                <span className="toggle-slider"></span>
                <span className="toggle-text">Interested Sharks</span>
              </label>
            </div>

            <div className="shark-cards">
              {filteredSharkData.map((shark) => (
                <div className="card" key={shark.id}>
                  <img src={shark.image} alt={shark.name} className="shark-image" />
                  <h2>{shark.name}</h2>
                  <h4>{shark.title}</h4>
                  <p>{shark.bio}</p>
                  <div className="card-actions">
                    <button
                      className={`like-button ${
                        likedCards.includes(shark.id) ? "liked" : ""
                      }`}
                      onClick={() => handleLikeClick(shark.id)}
                    >
                      ❤ Like
                    </button>
                    <button className="info-button">More Info</button>
                  </div>
                </div>
              ))}
            </div>

            {showPopup && (
              <div className="popup">
                <div className="popup-content">
                  <p>Are You Really Interested?</p>
                  <button onClick={confirmLike}>Yes</button>
                  <button onClick={cancelLike}>No</button>
                </div>
              </div>
            )}
          </div>
        )}
        {activePage === "Meeting" && (
          <div className="meeting-page">
            <h1>Meeting</h1>
            <p>This is the Meeting page.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
