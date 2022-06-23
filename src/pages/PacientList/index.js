import React, { useState } from 'react';
import Header from '../../components/Header';
import List from '../../components/List/List';

import "./PacientList.css";

export default function PacientList() {

    const header = ["ID", "Nome", "Presente"];
    const [items, setItems] = useState([[1, "José", false], [2, "Ciclano", false]]);

    function handlePresence(e){
        console.log(e.target.checked);
        console.log(e.target.name);
    }

    return(
        <div>
            <Header title="LISTA DE PACIENTES" /> 
            
                <div className="container">
                    <span>Médico: Dr fulano</span>
                    <span>Especialização: Pediatra</span>
                </div>
            

                <List header={header} items={items} check={true} handlePresence={handlePresence}/>
            
        </div>
    )
}