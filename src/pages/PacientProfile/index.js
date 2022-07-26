import React, {useState, useEffect} from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar'
import Notifications from "../../components/Notifications/Notifications";
import decode from 'jwt-decode';

import { MdAccountCircle } from 'react-icons/md'

import styles from './pacientProfile.module.css'

const URL = process.env.REACT_APP_URL;
export default function PacientProfile() {

    const location =  useLocation();
    const token = localStorage.getItem('TokenHealthUnityUFRR');
    const decodedToken = decode(token);
    const initialState = { 
        id: '', name: '', sex: '', skinTone: '', birthDate: '', naturalness: '', maritalState: '', 
        profession: '', levelEducation: '', phone1: '', phone2: '', whatsApp: '', address: '',
        district: '', county: '', uf: '', origin: '', namePublicEmploye: '', nameResponsible: ''
    };

    const [locationState, setLocationState] = useState({
        id: ''
    });

    const [pacientData, setPacientData] = useState(initialState);

    const [showNotification, setShowNotification] = useState(false);
    const [typeNotification, setTypeNotification] = useState('error');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if(location.state) {
            setLocationState(location.state);
        }
        
    }, [location]);

    useEffect(() => {
        //remove o " no início e no fim de token 
        const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;
        
        async function LoadPacient() {
            await axios.post(`${URL}/pacient/consultPacient/${locationState.id}`, {}, { headers: {Authorization: AuthStr} })
            .then(res => {
                setPacientData(res.data.pacient);
            })
            .catch(function (error) {
                setMsg("Não foi possível se conectar ao servidor");
                activateNotification('error');
            })
        }
        if(locationState.id!==''){
            LoadPacient();
        }

    }, [locationState]);

    function activateNotification(type){
        setTypeNotification(type);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    }

    return (
        <div>
 
            <Navbar title="PERFIL" />

            <div  className={styles.wraper}>
                <div className={styles.content}>
                    <div className={styles.head}>
                        <div className={styles.left}>
                            <MdAccountCircle size={70} color="2A3F54" />
                            
                            <div className={styles.nameRegisty}>
                                <p style={{fontWeight: "bold", fontSize: 18}}>{pacientData.name}</p>
                                
                            </div>
                        </div>

                        {decodedToken.type=== "adm"
                            ?
                            <div className={styles.right}>
                                <Link to="/signupPatient" state={{pacient:pacientData}}>
                                    <button className={styles.button}>EDITAR</button>
                                </Link>
                                <Link to="/schedule" state={{pacient:pacientData}}>
                                    <button className={styles.button}>AGENDAR</button>
                                </Link>
                            </div>
                            :
                            <div className={styles.right}>
                                <button className={styles.buttonOff} disabled></button>
                                <button className={styles.buttonOff} disabled></button>
                            </div>
                        }
                    </div>

                    <div className={styles.data}>
                        <div className={styles.datas}>
                           <p>
                                <strong>Data de Nascimento:</strong> {pacientData.birthDate} <strong>Sexo:</strong> {pacientData.sex} <strong>Cor:</strong> {pacientData.skinTone} <strong>Naturalidade:</strong> {pacientData.naturalness} <strong>Estado Civil:</strong> {pacientData.maritalState}
                            </p>

                            <p>
                                <strong>Profissão:</strong> {pacientData.profession} <strong>Escolaridade:</strong> {pacientData.levelEducation} 
                            </p>

                            <p>
                                <strong>Telefone 1:</strong> {pacientData.phone1} <strong>Telefone 2:</strong> {pacientData.phone2} <strong>WhatsApp:</strong> {pacientData.whatsApp}
                            </p>

                            <p>
                                <strong>Endereço:</strong> {pacientData.address} <strong>bairro:</strong> {pacientData.district} <strong>Município:</strong> {pacientData.county} <strong>UF:</strong> {pacientData.uf}
                            </p>

                            <p>
                                <strong>Origem:</strong> {pacientData.origin} 
                                {
                                    pacientData.origin==="Servidor"
                                    ? <span style={{marginLeft: 12}}><strong>Nome do servidor:</strong> {pacientData.namePublicEmploye}</span>
                                    : pacientData.origin==="Dependente" 
                                    ? <span>Nome do responsável: {pacientData.nameResponsible}</span>
                                    : <></>
                                } 
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Notifications showNotification={showNotification} typeNotification={typeNotification} msg={msg}/>
        </div>
    )
}