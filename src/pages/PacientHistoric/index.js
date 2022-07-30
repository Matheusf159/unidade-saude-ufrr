import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from '../../components/Navbar/Navbar';
import List from '../../components/List/List';
import Notifications from "../../components/Notifications/Notifications";
import "./PacientHistoric.css";

const URL = process.env.REACT_APP_URL;
export default function PacientHistoric() {
    
    const location =  useLocation();
    const token = localStorage.getItem('TokenHealthUnityUFRR');
    const header = ["ID", "Profissional responsável", "Data", "Horário"];
    const [items, setItems] = useState([]);
    const [pacientData, setPacientData] =  useState({id: '', name: ''});

    const [showNotification, setShowNotification] = useState(false);
    const [typeNotification, setTypeNotification] = useState('error');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        //remove o " no início e no fim de token 
        const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;
        
        async function LoadPacient(pacientId) {
            await axios.post(`${URL}/schedule/getAllPacientSchedules/${pacientId}`,  
                { headers: {Authorization: AuthStr} }
            ).then(res => {
                let tempColumns = [], tempLines = []; 
                if(res.data !== undefined){
                    res.data.map(item => {
                        tempColumns.push(item._id);
                        tempColumns.push(item.userId.name);
                        tempColumns.push(item.scheduleDate.substr(8,2)+"/"+item.scheduleDate.substr(5,2)+"/"+item.scheduleDate.substr(0,4));
                        tempColumns.push(item.time);
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

        if(location.state) {
            setPacientData({name: location.state.pacient.name})
            LoadPacient(location.state.pacient.id);
        }
        
    }, []);

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
                    <span>Paciente: {pacientData.name}</span>
                </div>
            

                <List header={header} items={items} check={false} filter=''/>
            
            </div>

            <Notifications showNotification={showNotification} typeNotification={typeNotification} msg={msg}/>
        </div>
    ) 
}