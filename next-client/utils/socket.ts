import io from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connections": true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendURL) {
    throw new Error("BACKEND_URL is not defined in environment variables");
  }

  return io(backendURL, options);
};
