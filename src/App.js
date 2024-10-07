// import React, { useState, useEffect, useCallback } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
//   useNavigate,
//   useLocation,
// } from "react-router-dom";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8080/api",
//   withCredentials: true, // This ensures cookies (like CSRF tokens) are sent
// });

// const GOOGLE_CLIENT_ID =
//   "746656202102-5p44klkpb5nqh5sa51e7hsviiah8352s.apps.googleusercontent.com";

// function Home() {
//   const [user, setUser] = useState(null);
//   const [movies, setMovies] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   // fetchUser wrapped in useCallback to avoid unnecessary re-renders
//   const fetchUser = useCallback(async () => {
//     try {
//       const response = await axiosInstance.get("/auth/user");
//       if (response.data.authenticated) {
//         setUser(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       setError("Failed to fetch user information.");
//     }
//   }, []);

//   // handleOAuth2Redirect wrapped in useCallback
//   const handleOAuth2Redirect = useCallback(
//     async (code) => {
//       try {
//         const response = await axiosInstance.get(
//           `/login/oauth2/code/google?code=${code}`
//         );
//         if (response.data.authenticated) {
//           setUser(response.data);
//           fetchPopularMovies();
//           navigate("/"); // Clear the URL parameters
//         }
//       } catch (error) {
//         console.error("Error handling OAuth2 redirect:", error);
//         setError("Failed to complete login. Please try again.");
//       }
//     },
//     [navigate]
//   );

//   // useEffect now includes fetchUser and handleOAuth2Redirect as dependencies
//   useEffect(() => {
//     fetchUser();
//     const urlParams = new URLSearchParams(location.search);
//     const code = urlParams.get("code");
//     if (code) {
//       handleOAuth2Redirect(code);
//     }
//   }, [location, fetchUser, handleOAuth2Redirect]);

//   // handleLogout with Authorization header and without CSRF token
//   const handleLogout = async () => {
//     try {
//       const response = await axiosInstance.post("/auth/logout");
//       console.log("Logout successful", response);
//       // Clear user state and redirect to login page or home page
//       setUser(null);
//       navigate("/");
//     } catch (error) {
//       console.error("Logout failed:", error);
//       setError("Failed to logout. Please try again.");
//     }
//   };

//   const fetchPopularMovies = async () => {
//     try {
//       const response = await axiosInstance.get("/movies/popular");
//       setMovies(response.data);
      
      
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//       setError("Failed to load movies. Please try again later.");
//     }
//   };

//   //drama

//   const fetchDramaMovies = async () => {
//     try {
//       const response = await axiosInstance.get("/movies/drama");
//       setMovies(response.data);
      
      
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//       setError("Failed to load movies. Please try again later.");
//     }
//   };

//   // Define the missing handleLoginSuccess and handleLoginError functions
//   const handleLoginSuccess = (credentialResponse) => {
//     console.log("Google OAuth success:", credentialResponse);
//     window.location.href = `${axiosInstance.defaults.baseURL}/oauth2/authorization/google`;
//   };

