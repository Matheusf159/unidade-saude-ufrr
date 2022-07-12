import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import styles from './register.module.css';

const URL = process.env.REACT_APP_URL;
export default function RegisterUser(){

    const location =  useLocation();
    const token = localStorage.getItem('TokenHealthUnityUFRR');
    const initialState = { 
        id: '', name: '', userName: '', password: '', type: 'Dentist', status: 'approved' 
    };

    const [formData, setFormData] = useState(initialState);
    const [newUser, setNewUser] = useState(true);
    const [changePassword, setChangePassword] = useState(false);

    const history = useNavigate();

    useEffect(() => {
        if(location.state) {
            setFormData(location.state.user);
            setNewUser(false);
        }
        
    }, [location]);

    async function registerUser(e){
        e.preventDefault();
        const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;
        
        if(newUser===true){
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
        else {
            await axios.patch(`${URL}/user/updateUser/${formData.id}`,
                newUser === true || changePassword === true ?
                [
                    {propName: "name", value: formData.name}, {propName: "userName", value: formData.userName},
                    {propName: "password", value: formData.password}, {propName: "type", value: formData.type},
                    {propName: "status", value: formData.status},
                ]
                :
                [
                    {propName: "name", value: formData.name}, {propName: "userName", value: formData.userName},
                    {propName: "type", value: formData.type}, {propName: "status", value: formData.status},
                ],
                {headers: {Authorization: AuthStr}}
            ).then(res => {
                //create ui msg box
                history('/menu');
            })
            .catch(function (error) {
                //create ui msg box
                console.log(error);
            })
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChangePassword = () => {
        setChangePassword(!changePassword);
    }

    return(
        <div>

            <Navbar title={newUser===true?"CADASTRAR USUÁRIO":"ATUALIZAR PACIENTE"} />

            <div  className={styles.wraper}>
                <div className={styles.content}>
                    <form onSubmit={registerUser}> 
                        <div className={styles.firstLine}>
                            <label className="nameLabel">
                                Nome:
                                <input type="text" className={styles.nameInput} required value={formData.name} name="name" onChange={handleChange} />
                            </label>

                            <label className="registryLabel">
                                Nome de Usuário:
                                <input type="text" className={styles.registyInput} required value={formData.userName} name="userName" onChange={handleChange} />
                            </label>
                        </div>

                        <div className={styles.secondLine}>
                            <label className="passwordLabel">
                                Senha:
                                {
                                    changePassword===true || newUser===true
                                    ? <input type="password" className={styles.passwordInput} required value={formData.password} name="password" onChange={handleChange} />
                                    : <input type="password" className={styles.passwordInput} disabled />
                                }
                            </label>
                            
                            <label className="bondLabel">
                                Tipo:
                                <select className={styles.selectBox} name="type" value={formData.type} onChange={handleChange}>
                                    <option value={"adm"}>Administrador</option>
                                    <option value={"Dentista"}>Dentista</option>
                                    <option value={"Enfermeiro(a)"}>Enfermeiro(a)</option>
                                    <option value={"fisioterapeuta"}>fisioterapeuta</option>
                                    <option value={"Médico(a)"}>Médico(a)</option>
                                    <option value={"psicólogo(a)"}>psicólogo(a)</option>
                                </select>
                            </label>
                        </div>

                        <div className={styles.thirdLine}>
                            <label className="passwordLabel" style={{display: newUser===true?"none":""}}>
                                <div className={styles.checkBoxContainer}>
                                    <span>Mudar Senha:</span>
                                    <input className={styles.checkBox} type="checkbox" checked={changePassword} onChange={handleChangePassword} />
                                </div>
                            </label>

                            <label className="bondLabel">
                                Status:
                                <select className={styles.selectBox} name="status" value={formData.status} onChange={handleChange}>
                                    <option value={"approved"}>Aprovado</option>
                                    <option value={"disabled"}>Desabilitado</option>
                                    <option value={"pending"}>Pendente</option>
                                    <option value={"rejected"}>Rejeitado</option>
                                </select>
                            </label>
                        </div>

                        <div className={styles.sixth}>
                            <button className={styles.btn} type="submit">{newUser===true?"CADASTRAR":"ATUALIZAR"}</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}