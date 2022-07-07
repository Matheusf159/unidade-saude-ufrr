import React, {useState, useEffect} from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import List from '../../components/List/List';

import styles from './users.module.css'

const URL = process.env.REACT_APP_URL;
export default function Users(){

    const token = localStorage.getItem('TokenHealthUnityUFRR');
    const header = ["ID", "Nome", "Tipo", "Status"];
    const [items, setItems] = useState([["3783hdhs", "José", "Pediatra", "approved"], ["38d923d", "Ciclano", "Nutrição", "pending"], ["623gydh3", "Beltrano", "Dentista", "admr"]]);

    useEffect(() => {
        //remove o " no início e no fim de token 
        const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;
        
        async function LoadUsers() {
            await axios.get(`${URL}/user/getAllUsers`, { headers: {Authorization: AuthStr} })
            .then(res => {
                let tempColumns = [], tempLines = [];
                if(res.data !== undefined){
                    res.data.map(item => {
                        tempColumns.push(item._id);
                        tempColumns.push(item.name);
                        tempColumns.push(item.type);
                        tempColumns.push(item.status);
                        tempLines.push(tempColumns);
                        tempColumns = [];
                    });
                    setItems(tempLines)
                }
            })
            .catch(function (error) {
                //create ui msg box
                console.log(error);
            })
        }
        LoadUsers();
        
    }, []);

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