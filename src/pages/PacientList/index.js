import React, {useState, useEffect} from "react";
import axios from "axios";
import decode from 'jwt-decode';
import Navbar from '../../components/Navbar/Navbar';
import List from '../../components/List/List';
import Notifications from "../../components/Notifications/Notifications";
import "./PacientList.css";

const URL = process.env.REACT_APP_URL;
export default function PacientList() {
    
    const token = localStorage.getItem('TokenHealthUnityUFRR');
    const decodedToken = decode(token);
    const header = decodedToken.type === "adm"?["ID", "Nome", "Profissional responsável", "horário", "Presente"]: ["ID", "Nome", "horário", "Presente"];
    const [items, setItems] = useState([]);

    let currentDate = new Date();

    const [showNotification, setShowNotification] = useState(false);
    const [typeNotification, setTypeNotification] = useState('error');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        //remove o " no início e no fim de token 
        const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;
        
        async function LoadPacients() {
            await axios.post(`${URL}/schedule/getAllSchedulesDay/${decodedToken.id}`, 
                {
                    currentDate: `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`
                }, 
                { headers: {Authorization: AuthStr} }
            ).then(res => {
                let tempColumns = [], tempLines = []; 
                if(res.data !== undefined){
                    res.data.map(item => {
                        tempColumns.push(item._id);
                        tempColumns.push(item.pacientId.name);
                        if(decodedToken.type === "adm") tempColumns.push(item.userId.name);
                        tempColumns.push(item.time);
                        tempColumns.push(item.present);
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
        LoadPacients();
        
    }, []);

    async function handlePresence(e){
        //remove o " no início e no fim de token 
        const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;

        let newItemsList = [...items];
        newItemsList[e.target.name][newItemsList[e.target.name].length-1] = e.target.checked;

        await axios.patch(`${URL}/schedule/updateSchedule/${newItemsList[e.target.name][0]}`, 
            [{propName: "present", value: e.target.checked}], {headers: {Authorization: AuthStr}}
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
        }, 2000);
    }

    return(
        <div>
            <Navbar title="LISTA DE PACIENTES" /> 
            
            <div style={{display:"flex", alignItems: "center", flexDirection: "column"}}>
                <div className="container">
                    <span>Profissional: {decodedToken.name}</span>
                    <span>Especialização: {decodedToken.type}</span>
                </div>
            

                <List header={header} items={items} check={true} filter='' handlePresence={handlePresence}/>
            
            </div>

            <Notifications showNotification={showNotification} typeNotification={typeNotification} msg={msg}/>
        </div>
    ) 
}