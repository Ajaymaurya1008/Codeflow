/* eslint-disable no-unused-vars */
import { ACTIONS } from "../Actions.js";
import { initSocket } from "../socket.js";
import Code from "../components/Code";
import Sidebar from "../components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Editor = () => {
  const [client, setClient] = useState([
    { socketID: 1, username: "Ajay Maurya" },
    { socketID: 2, username: "Ram Maurya" },
  ]);

  const socketRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { roomId } = useParams();

  useEffect(() => {
    const handleErrors = (e) => {
      console.log("socket error", e);
      toast.error("Socket connection failed, try again later");
      reactNavigator("/");
    };

    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room`);
            console.log(username);
          }
          setClient(clients);
        }
      );

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketID, username }) => {
        toast.success(`${username} left the room `);
        setClient((prev) => {
          return prev.filter((client) => client.socketID !== socketID);
        });
      });
    };
    init();

    // return () => {
    //   socketRef.current.disconnect();
    //   socketRef.current.off(ACTIONS.JOINED); // Remove listener for JOINED event
    //   socketRef.current.off(ACTIONS.DISCONNECTED); // Remove listener for DISCONNECTED event
    // };

  }, []);

  return (
    <div className="flex">
      <div className="">
        <Sidebar client={client} />
      </div>
      <div className="grow">
        <Code />
      </div>
    </div>
  );
};

export default Editor;
