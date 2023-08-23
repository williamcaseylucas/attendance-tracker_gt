"use client";
import { validateHeaderValue } from "http";
import { useEffect, useState } from "react";
import { setCommentRange } from "typescript";

const colors = [
  "#7fb069",
  "#fffbbd",
  "#e6aa68",
  "#ea3c25",
  "#bfab1d",
  "#898c85",
  "#F25F5C",
  "#877fa3",
  "#7485c4",
  "#70C1B3",
];

type Props = {};

const Attendance = (props: Props) => {
  const [clientId, setClientId] = useState<number>(1);
  const [websckt, setWbsckt] = useState<WebSocket>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setClientId(Math.floor(new Date().getTime() / 1000));
  }, []);

  useEffect(() => {
    // const url = "ws://localhost:8000/ws/" + clientId;
    const url = `ws://localhost:8000/ws/${clientId}`;
    console.log("url: ", url);
    const ws = new WebSocket(url);

    ws.onopen = (event) => {
      ws.send("connect");
    };

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages([...messages, message]);

      if (message.message === "connect") setStatus(true);
      if (message.message === "Offline") setStatus(false);
    };

    setWbsckt(ws);
    return () => ws.close();
  }, [clientId]);

  const sendMessage = () => {
    if (message.length !== 0) {
      websckt?.send(message);
      if (websckt) {
        websckt.onmessage = (e) => {
          const message = JSON.parse(e.data);
          setMessages([...messages, message]);
        };
        setMessage("");
      }
    } else {
      console.log("enter a value!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100%-3.5rem)]">
      <h1 className="text-4xl font-bold underline mb-2">Chat</h1>
      <h2 className="semi-bold text-lg mb-2">Your id: {clientId}</h2>
      <p className="text-lg semi-bold mb-2">
        Status:{" "}
        {!status ? (
          <span className="bg-red-200 rounded-lg px-3">Not Connected</span>
        ) : (
          <span className="bg-green-200 rounded-lg px-3">Connected</span>
        )}
      </p>
      <div
        id="chat"
        className="w-[450px] h-[450px] border shadow-md mb-2 bg-slate-100 rounded-sm"
      >
        {messages.map((val, index) => {
          return (
            <span key={index}>
              {val.message !== "connect" && val.message !== "Offline" && (
                <div
                  style={{
                    backgroundColor: `${colors[index % colors.length]}`,
                  }}
                  className={`w-16 h-16 rounded-full inline-flex items-center justify-center border border-blue-400 shadow-lg`}
                >
                  {/* {val.message.charAt(0)} */}
                  <p className="uppercase">{val.message.slice(0, 2)}</p>
                </div>
              )}
            </span>
          );
        })}
      </div>
      <div id="input">
        <input
          type="text"
          placeholder="Enter GT Email..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button id="submit" onClick={sendMessage}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Attendance;
