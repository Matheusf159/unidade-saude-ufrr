import React, {useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import List from '../../components/List/List';

import styles from './users.module.css'

export default function Users(){

    const header = ["ID", "Nome", "Especialização", "Status"];
    const [items, setItems] = useState([["3783hdhs", "José", "Pediatra", "approved"], ["38d923d", "Ciclano", "Nutrição", "pending"], ["623gydh3", "Beltrano", "Dentista", "admr"]]);

    function handleStatus(e){
        let newItemsList = [...items];
        newItemsList[e.target.name][3] = e.target.value;
        
        setItems(newItemsList);
    }

    return(
        <div>
            <Navbar title="USUÁRIOS" />

            <div style={{display:"flex", alignItems: "center", flexDirection: "column"}}>
                <div className={styles.container}>
                    <span>Nome do Usuário:</span>
                    <input type="text" className={styles.nameInput} />
                    <button className={styles.btn}>BUSCAR</button>
                </div>

                <List header={header} items={items} select={true} handleStatus={handleStatus} />

            </div>

        </div>
    );
};