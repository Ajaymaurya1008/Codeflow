import React from "react";

const CreateRoom = () => {
  const [roomId, setRoomId] = useState("");

  return (
    <div>
      <label className="font-medium">Room ID</label>
      <input
        id="roomId"
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        required
        className="w-full bg-[#2D394B] mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
      />
    </div>
  );
};

export default CreateRoom;
