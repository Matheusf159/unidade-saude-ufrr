import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import styles from './register.module.css';

const URL = process.env.REACT_APP_URL;
export default function RegisterUser(){

    const token = localStorage.getItem('TokenHealthUnityUFRR');
    const initialState = { 
        name: '', userName: '', password: '', type: 'Dentist', status: 'approved'
    };

    const [formData, setFormData] = useState(initialState);

    const history = useNavigate();

    async function registerUser(e){
        e.preventDefault();
        const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;
        
        await axios.post(`${URL}/user/createUserByAdm`, 
            {
                name: formData.name, userName: formData.userName, password: formData.password, type: formData.type, status: formData.status
            },
            { headers: {Authorization: AuthStr} }
        ).then(res => {
            //create ui msg box
            history('/menu'); 
        })
		.catch(function (error) {
            //create ui msg box
			console.log(error);
		})
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return(
        <div>

            <Navbar title="CADASTRAR USUÁRIO" />

            <div  className={styles.wraper}>
                <div className={styles.content}>
                    <form onSubmit={registerUser}> 
                        <div className={styles.firstLine}>
                            <label className="nameLabel">
                                Nome:
                                <input type="text" className={styles.nameInput} required name="name" onChange={handleChange} />
                            </label>

                            <label className="registryLabel">
                                Nome de Usuário:
                                <input type="text" className={styles.registyInput} required name="userName" onChange={handleChange} />
                            </label>
                        </div>

                        <div className={styles.secondLine}>
                            <label className="passwordLabel">
                                Senha:
                                <input type="password" className={styles.passwordInput} required name="password" onChange={handleChange} />
                            </label>
                            
                            <label className="bondLabel">
                                tipo:
                                <select className={styles.selectBox} name="type" value={formData.type} onChange={handleChange}>
                                    <option value={"adm"}>Administrador</option>
                                    <option value={"Dentist"}>Dentista</option>
                                    <option value={"Nurse"}>Enfermeiro(a)</option>
                                    <option value={"physiotherapist"}>fisioterapeuta</option>
                                    <option value={"Doctor"}>Médico(a)</option>
                                    <option value={"psychologist"}>psicólogo(a)</option>
                                </select>
                            </label>
                        </div>

                        <div className={styles.sixth}>
                            <button className={styles.btn} type="submit">Cadastar</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}