import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";

export default function AddMember() {
    const [emails, setEmails] = useState("");
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState([]);

    const [isLoading, setIsLoading] = useState("");
    const [options, setOptions] = useState([]);
    const [selectOptions, setSelectOptions] = useState([]);

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();

        const fromData = new FormData();
        fromData.append("emails", emails);
        // fromData.append("description", description);
        setIsLoading(true)

        const token = localStorage.getItem("token")
        console.log(token);

        const response = await axios.post('http://127.0.0.1:8000/api/v1.0.0/groups/{groupId}/users', fromData,
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
                navigate('/dashboard')
            }, 3000)
        } else {
            console.log(response.data);
            toast.error("email du membre est important");
            setIsLoading(false);
        }
    };

    const fetchGroups = async (e) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/v1.0.0/groups', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data);
            
            setGroups(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchGroups()
    }, []);

    const handleSelectGroup = (e) => {
        setSelectedGroup(e.target.value)
    }


    return (

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Ajout de membres
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="name"
                                required
                                autoComplete="name"
                                placeholder="Veuillez entrer le nom du membre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            

                        </div>
                        <div className="mt-2">
                            <input
                                id="emails"
                                name="emails"
                                type="email"
                                required
                                autoComplete="emails"
                                placeholder="Veuillez entrer l'email du membre"
                                value={emails}
                                onChange={(e) => setEmails(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        

                        <form className="max-w-sm mx-auto">
                            <br />
                            <select id="groups" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)}
                            >
                                <option value="groupId">Sélectionner un groupe</option>
                                {groups.map((group) => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>
                        </form>

                    </div>

                    <div>
                        {/* <Button type='submit'
                            onClick={handleSubmit}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            text={'Créer le groupe'}
                        /> */}
                        <button type="submit" onClick={handleSubmit} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Ajouter
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )


   };
