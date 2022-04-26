import './App.css';
import Header from "./components/Header";
import Main from "./components/Main";
import SmartCountExplanation from "./components/NotShownByDefault/SmartCountExplanation";
import {useState} from "react";

function App() {
  const [smartCountPopUp, setSmartCountPopUp] = useState(false);

  return (
    <div className="App">
        {smartCountPopUp ? <SmartCountExplanation setSmartCountPopUp={setSmartCountPopUp}/>: null}
        <Header />
        <Main setSmartCountPopUp={setSmartCountPopUp}/>
    </div>
  );
}

export default App;
