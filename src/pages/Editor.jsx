/* eslint-disable no-unused-vars */
import { ACTIONS } from "../Actions.js";
import { initSocket } from "../socket.js";
import Code from "../components/Code";
import Sidebar from "../components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Editor = () => {
  const [client, setClient] = useState();

  const socketRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const codeRef = useRef();
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
          console.log(location.state.username);
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room`);
            console.log(username);
          }
          setClient(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} left the room.`);
        }
        setClient((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, []);

  return (
    <div className="flex">
      <div className="">
        <Sidebar client={client || []} />
      </div>
      <div className="grow">
        <Code
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
