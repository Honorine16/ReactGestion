import React, { useEffect, useState } from 'react';
import './Chat.css';
import axios from "axios"
import { Images } from '../../../JS/images';
import { FaRegArrowAltCircleDown } from 'react-icons/fa';
import { toast } from 'react-toastify';



export default function Chat({ group }) {

    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const userId = localStorage.getItem('userId');
    const groupId = localStorage.getItem('groupId');

    const token = localStorage.getItem("token")
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setFile(event.target.files[0])
        const fromData = new FormData();
        fromData.append("file", file);
        // setIsLoading(true)


        console.log(token);

        const response = await axios.post(`http://127.0.0.1:8000/api/v1.0.0/sendFile/${group?.id}/${userId}/send-file`, fromData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
        );

        if (response.data.success) {
            toast.success(response.data.message)
            // setIsLoading(false)
            setTimeout(function () {
                navigate('/discussion')
            }, 3000)
        } else {
            console.log(response.data);
            toast.error("Choisissez un fichier");
            // setIsLoading(false);
            console.log(console.error('Les données sont insuffisantes'))
        }
        ;

    }


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const groupId = group?.id
                console.log(group?.id);

                const response = await axios.get(`http://127.0.0.1:8000/api/v1.0.0/groups/${group?.id}/files`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                setMessages(response.data.discussion);

                console.log(response.data.discussion);


            } catch (error) {
                console.error('Erreur lors de la récupération des messages', error);
            }
        };

        fetchMessages();


    }, [group]);

    const handleSendFile = async (e) => {
        e.preventDefault();

        const fromData = new FormData();
        fromData.append("file", file);
        setIsLoading(true)

        const token = localStorage.getItem("token")
        console.log(token);

        const response = await axios.post(`http://127.0.0.1:8000/api/v1.0.0/sendFile/{groupId}/{userId}/send-file`, fromData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
        );

        if (response.data.success) {
            toast.success(response.data.message)
            setIsLoading(false)
            setTimeout(function () {
                navigate('/discussion')
            }, 3000)
        } else {
            console.log(response.data);
            toast.error("Erreur lors de l'envoi du message", error);
            setIsLoading(false);
        }
    }


    return (
        <div style={{ flexGrow: 1, backgroundColor: 'white' }}>
            <div style={{ backgroundColor: 'black', color: 'white', height: '70px', alignContent: 'center' }}>
                {console.log(userId)}
                {console.log(groupId)}
                <h2>{group?.name}</h2>
            </div>
            <div style={{ padding: '10px', height: '600px', overflowY: 'scroll' }}>
                {messages.map((message, index) => (
                    <div key={index} >

                        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                <a href={"http://127.0.0.1:8000/storage/" + message.file_path}>
                                    {message.original_name}
                                </a>
                            </span>
                        </button>
                    </div>
                ))}
                <div className='BigContainer'>
                    <img src={Images.DefaultImage} alt="" />
                    {/* <ArrowDownLeftIcon/> */}
                    <FaRegArrowAltCircleDown size={50} />
                </div>

            </div>

            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                            <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                        </svg>
                        <span className="sr-only">Upload image</span>
                    </button>
                    <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                        </svg>
                        <span className="sr-only">Add emoji</span>
                    </button>
                    <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>

                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                        <span className="sr-only">Upload file</span>
                    </button>
                    <textarea id="chat" rows="1" onChange={(e) => setNewMessage(e.target.value)}
                        className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                    >
                        <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                        </svg>
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
            </form>

        </div>



    );
}

