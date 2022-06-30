import React, {useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import List from '../../components/List/List';

import styles from './pacientSearch.module.css';

export default function PacientSearch() {

    const header = ["ID", "Nome", "Visualizar"];
    const [items, setItems] = useState([["3783hdhs", "José", "Visualizar"], ["38d923d", "Ciclano", "Visualizar"]]);

    return(
        <div>
            <Navbar title="BUSCAR PACIENTE" /> 
        
            <div style={{display:"flex", alignItems: "center", flexDirection: "column"}}>
                
                <div className={styles.container}>
                    <span>Nome do Paciente:</span>
                    <input type="text" className={styles.nameInput} />
                    <button className={styles.btn}>BUSCAR</button>
                </div>

                <List header={header} items={items} check={false} />
            
            </div>
        </div>
    );
};