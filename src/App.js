import { useState } from "react";
import StartScreen from "./Components/StartScreen";
import GameScreen from "./Components/GameScreen";
import './styles/App.scss';

const App = () => {
  const [sendText,setSendText] = useState("");
  const [started,setStarted] = useState(false);
  return (
    <div className="app">
      {
        !started ? <StartScreen onSend={setSendText} onStart={setStarted}/> : <GameScreen text={sendText}/>
      }
    </div>
  );
};

export default App;
