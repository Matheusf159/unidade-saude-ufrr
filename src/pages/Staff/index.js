import React, {useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import List from '../../components/List/List';

import styles from './staff.module.css'

export default function Staff() {

    const header = ["ID", "Nome", "Especialização", "Visualizar"];
    const [items, setItems] = useState([["José", "Pediatra", "Visualizar"], ["Ciclano", "Nutrição", "Visualizar"]]);

    return(
        <div>
            <Navbar title="QUADRO DE FUNCIONARIOS" /> 
        
            <div style={{display:"flex", alignItems: "center", flexDirection: "column"}}>
                
                <div className={styles.container}>
                    <span>Nome do Profissional:</span>
                    <input type="text" className={styles.nameInput} />
                    <button className={styles.btn}>BUSCAR</button>
                </div>

                <List header={header} items={items} check={false} />
            
            </div>
        </div>
    );
};