"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import moment from "moment";

type Props = {};

const distance = (lat1: number, lat2: number, lon1: number, lon2: number) => {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return c * r;
};

const AttendenceID = (props: Props) => {
  const [clientId, setClientId] = useState<number>(
    Math.floor(new Date().getTime() / 1000)
  );
  const [websckt, setWbsckt] = useState<WebSocket>();
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState(false);
  const [sent, setSent] = useState(false);
  const [wasLogged, setWasLogged] = useState(false);
  const [canView, setCanView] = useState(false);
  const [idTeacher, setIdTeacher] = useState<number>();
  let params = usePathname();
  // const url = useSelector((state) => state.websocket.url);
  // console.log("state from redux: ", url);
  // const { query } = router;

  useEffect(() => {
    if (params) {
      const parts = params.split("/");
      if (parts.length > 0) {
        setIdTeacher(parseInt(parts.pop() || ""));
      }
    }
  }, []);

  useEffect(() => {
    if (idTeacher) {
      // Get teacher ID and coord
      const getTeacherIdAndCoord = async () => {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_DEV}/register`
        );

        const { coords, primaryID } = data;
        console.log("teacher: ", coords, primaryID);

        setCanView(true);

        /*
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            // lat, lat, lon, lon
            const res = distance(coords[0], lat, coords[1], lon);
            console.log("distance: ", res);

            if (res < 1) {
              console.log(primaryID, idTeacher);
              console.log(primaryID === idTeacher);
              setCanView(true);
            } else {
              alert(
                `studentID: ${primaryID}, teacherID: ${idTeacher}, distance: ${res}, teacher coordinates: ${coords}, student coordinates: ${lat}, ${lon}`
              );
            }
          });
        } else {
          // If geolocation is off, wait 10 seconds before alerting user to turn it back on again
          setTimeout(() => {
            if ("geolocation" in navigator)
              alert(`Geolocation on?: ${"geolocation" in navigator}`);
            else alert("geolocation on device not giving coordinates...");
          }, 5000);
        }
        */
      };

      getTeacherIdAndCoord();
    }
  }, [idTeacher, navigator]);

  useEffect(() => {
    const [httpVal, urlVal] = process.env.NEXT_PUBLIC_SERVER_DEV
      ? process.env.NEXT_PUBLIC_SERVER_DEV?.split("://")
      : [null, null];
    const url = `${
      httpVal === "http" ? "ws" : "wss"
    }://${urlVal}/ws/${clientId}`;
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
      const sendDataToDb = async () => {
        const { data } = await axios.put(
          `${process.env.NEXT_PUBLIC_SERVER_DEV}/attendance`,
          {
            email: message.toLowerCase(),
            date: moment(new Date()).format(),
            // date: new Date().toISOString(),
          }
        );

        console.log("logged attendence: ", data);

        if (data?.status_code !== 404) {
          setWasLogged(true);
          websckt?.send(message);
          setSent(true);
        } else {
          alert(`The provided email was not found: ${message}`);
        }
      };
      sendDataToDb();

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
      console.log("enter a valid email!");
    }
  };
  return (
    <div className="w-full h-[calc(100%-3.5rem)] flex items-center justify-center">
      <div id="input" className="bg-blue-200 p-5 rounded-lg flex">
        {canView ? (
          <>
            {/* {status ? (
              <>
                
              </>
            ) : (
              "Loading..."
            )} */}

            {sent ? (
              "Thank you! Your attendance was logged!"
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
