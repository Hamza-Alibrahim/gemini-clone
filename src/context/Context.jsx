/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import run from "../config/gemini";

// eslint-disable-next-line react-refresh/only-export-components
export const context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (i, n) => {
    setTimeout(() => {
      setResultData((prev) => prev + n);
    }, 75 * i);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSend = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }
    const responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 === 0) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newArray = newResponse2.split(" ");
    for (let i = 0; i < newArray.length; i++) {
      const nextWord = newArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };
  const contextValue = {
    onSend,
    prevPrompts,
    setPrevPrompts,
    recentPrompt,
    setRecentPrompt,
    loading,
    showResult,
    input,
    setInput,
    resultData,
    newChat,
  };
  return (
    <context.Provider value={contextValue}>{props.children}</context.Provider>
  );
};

export default ContextProvider;
