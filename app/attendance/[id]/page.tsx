"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const AttendenceID = (props: Props) => {
  const [clientId, setClientId] = useState<number>(
    Math.floor(new Date().getTime() / 1000)
  );
  const [websckt, setWbsckt] = useState<WebSocket>();
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState(false);
  const [sent, setSent] = useState(false);
  // const url = useSelector((state) => state.websocket.url);
  // console.log("state from redux: ", url);
  // const { query } = router;

  useEffect(() => {
    const url = `ws://localhost:8000/ws/${clientId}`;
    console.log("the id: ", clientId);
    if (url != null) {
      const ws = new WebSocket(url);
      if (ws) {
        ws.onopen = (event) => {
          ws.send("connect");
        };

        ws.onmessage = (e) => {
          const message = JSON.parse(e.data);
          if (message.message === "connect") setStatus(true);
          if (message.message === "Offline") setStatus(false);
        };

        setWbsckt(ws);
        return () => ws.close();
      }
    }
  }, []);

  const sendMessage = () => {
    if (message.length !== 0) {
      websckt?.send(message);
      setSent(true);
      // if (websckt) {
      //   // websckt.onmessage = (e) => {
      //   //   const message = JSON.parse(e.data);
      //   //   setMessages([...messages, message]);
      //   // };
      //   // websckt.onmessage = (e) => {
      //   //   const message = JSON.parse(e.data);
      //   //   setMessages([...messages, { message: message, clientId: clientId }]);
      //   // };
      //   // const message = JSON.parse(e.data);
      //   // setMessages([...messages, { message: message, clientId: clientId }]);
      //   // setMessage("");
      // }
    } else {
      console.log("enter a value!");
    }
  };
  return (
    <div className="w-full h-[calc(100%-3.5rem)] flex items-center justify-center">
      <div id="input" className="bg-blue-200 p-5 rounded-lg flex">
        {status ? (
          <>
            {sent ? (
              "Thank you! "
            ) : (
              <>
                <input
                  type="text"
                  className="appearance-none block shadow-lg bg-gray-200 text-gray-700 border rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white mr-2"
                  placeholder="Enter GT Email..."
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <button
                  id="submit"
                  onClick={sendMessage}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </>
            )}
          </>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
};

export default AttendenceID;
