// import logo from './logo.svg';
import { useState } from "react";
import "./App.css";
import Header from "./layouts/Header";
import Menu from "./layouts/Menu";
import Main from "./pages/Main";

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

  const [activeTab, setActiveTab] = useState();
  const [activeSubTab, setActiveSubTab] = useState();
  const [expandedTab, setExpandedTab] = useState();

  const handleLogoClick = () => {
    setActiveTab(null);
    setActiveSubTab(null);
    setExpandedTab(null);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header onLogoClick={handleLogoClick} />
      <div className="flex-1 flex">
        <Menu
          className="w-64 bg-white shadow"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeSubTab={activeSubTab}
          setActiveSubTab={setActiveSubTab}
          expandedTab={expandedTab}
          setExpandedTab={setExpandedTab}
        />
        <div className="flex-1 overflow-y-auto">
          <Main
            activeTab={activeTab}
            activeSubTab={activeSubTab}
            setActiveTab={setActiveTab}
            setActiveSubTab={setActiveSubTab}
            setExpandedTab={setExpandedTab}
          />
        </div>
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
