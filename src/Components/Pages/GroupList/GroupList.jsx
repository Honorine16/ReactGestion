import { useEffect, useState } from "react";
import axios from 'axios'

export default function ListGroup({ setSelectedGroup }) {


    const [groups, setGroups] = useState();

    const [loading, setLoading] = useState(true);

    const fetchGroups = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/v1.0.0/groups', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGroups(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchGroups()
    }, []);

    if (loading) {
        return <div>Chargement des groupes...</div>;
    }

    const groupClick = (group) => {
        setSelectedGroup(group)
        

    }


    return (
        <div style={{ textAlign: 'center', alignContent: 'center', justifyContent: 'center', alignContent: 'center' }}>

            <h3 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Liste des Groupes</h3>

            <div style={{ width: '200px', padding: '10px', alignContent: 'center' }}>

                <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    <ul>
                        {groups && groups.map((group) => (
                            <li key={group.id} onClick={() => groupClick(group)} >
                                {group.name}
                            </li>
                        ))}
                    </ul>

                </button>
            </div>
        </div>
    );

}