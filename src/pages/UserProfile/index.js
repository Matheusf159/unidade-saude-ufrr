import React, {useState, useEffect} from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar'


import { MdAccountCircle } from 'react-icons/md'

import styles from './userProfile.module.css'

const URL = process.env.REACT_APP_URL;
export default function UserProfile() {

    const location =  useLocation();
    const token = localStorage.getItem('TokenHealthUnityUFRR');
    const initialState = { 
        id: '', name: '', userName: '', type: '', status: '',
        profileImage: '', createdAt: '' 
    };

    const [locationState, setLocationState] = useState({
        id: ''
    });

    const [userData, setUserData] = useState(initialState);

    useEffect(() => {
        if(location.state) {
            setLocationState(location.state);
        }
        
    }, [location]);

    useEffect(() => {
        //remove o " no início e no fim de token 
        const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;

        async function LoadPacient() { 
            await axios.post(`${URL}/user/consultUser/${locationState.id}`, {}, { headers: {Authorization: AuthStr} })
            .then(res => {
                //console.log(res.data);
                setUserData(res.data);
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
                                <p style={{fontWeight: "bold", fontSize: 18}}>{userData.name}</p>
                                <p style={{marginTop: -20, fontWeight: "lighter" }}>Nome de Usuário: {userData.userName}</p>
                            </div>
                        </div>
                        
                        <div className={styles.right}>
                            <Link to="/registerUser" state={{user: userData}}>
                                <button className={styles.button}>EDITAR</button>
                            </Link>
                        </div>
                    </div>

                    <div className={styles.data}>
                        <div className={styles.datas}>
                           <p>Tipo: {userData.type} Status: {userData.type==="adm"? "Administrador" : userData.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}