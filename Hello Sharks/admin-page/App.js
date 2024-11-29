import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Sharks");
  const [likedCards, setLikedCards] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [news, setNews] = useState([]); // State to hold the news articles
  const [selectedShark, setSelectedShark] = useState(null); // State for selected shark
const [isProfilePaneOpen, setIsProfilePaneOpen] = useState(false); // Control pane visibility

const handleViewProfile = (shark) => {
  setSelectedShark(shark); // Set the selected shark details
  setIsProfilePaneOpen(true); // Open the profile pane
};

const closeProfilePane = () => {
  setIsProfilePaneOpen(false); // Close the profile pane
  setSelectedShark(null); // Clear the selected shark
};

  // Sample shark data
  const sharks = [
    {
      id: 1,
      name: "Aman Gupta",
      title: "Co-founder of boAt",
      investments: "Over 50 startups",
      netWorth: "$310M",
      bio: "Aman Gupta is known for his expertise in brand building and tech innovation.",
    },
    {
      id: 2,
      name: "Vineeta Singh",
      title: "CEO of Sugar Cosmetics",
      investments: "Consumer Goods and Lifestyle",
      netWorth: "$200M",
      bio: "Vineeta is a trailblazer in the beauty industry with a focus on affordability and quality.",
    },
    {
      id: 3,
      name: "Namita Thapar",
      title: "Executive Director, Emcure Pharmaceuticals",
      investments: "Healthcare and Wellness",
      netWorth: "$350M",
      bio: "Namita Thapar brings a wealth of experience in healthcare innovation and leadership.",
    },
    {
      id: 4,
      name: "Peyush Bansal",
      title: "Founder of Lenskart",
      investments: "E-commerce and Tech Startups",
      netWorth: "$400M",
      bio: "Peyush is a visionary in the e-commerce space, revolutionizing eyewear retail.",
    },
    {
      id: 5,
      name: "Anupam Mittal",
      title: "Founder of Shaadi.com",
      investments: "Tech and Consumer Platforms",
      netWorth: "$250M",
      bio: "Anupam is a pioneer in the online matchmaking industry with a focus on scalability.",
    },
    {
      id: 6,
      name: "Ashneer Grover",
      title: "Ex-MD of BharatPe",
      investments: "Fintech and Startups",
      netWorth: "$600M",
      bio: "Ashneer Grover is known for his sharp business acumen and fintech expertise.",
    },
    {
      id: 7,
      name: "Ghazal Alagh",
      title: "Co-founder of Mamaearth",
      investments: "Consumer Goods and Skincare",
      netWorth: "$150M",
      bio: "Ghazal Alagh is a strong advocate for natural and sustainable skincare solutions.",
    },
    {
      id: 8,
      name: "Ritesh Agarwal",
      title: "Founder of OYO Rooms",
      investments: "Hospitality and Tech",
      netWorth: "$1.1B",
      bio: "Ritesh Agarwal is the youngest billionaire in the hospitality industry, disrupting the hotel market.",
    },
    {
      id: 9,
      name: "Kunal Shah",
      title: "Founder of CRED",
      investments: "Fintech and Consumer Apps",
      netWorth: "$800M",
      bio: "Kunal Shah specializes in building consumer platforms that focus on financial empowerment.",
    },
    {
      id: 10,
      name: "Byju Raveendran",
      title: "Founder of BYJU’S",
      investments: "EdTech and Startups",
      netWorth: "$2.5B",
      bio: "Byju is a leader in the EdTech industry, transforming education through technology.",
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

  // Fetch news articles when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c9089297ed904d6aae75a3b8cba3cc12`
        );
        const data = await response.json();
        setNews(data.articles.slice(0, 4)); // Display top 3 news articles
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
          className={activePage === "Sharks" ? "active" : ""}
          onClick={() => setActivePage("Sharks")}
        >
          Shark's Requests
        </button>
      </div>

      {/* Main content */}
      <div className="main-content">
        {activePage === "Sharks" && (
          <div className="sharks-page">
            <div className="header">
              <h1>Requests For Approval</h1>
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

            {/* Render shark request cards */}
            <div className="shark-requests">
              {sharks.map((shark) => (
                <div key={shark.id} className="request-card">
                  <p className="shark-name">{shark.name}</p>
                  <p className="shark-title">{shark.title}</p>
                  <div className="button-group">

                    <button
                      className="button viewProfile-button"
                      onClick={() => handleViewProfile(shark)} // Pass the shark object
                    >
                      View Profile
                    </button>

                    <button
                      className="button approve-button"
                      onClick={() => handleLikeClick(shark.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="button decline-button"
                      onClick={() => handleLikeClick(shark.id)}
                    >
                      Decline
                    </button>
                  </div>
                  
                </div>
              ))}
            </div>

            {/* Popup */}
            {showPopup && (
              <div className="popup">
                <div className="popup-content">
                  <p>Are You Sure?</p>
                  <button onClick={confirmLike}>Yes</button>
                  <button onClick={cancelLike}>No</button>
                </div>
              </div>
            )}
            {isProfilePaneOpen && (
              <div className="profile-pane">
                <div className="profile-pane-header">
                  <h2>{selectedShark.name}'s Profile</h2>
                  <button className="close-button" onClick={closeProfilePane}>
                    X
                  </button>
                </div>
                <div className="profile-pane-content">
                  <p><strong>Occupation:</strong> {selectedShark.title}</p>
                  <p><strong>Investments:</strong> {selectedShark.investments}</p>
                  <p><strong>Net Worth:</strong> {selectedShark.netWorth}</p>
                  {/* Add more details as needed */}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
