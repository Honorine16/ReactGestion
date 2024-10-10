import { useState } from "react";

export default function AddMemberForm() {
    const App = () => {
        const [selectedGroup, setSelectedGroup] = useState(null);
        const [memberAdded, setMemberAdded] = useState(false);
    
        const handleSelectGroup = (group) => {
            setSelectedGroup(group);
            setMemberAdded(false); // Reset l'état pour le nouveau groupe sélectionné
        };
    
        const handleMemberAdded = () => {
            setMemberAdded(true); // Met à jour l'état pour indiquer qu'un membre a été ajouté
        };
    
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }}>
                    <GroupList onSelectGroup={handleSelectGroup} />
                </div>
                <div style={{ padding: '20px', flexGrow: 1 }}>
                    {selectedGroup ? (
                        <>
                            <Chat group={selectedGroup} />
                            <AddMember groupId={selectedGroup.id} onMemberAdded={handleMemberAdded} />
                            {memberAdded && <p>Membre ajouté avec succès !</p>}
                        </>
                    ) : (
                        <h2>Veuillez sélectionner un groupe</h2>
                    )}
                </div>
            </div>
        );
    };
    
}