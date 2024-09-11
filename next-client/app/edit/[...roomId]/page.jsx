'use client';
import { ACTIONS } from "../../../utils/actions.ts";
import { initSocket } from "../../../utils/socket.ts";
import Code from "../../../components/Code.jsx";
import Sidebar from "../../../components/Sidebar.jsx";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams,useParams } from "next/navigation";

const Editor = () => {
  const [client, setClient] = useState();
  const router = useRouter();
  const socketRef = useRef(null);
  const codeRef = useRef();
  const searchParams = useSearchParams();
  const params = useParams();
  const roomId = params.roomId[0];
  console.log("roomId",roomId)
  // const fetchedUsername = searchParams.get("username")

  useEffect(() => {
    const handleErrors = (e) => {
      console.log("socket error", e);
      toast.error("Socket connection failed, try again later");
      router.push("/");
    };

    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      const cleanRoomId = roomId.toString().trim();

      socketRef.current.emit(ACTIONS.JOIN, {
        cleanRoomId,
        username: searchParams.get("username"),
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          // console.log(location.state.username);
          if (username !== searchParams.get("username")) {
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

      socketRef.current.on("forceDisconnect", (message) => {
        // alert(message); // Or handle more gracefully
        // Optionally, disconnect the client-side socket
        socketRef.current.disconnect();
      });

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        if (username !== searchParams.get("username")) {
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
        <Sidebar client={client || []} roomId={roomId} />
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
