import React, {useState, useEffect} from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import List from '../../components/List/List';
import Notifications from "../../components/Notifications/Notifications";

import styles from './pacientSearch.module.css';

const URL = process.env.REACT_APP_URL;
export default function PacientSearch() {

    const token = localStorage.getItem('TokenHealthUnityUFRR');
    const header = ["ID", "Nome", "Visualizar"];
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('');
    const [filterInput, setFilterInput] = useState('');

    const [showNotification, setShowNotification] = useState(false);
    const [typeNotification, setTypeNotification] = useState('error');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        //remove o " no início e no fim de token 
        const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;
        
        async function LoadUsers() {
            await axios.get(`${URL}/pacient/getAllPacientsName`, { headers: {Authorization: AuthStr} })
            .then(res => {
                let tempColumns = [], tempLines = [];
                if(res.data !== undefined){
                    res.data.map(item => {
                        tempColumns.push(item._id);
                        tempColumns.push(item.name);
                        tempColumns.push("Visualizar");
                        tempLines.push(tempColumns);
                        tempColumns = []; 
                    });

                    setItems(tempLines);
                }
            })
            .catch(function (error) {
                setMsg("Não foi possível se conectar ao servidor");
                activateNotification('error');
            })
        }
        LoadUsers();
        
    }, []);

    function activateNotification(type){
        setTypeNotification(type);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    }

    return(
        <div>
            <Navbar title="BUSCAR PACIENTE" /> 
        
            <div style={{display:"flex", alignItems: "center", flexDirection: "column"}}>
                
                <div className={styles.container}>
                    <span>Nome do Paciente:</span>
                    <input type="text" valeu={filterInput} className={styles.nameInput} onChange={e => setFilterInput(e.target.value.toUpperCase())} />
                    <button className={styles.btn} onClick={()=>setFilter(filterInput)}>BUSCAR</button>
                </div>

                <List header={header} items={items} check={false} filter={filter} />
            
            </div>

            <Notifications showNotification={showNotification} typeNotification={typeNotification} msg={msg}/>
        </div>
    );
};