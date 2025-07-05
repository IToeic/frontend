// import logo from './logo.svg';
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./Layouts/Header";
import Menu from "./Layouts/Menu";
import Main from "./components/Main";

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  const [data, setData] = useState("");
  const [activeTab, setActiveTab] = useState();
  const [activeSubTab, setActiveSubTab] = useState();

  useEffect(() => {
    axios
      .get("/test")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogoClick = () => {
    setActiveTab(null);
    setActiveSubTab(null);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header onLogoClick={handleLogoClick} />
      <div className="flex-1 flex overflow-hidden">
        <Menu
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeSubTab={activeSubTab}
          setActiveSubTab={setActiveSubTab}
        />
        <Main activeTab={activeTab} activeSubTab={activeSubTab} />
      </div>
    </div>
  );
}

// // export default App;
// import axios from "axios";
// import { useEffect, useState } from "react";

// function App() {
//   const [message, setMessage] = useState("");
//   useEffect(() => {
//     const loadTestApi = async () => {
//       try {
//         const response = await axios.get("/api/test");
//         setMessage(response.data.message);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     loadTestApi();
//   }, []);

//   return <div>{message}</div>;
// }

export default App;
