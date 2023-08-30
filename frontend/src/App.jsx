import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    scrollTo(0, 1e10);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    fetch("study-notion-ai-assistant-backend.vercel.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        msgs.push(data.output);
        setChats(msgs);
        setIsTyping(false);
        scrollTo(0, 1e10);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="max-w-800px mx-auto flex flex-col gap-4">
      <h1 className="text-3.2xl leading-1.1 text-center sticky top-0 bg-gray-900 py-4">
        StudyNotion Assistant
      </h1>

      <section className="flex flex-col gap-10">
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p key={index} className={`${
                chat.role === "user" ? "text-left flex flex-row items-center" : 
                "text-left flex flex-col items-start ml-[30%] p-10"
                } bg-darkslategray max-w-[70%] p-[5px] rounded-lg`}>
                <span className="m-5 mr-0 first:mr-5">
                  <b>{`${chat.role.toUpperCase()}:`}</b>
                </span>
               
                <span>{chat.content}</span>
              </p>
            ))
          : ""}
      </section>

      <div className={` ${isTyping ? "" : "hidden"} ml-[30%]`}>
        <p className="mt-4">
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}
      className="text-center sticky bottom-0">
        <input
        className="w-full h-[60px] border-none p-10px text-lg rounded-full bg-rgb(28, 23, 23) focus:outline-none"
          type="text"
          name="message"
          value={message}
          placeholder="    Type a message here and hit Enter...    "
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
}

export default App;