import { useEffect, useRef, useState } from "react";
import { dictionary } from "../api/diction";



const GameScreen = ({text}) => {
    const bottomRef = useRef(null);
    const inputRef = useRef(null);
    const [words,setWords] = useState([text]);
    const [input,setInput] = useState("");
    const [loading,setLoading] = useState(false);

    //words에 배열이 변경될 때 마다 bottomRef 객체로 이동
    useEffect(()=>{
        if(bottomRef.current){
            bottomRef.current.scrollIntoView({behavior:"auto"});
        }
    },[words])
    const addWord = (data)=>{
        setWords((prev)=>{return[...prev,data]})
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        //사용자에게 값을 입력을 받으면 공백을 제거
        const userWord = input.trim();
        if(!userWord)return;
        //마지막 글자와 같은지 비교
        //words의 마지막 단어의 마지막 글자 === userWord의 첫번째 글자
        const lastWord = words[words.length-1];
        if( lastWord[lastWord.length-1] === userWord[0] ){
        //사용자가 입력한 단어를 먼저 추가
        addWord(input.trim());
        setInput("");
        setLoading(true);
        } else{
            alert(`${lastWord[lastWord.length-1]}로 시작해야합니다`)
            setInput("");
            return;
        }
        //1초 후에 API를 호출
        setTimeout(async()=>{
            const lastChar = userWord[userWord.length-1];
            const word = await dictionary(lastChar); //마지막 글자
            if(word){
                addWord(word);
                setLoading(false);
            } else{
                alert("컴퓨터 단어를 찾지 못했습니다");
                setLoading(false);
            }
        },1000);
        inputRef.current.focus();
    }
    return (
        <div className="game-screen">
            <h2>AI와 함께하는<br/>끝말잇기</h2>
            <ul className="word-list">
                {
                    words.map((value,idx)=>{
                        return <li key={idx}><span>♥</span><span>{value}</span></li>
                    })
                }
                <li ref={bottomRef}></li>
            </ul>
            <p className="loading">{loading && "AI가 단어를 고민중입니다..."}</p>
            <form className="game-form" onSubmit={handleSubmit}>
                <input
                    placeholder="다음 낱말을 입력하세요"
                    ref={inputRef}
                    value={input}
                    onChange={(e)=>{setInput(e.target.value)}}
                />
                <button type="submit" onClick={handleSubmit}>▶</button>
            </form>
        </div>
    );
};

export default GameScreen;