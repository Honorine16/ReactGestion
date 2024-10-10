import { useEffect, useState } from "react";
import axios from 'axios';
import Chat from "../Chat/Chat";
import ListGroup from "../ListGroup/ListGroup";

 
    export default function Discussion() {
        const [groups, setGroups] = useState([]); 
        const [selectedGroup, setSelectedGroup] = useState (null); 
        // const token = localStorage.getItem("token")
      
        // useEffect(() => {
        //   const fetchGroups = async () => {
        //     try {
        //       const response = await axios.get('http://127.0.0.1:8000/api/v1.0.0/groups',
        //         {
        //           headers: {
        //             Authorization: `Bearer ${token}`,
            
        //           }
        //         }
        //       ); 
        //       setGroups(response.data); 
        //     } catch (error) {
        //       console.error('Erreur lors de la récupération des groupes', error);
        //     }
        //   };
      
        //   fetchGroups(); 
        // }, []);

        
      
        return (
          <div style={{ display: 'flex' }}>
            <ListGroup setSelectedGroup={setSelectedGroup} />
            <Chat group={selectedGroup} />
          </div>
        );
      };
