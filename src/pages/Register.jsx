/* eslint-disable react/no-unknown-property */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

const Register = () => {

    const [user,setUser] = useState({
        username:"",
        roomid:""
    })

    const handleChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user)
        setUser({username:"",roomid:""})
        toast.success(" Joined Successfully.")
    }

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full space-y-5">
                <div className="text-center pb-8">
                    {/* <img src="https://floatui.com/logo.svg" width={150} className="mx-auto" /> */}
                    <div className="mt-5">
                        <h3 className=" text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                    </div>
                </div>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-5"
                >
                    <div>
                        <label className="font-medium">
                            Username 
                        </label>
                        <input
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            type="text" 
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            Room ID
                        </label>
                        <input
                            name="roomid"
                            value={user.roomid}
                            onChange={handleChange}
                            type="text"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Join Room
                    </button>
                </form>
                <p className="text-center"> Dont have an invite then create  <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">Join Room</Link></p>
            </div>
        </main>
    )
}

export default Register