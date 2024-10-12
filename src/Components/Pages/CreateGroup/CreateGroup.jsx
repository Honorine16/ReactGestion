import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";

export default function CreateGroup() {
    const [name, setName] = useState("");
    const [description_group, set_description_group] = useState("");
    const [isLoading, setIsLoading] = useState("");

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
     
        const fromData = new FormData();
        fromData.append("name", name);
        fromData.append("description_group", description_group);
        setIsLoading(true)

        const token = localStorage.getItem("token")
        console.log(token);
        
        const response = await axios.post('http://127.0.0.1:8000/api/v1.0.0/create', fromData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
            
                  }
            }
             );

        if (response.data.success) {
            toast.success(response.data.message)
            setIsLoading(false)
            setTimeout(function () {
                navigate('/groupList')
            }, 3000)
        } else {
            console.log(response.data);
            toast.error("nom du groupe est important");
            setIsLoading(false);
        }
    }


    return (

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Création d'un groupe</h2>
                    <div>
                        {/* <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Nom du groupe
                        </label> */}
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="name"
                                required
                                autoComplete="name"
                                placeholder="Saisir le nom du groupe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            {/* <label htmlFor="description_group" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label> */}

                        </div>
                        <div className="mt-2">
                            <textarea
                                id="description_group"
                                name="description_group"
                                type="description_group"
                                required
                                autoComplete="description_group"
                                value={description_group}
                                placeholder="Bref description"
                                onChange={(e) => set_description_group(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            ></textarea>
                        </div>
                    </div>

                    <div>
                       
                        <button type="submit"  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Créer un groupe
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
};