//   const handleLoginError = () => {
//     console.error("Login Failed");
//     setError("Login failed. Please try again.");
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h1>Welcome, {user ? user.name : "Guest"}!</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {!user ? (
//         <GoogleLogin
//           onSuccess={handleLoginSuccess}
//           onError={handleLoginError}
//           cookiePolicy={"single_host_origin"}
//         />
//       ) : (
//         <button onClick={handleLogout}>Logout</button>
//       )}

//       <h2>Popular Movies</h2>
//       <button onClick={fetchPopularMovies} style={{ marginBottom: "20px" }}>
//         Load Movies
//       </button>
//       <button onClick={fetchDramaMovies} style={{ marginBottom: "20px" }}>
//         drama 
//       </button>
      

//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {movies.length > 0 ? (
//           movies.map((movie) => (
//             <div
//               key={movie.id}
//               style={{
//                 backgroundColor: "#fff",
//                 border: "1px solid #ddd",
//                 borderRadius: "10px",
//                 width: "200px",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                 overflow: "hidden",
//                 textAlign: "center",
//               }}
//             >
//               <img
//                 src={movie.posterUrl}
//                 alt={movie.title}
//                 style={{
//                   width: "100%",
//                   height: "300px",
//                   objectFit: "cover",
//                 }}
//               />
//               <div style={{ padding: "15px" }}>
//                 <h3 style={{ fontSize: "18px", margin: "10px 0" }}>
//                   {movie.title}
//                 </h3>
//                 <p>Genre: {movie.genre}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No movies to display</p>
//         )}
//       </div>
//     </div>
//   );
// }

// function LoginSuccess() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     navigate("/");
//   }, [navigate]);

//   return <div>Login Successful. Redirecting...</div>;
// }

// function App() {
//   return (
//     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login-success" element={<LoginSuccess />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Router>
//     </GoogleOAuthProvider>
//   );
// }

// export default App;


// import React, { useState, useEffect, useCallback } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
//   useNavigate,
//   useLocation,
// } from "react-router-dom";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8080/api",
//   withCredentials: true, // This ensures cookies (like CSRF tokens) are sent
// });

// const GOOGLE_CLIENT_ID =
//   "746656202102-5p44klkpb5nqh5sa51e7hsviiah8352s.apps.googleusercontent.com";

// function Home() {
//   const [user, setUser] = useState(null);
//   const [movies, setMovies] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const fetchUser = useCallback(async () => {
//     try {
//       const response = await axiosInstance.get("/auth/user");
//       if (response.data.authenticated) {
//         setUser(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       setError("Failed to fetch user information.");
//     }
//   }, []);

//   const handleOAuth2Redirect = useCallback(
//     async (code) => {
//       try {
//         const response = await axiosInstance.get(
//           `/login/oauth2/code/google?code=${code}`
//         );
//         if (response.data.authenticated) {
//           setUser(response.data);
//           fetchPopularMovies();
//           navigate("/"); // Clear the URL parameters
//         }
//       } catch (error) {
//         console.error("Error handling OAuth2 redirect:", error);
//         setError("Failed to complete login. Please try again.");
//       }
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     fetchUser();
//     const urlParams = new URLSearchParams(location.search);
//     const code = urlParams.get("code");
//     if (code) {
//       handleOAuth2Redirect(code);
//     }
//   }, [location, fetchUser, handleOAuth2Redirect]);

//   const handleLogout = async () => {
//     try {
//       await axiosInstance.post("/auth/logout");
//       setUser(null);
//       navigate("/");
//     } catch (error) {
//       console.error("Logout failed:", error);
//       setError("Failed to logout. Please try again.");
//     }
//   };

//   const fetchMoviesByGenre = async (genre) => {
//     try {
//       const response = await axiosInstance.get(`/movies/${genre}`);
//       setMovies(response.data);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//       setError("Failed to load movies. Please try again later.");
//     }
//   };

//   const handleLoginSuccess = (credentialResponse) => {
//     console.log("Google OAuth success:", credentialResponse);
//     window.location.href = `${axiosInstance.defaults.baseURL}/oauth2/authorization/google`;
//   };

//   const handleLoginError = () => {
//     console.error("Login Failed");
//     setError("Login failed. Please try again.");
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar fetchMoviesByGenre={fetchMoviesByGenre} />
//       <div style={{ flex: 1, padding: "20px", fontFamily: "Arial" }}>
//         <Header user={user} handleLogout={handleLogout} />
//         <h1>Welcome, {user ? user.name : "Guest"}!</h1>
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {!user ? (
//           <GoogleLogin
//             onSuccess={handleLoginSuccess}
//             onError={handleLoginError}
//             cookiePolicy={"single_host_origin"}
//           />
//         ) : null}

//         <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//           {movies.length > 0 ? (
//             movies.map((movie) => (
//               <div
//                 key={movie.id}
//                 style={{
//                   backgroundColor: "#fff",
//                   border: "1px solid #ddd",
//                   borderRadius: "10px",
//                   width: "200px",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                   overflow: "hidden",
//                   textAlign: "center",
//                 }}
//               >
//                 <img
//                   src={movie.posterUrl}
//                   alt={movie.title}
//                   style={{
//                     width: "100%",
//                     height: "300px",
//                     objectFit: "cover",
//                   }}
//                 />
//                 <div style={{ padding: "15px" }}>
//                   <h3 style={{ fontSize: "18px", margin: "10px 0" }}>
//                     {movie.title}
//                   </h3>
//                   <p>Genre: {movie.genre}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No movies to display</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// const Sidebar = ({ fetchMoviesByGenre }) => {
//   return (
//     <div style={{ width: "200px", backgroundColor: "#f4f4f4", padding: "20px" }}>
//       <h3>Genres</h3>
//       <button onClick={() => fetchMoviesByGenre("popular")} style={buttonStyle}>
//         Popular
//       </button>
//       <button onClick={() => fetchMoviesByGenre("drama")} style={buttonStyle}>
//         Drama
//       </button>
//       <button onClick={() => fetchMoviesByGenre("action")} style={buttonStyle}>
//         Action
//       </button>
//       <button onClick={() => fetchMoviesByGenre("comedy")} style={buttonStyle}>
//         Comedy
//       </button>
//     </div>
//   );
// };

// const Header = ({ user, handleLogout }) => {
//   return (
//     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#3f51b5", color: "#fff" }}>
//       <h1 style={{ margin: 0 }}>Google Auth</h1>
//       {user ? (
//         <button onClick={handleLogout} style={buttonStyle}>
//           Logout
//         </button>
//       ) : (
//         <span>Login</span>
//       )}
//     </div>
//   );
// };

// const buttonStyle = {
//   margin: "10px 0",
//   padding: "10px",
//   backgroundColor: "#3f51b5",
//   color: "#fff",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
//   transition: "background-color 0.3s",
// };

// const hoverStyle = {
//   backgroundColor: "#303f9f",
// };

// function App() {
//   return (
//     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Router>
//     </GoogleOAuthProvider>
//   );
// }

// export default App;

import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

const GOOGLE_CLIENT_ID =
  "746656202102-5p44klkpb5nqh5sa51e7hsviiah8352s.apps.googleusercontent.com";

function Home() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/auth/user");
      if (response.data.authenticated) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Failed to fetch user information.");
    }
  }, []);

  const handleOAuth2Redirect = useCallback(
    async (code) => {
      try {
        const response = await axiosInstance.get(
          `/login/oauth2/code/google?code=${code}`
        );
        if (response.data.authenticated) {
          setUser(response.data);
          fetchPopularMovies();
          navigate("/"); // Clear the URL parameters
        }
      } catch (error) {
        console.error("Error handling OAuth2 redirect:", error);
        setError("Failed to complete login. Please try again.");
      }
    },
    [navigate]
  );

  useEffect(() => {
    fetchUser();
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");
    if (code) {
      handleOAuth2Redirect(code);
    }
  }, [location, fetchUser, handleOAuth2Redirect]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Failed to logout. Please try again.");
    }
  };

  const fetchMoviesByGenre = async (genre) => {
    try {
      const response = await axiosInstance.get(`/movies/${genre}`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to load movies. Please try again later.");
    }
  };

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Google OAuth success:", credentialResponse);
    window.location.href = `${axiosInstance.defaults.baseURL}/oauth2/authorization/google`;
  };

  const handleLoginError = () => {
    console.error("Login Failed");
    setError("Login failed. Please try again.");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar fetchMoviesByGenre={fetchMoviesByGenre} />
      <div style={{ flex: 1, padding: "20px", fontFamily: "Arial" }}>
        <Header user={user} handleLogout={handleLogout} />
        <h1>Welcome, {user ? user.name : "Guest"}!</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!user ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            cookiePolicy={"single_host_origin"}
          />
        ) : null}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  width: "200px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: "15px" }}>
                  <h3 style={{ fontSize: "18px", margin: "10px 0" }}>
                    {movie.title}
                  </h3>
                  <p>Genre: {movie.genre}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No movies to display</p>
          )}
        </div>
      </div>
    </div>
  );
}

const Sidebar = ({ fetchMoviesByGenre }) => {
  return (
    <div style={{ width: "200px", backgroundColor: "#f4f4f4", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <h3>Genres</h3>
      <button onClick={() => fetchMoviesByGenre("popular")} style={buttonStyle}>
        Popular
      </button>
      <button onClick={() => fetchMoviesByGenre("drama")} style={buttonStyle}>
        Drama
      </button>
      <button onClick={() => fetchMoviesByGenre("action")} style={buttonStyle}>
        Action
      </button>
      <button onClick={() => fetchMoviesByGenre("comedy")} style={buttonStyle}>
        Comedy
      </button>
    </div>
  );
};

const Header = ({ user, handleLogout }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#3f51b5", color: "#fff" }}>
      <h1 style={{ margin: 0 }}>Google Auth</h1>
      {user ? (
        <button onClick={handleLogout} style={buttonStyle}>
          Logout
        </button>
      ) : (
        <span>Login</span>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#3f51b5",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const App = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
