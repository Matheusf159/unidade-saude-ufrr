import React, {useState, useEffect} from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import List from '../../components/List/List';
import Notifications from "../../components/Notifications/Notifications";
import styles from './users.module.css'

const URL = process.env.REACT_APP_URL;
export default function Users(){

    const token = localStorage.getItem('TokenHealthUnityUFRR');
    const header = ["ID", "Nome", "Tipo", "Visualizar", "Status"];
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
            await axios.get(`${URL}/user/getAllUsers`, { headers: {Authorization: AuthStr} })
            .then(res => {
                let tempColumns = [], tempLines = [];
                if(res.data !== undefined){
                    res.data.map(item => {
                        tempColumns.push(item._id);
                        tempColumns.push(item.name);
                        tempColumns.push(item.type);
                        tempColumns.push("Visualizar.");
                        item.type==="adm"? tempColumns.push("adm"): tempColumns.push(item.status);
                        tempLines.push(tempColumns);
                        tempColumns = []; 
                    });

                    setItems(tempLines);
                }
            })
            .catch(function (error) {
                if(error.response.data!==undefined){
                    setMsg(error.response.data.message);
                }
                else {
                    setMsg("Não foi possível se conectar ao servidor");
                }
            })
        }
        LoadUsers();
        
    }, []);


    async function handleStatus(e){
        //remove o " no início e no fim de token 
        const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;

        let newItemsList = [...items];
        newItemsList[e.target.name][newItemsList[e.target.name].length-1] = e.target.value;

        await axios.patch(`${URL}/user/updateUser/${newItemsList[e.target.name][0]}`, 
            [{propName: "status", value: e.target.value}], {headers: {Authorization: AuthStr}}
        ).then(res => {
            setMsg(res.data.message);
            activateNotification('success');
        })
        .catch(function (error) {
            if(error.response.data!==undefined){
                setMsg(error.response.data.message);
            }
            else {
                setMsg("Não foi possível se conectar ao servidor");
            }
        })
        
        setItems(newItemsList);
    }

    function activateNotification(type){
        setTypeNotification(type);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    }

    return( 
        <div>
            <Navbar title="USUÁRIOS" />

            <div style={{display:"flex", alignItems: "center", flexDirection: "column"}}>
                <div className={styles.container}>
                    <span>Nome do Usuário:</span>
                    <input type="text" valeu={filterInput} className={styles.nameInput} onChange={e => setFilterInput(e.target.value.toUpperCase())} />
                    <button className={styles.btn} onClick={()=>setFilter(filterInput)}>BUSCAR</button>
                </div>

                <List header={header} items={items} select={true} handleStatus={handleStatus} filter={filter}/>

            </div>
            
            <Notifications showNotification={showNotification} typeNotification={typeNotification} msg={msg}/>
        </div>
    );
};