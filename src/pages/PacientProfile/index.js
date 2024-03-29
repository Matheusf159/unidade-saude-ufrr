import React, {useState, useEffect} from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar'


import { MdAccountCircle } from 'react-icons/md'

import styles from './pacientProfile.module.css'

const URL = process.env.REACT_APP_URL;
export default function PacientProfile() {

    const location =  useLocation();
    const token = localStorage.getItem('TokenHealthUnityUFRR');
    const initialState = { 
        id: '', name: '', sex: '', skinTone: '', birthDate: '', naturalness: '', maritalState: '', 
        profession: '', levelEducation: '', cellPhone: '', address: '', district: '', county: '',
        uf: '', origin: '', namePublicEmploye: '', nameResponsible: ''
    };

    const [locationState, setLocationState] = useState({
        id: ''
    });

    const [pacientData, setPacientData] = useState(initialState);

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
                //console.log(res.data);
                setPacientData(res.data.pacient);
            })
            .catch(function (error) {
                //create ui msg box
                console.log(error);
            })
        }
        if(locationState.id!==''){
            LoadPacient();
        }

    }, [locationState]);

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

                        <div className={styles.right}>
                            <Link to="/signupPatient" state={{pacient:pacientData}}>
                                <button className={styles.button}>EDITAR</button>
                            </Link>
                            <Link to="/schedule" state={{pacient:pacientData}}>
                                <button className={styles.button}>AGENDAR</button>
                            </Link>
                        </div>
                    </div>

                    <div className={styles.data}>
                        <div className={styles.datas}>
                           <p>Data de Nascimento: {pacientData.birthDate} Sexo: {pacientData.sex} Cor: {pacientData.skinTone} Naturalidade: {pacientData.naturalness} Estado Civil: {pacientData.maritalState} </p>
                           <p>Profissão: {pacientData.profession} Escolaridade: {pacientData.levelEducation} Telefone: {pacientData.cellPhone} </p>
                           <p>Endereço: {pacientData.address} bairro: {pacientData.district} Município: {pacientData.county} UF: {pacientData.uf}</p>
                           <p>
                                Origem: {pacientData.origin} 
                                {
                                    pacientData.origin==="Servidor"
                                    ? <span>Nome do servidor: {pacientData.namePublicEmploye}</span>
                                    : pacientData.origin==="Dependente" 
                                    ? <span>Nome do responsável: {pacientData.nameResponsible}</span>
                                    : <></>
                                } 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}