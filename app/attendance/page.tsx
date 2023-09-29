"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { addWebsocket } from "../redux/websocketSlice";
import { useDispatch } from "react-redux";
import { ExportToCsv } from "export-to-csv";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

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

type Message = {
  message: string;
  clientId: string;
};

const Attendance = (props: Props) => {
  const [clientId, setClientId] = useState<number>(
    Math.floor(new Date().getTime() / 1000)
  );
  const [websckt, setWbsckt] = useState<WebSocket>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [status, setStatus] = useState(false);
  // const dispatch = useDispatch();

  const { data: session, status: sessionStatus } = useSession();

  if (sessionStatus == "unauthenticated") {
    return redirect("/login");
  }
  // Update server with session id and lat/lon
  useEffect(() => {
    if ("geolocation" in navigator) {
      let lat: number;
      let lon: number;
      navigator.geolocation.getCurrentPosition(function (position) {
        // console.log("Latitude is :", position.coords.latitude);
        // console.log("Longitude is :", position.coords.longitude);
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        console.log({
          id: clientId,
          coords: [parseFloat(lat?.toFixed(2)), parseFloat(lon?.toFixed(2))],
        });

        const syncWithDb = async () => {
          await axios.put(`${process.env.NEXT_PUBLIC_SERVER_DEV}/register`, {
            id: clientId,
            coords: [lat, lon],
          });
        };
        syncWithDb();
      });
    } else {
      console.log("Not Available");
    }
  }, []);

  if (websckt) {
    const ws = websckt;
    ws.onmessage = (e) => {
      // const message = JSON.parse(e.data);
      // setMessages([...messages, message]);
      const message = JSON.parse(e.data);
      setMessages([
        ...messages,
        { message: message.message, clientId: message.clientId },
      ]);

      if (message.message === "connect" && message["client_id"] === clientId)
        setStatus(true);
      if (message.message === "Offline" && message["client_id"] === clientId)
        setStatus(false);
    };
  }
  //
  useEffect(() => {
    // const url = "ws://localhost:8000/ws/" + clientId;
    // const url = `ws://localhost:8000/ws/${clientId}`;
    const [httpVal, urlVal] = process.env.NEXT_PUBLIC_SERVER_DEV
      ? process.env.NEXT_PUBLIC_SERVER_DEV?.split("://")
      : [null, null];
    const url = `${
      httpVal === "http" ? "ws" : "wss"
    }://${urlVal}/ws/${clientId}`;
    // dispatch(addWebsocket({ url: url }));
    const ws = new WebSocket(url);

    ws.onopen = (event) => {
      ws.send("connect");
    };

    // ws.onmessage = (e) => {
    //   // const message = JSON.parse(e.data);
    //   // setMessages([...messages, message]);
    //   const message = JSON.parse(e.data);
    //   setMessages([
    //     ...messages,
    //     { message: message.message, clientId: message.clientId },
    //   ]);

    //   if (message.message === "connect") setStatus(true);
    //   if (message.message === "Offline") setStatus(false);
    // };

    setWbsckt(ws);
    return () => ws.close();
  }, []);

  const handleCloseSession = () => {
    const closeSession = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_SERVER_DEV}/close_attendance`);
    };
    closeSession();
  };
  return (
    <div className="h-[calc(100%-3.5rem)] flex items-center justify-evenly">
      {/* QR Code */}
      <div>
        <Link
          href={`${process.env.NEXT_PUBLIC_URL}/attendance/${clientId}`}
          target="_blank"
        >
          <QRCode
            value={`${process.env.NEXT_PUBLIC_URL}/attendance/${clientId}`}
            size={450}
          />
        </Link>
      </div>

      {/* Attendance viewer */}
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold underline mb-2">Attendance</h1>
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
        <div>
          <Link href={"/students"}>
            <button
              onClick={handleCloseSession}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Close Session
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
