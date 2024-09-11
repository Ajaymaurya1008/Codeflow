import { v4 } from 'uuid';

const Register = async ({ searchParams }) => {
  const roomId = searchParams.roomId || '';

  const onAction = async (formData) => {
    'use server'
    const roomId = formData.get("roomId");
    const username = formData.get("username");
    console.log(roomId);
    console.log(username);
    // Process the form data
  }

  const createRoom = async () => {
    'use server'
    const newRoomId = v4();
    return { roomId: newRoomId };
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-5">
        <div className="text-center pb-8">
          <div className="mt-5">
            <h3 className=" text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
          </div>
        </div>
        <form action={onAction} className="space-y-5">
          <div>
            <label className="font-medium">Room ID</label>
            <input
              name="roomId"
              defaultValue={roomId}
              type="text"
              required
              className="w-full bg-[#2D394B] mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Username</label>
            <input
              type="text"
              required
              className="w-full bg-[#2D394B] mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            type="submit"
            // onClick={handleSubmit}
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Join Room
          </button>
        </form>
        <p className="text-center">
          {" "}
          Dont have an invite then{" "}
          <form action={createRoom}>
            <button
              type="submit"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create Room
            </button>
          </form>
        </p>
      </div>
    </main>
  );
};

export default Register;
