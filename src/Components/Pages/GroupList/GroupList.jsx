import { Select } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function GroupList() {

    const [groups, setGroups] = useState();
    const [loading, setLoading] = useState(true);


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

    if (loading) {
        return <div>Chargement des groupes...</div>;
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nom du groupe
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Admin
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description du groupe
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {groups && groups.map((group) => (
                                <li key={group.id} onClick={() => groupClick(group)} >
                                    {group.name}
                                </li>
                            ))}

                            {/* <div style={{ width: '300px', margin: '20px' }}>
                                <h2>Sélectionnez un groupe</h2>

                            </div> */}
                        </th>
                        <td className="px-6 py-4">
                            Silver
                        </td>
                        <td className="px-6 py-4">
                            Laptop
                        </td>

                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}