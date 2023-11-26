/* eslint-disable no-unused-vars */
import Code from "../components/Code"
import Sidebar from "../components/Sidebar"
import { useState } from "react"

const Editor = () => {

    const [client,setClient] = useState([
        {socketID:1,username:"Ajay Maurya"},
        {socketID:2,username:"Ram Maurya"}
    ])

    return (
        <div className="flex justify-between">
            <div>
                <Sidebar client={client} />
            </div>
            <div className="md:w-[95%]">
                <Code/>
            </div>
        </div>
    )
}

export default Editor