import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import List from '../../components/List/List';

import "./PacientList.css";

export default function PacientList() {
 
    const header = ["ID", "Nome", "Presente"];
    const [items, setItems] = useState([["3783hdhs", "José", false], ["38d923d","Ciclano", false]]);

    function handlePresence(e){
        let newItemsList = [...items];
        newItemsList[e.target.name][2] = e.target.checked;
        
        setItems(newItemsList);
    }

    return(
        <div>
            <Navbar title="LISTA DE PACIENTES" /> 
            
            <div style={{display:"flex", alignItems: "center", flexDirection: "column"}}>
                <div className="container">
                    <span>Médico: Dr fulano</span>
                    <span>Especialização: Pediatra</span>
                </div>
            

                <List header={header} items={items} check={true} filter='' handlePresence={handlePresence}/>
            
            </div>
        </div>
    )
}