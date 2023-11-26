/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Avatar from "react-avatar";
import { FaRegCopy } from "react-icons/fa6";

const Sidebar = ({ client }) => {

    return (
        <>
            <nav className="fixed top-0 left-0 w-20 h-full bg-slate-800  space-y-8">
                <div className="flex flex-col h-full">
                    <div className="h-20 flex items-center justify-center px-8">
                        <a className="flex-none">
                            <img
                                src="https://floatui.com/logo-letter.png"
                                width={35}
                                className="mx-auto"
                            />
                        </a>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-2">
                        {client.map((item, idx = client.socketID) => {
                            return (
                                <div className="flex flex-col gap-2" key={idx}>
                                    <a
                                        className="relative flex items-center justify-center gap-x-2 text-gray-600 p-2 rounded-lg duration-150 group"
                                    >
                                        <Avatar className="hover:shadow-none hover:border-none"  name={item.username} round={true} size="50px" />
                                    <span className="absolute left-16 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150">
                                        {item.username}
                                    </span>
                                    </a>
                                </div>
                            )
                        })
                        }
                    </div>
                    <div className="mb-4 flex flex-col gap-5 items-center justify-center">
                        <FaRegCopy size={34} onClick={()=>console.log("Clicked")}/>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                            />
                        </svg>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;