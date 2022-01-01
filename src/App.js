
import './App.css';
import GoogleLogin from 'react-google-login';
import { useState } from 'react';

function App() {

  const [loginData, setLoginData] = useState(localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null)
  const handleFailure = (result) => {
    alert(result)
  }
  const handleLogout = () => {

  }
  const handleLogin = async (googleData) => {
    const res = await fetch("/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "appilication/json"
      }
    }).then(response => {
      const data = response.json();
      console.log(data)
      setLoginData(data)
      localStorage.setItem("loginData", JSON.stringify(data))
    })

  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>React google login</h1>
        <div className="">
          {
            loginData ? (
              <div>
                <h3>You are logged in as{loginData.email} </h3>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText='Login with Google'
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={"single_host_origin"}
            ></GoogleLogin>
          }

        </div>
      </header>
    </div>
  );
}

export default App;
