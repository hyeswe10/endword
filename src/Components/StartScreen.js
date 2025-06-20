import { useState } from "react";

const StartScreen = ({onSend,onStart}) => {
    const [text,setText] = useState("");
    const handleText = (e)=>{
        e.preventDefault();
        const trimmed = text.trim();
        if(trimmed){
            onSend(trimmed);
            onStart(true);
        }
    }
    return (
        <div className="start-screen">
            <h1>AI와 함께하는<br/><span>♥</span>끝말잇기<span>♥</span></h1>
            <form className="input-form" onSubmit={handleText}>
                <h2>시작 단어를 입력하세요</h2>
                <input
                placeholder="예: 학교"
                value={text}
                onChange={(e)=>{setText(e.target.value)}}
                />
                <button type="submit">게임 시작</button>
            </form>
        </div>
    );
};

export default StartScreen;