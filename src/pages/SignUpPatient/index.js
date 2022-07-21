import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Notifications from "../../components/Notifications/Notifications";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

import styles from './signup.module.css'

const URL = process.env.REACT_APP_URL;
export default function SignUpPatient() {

    const location =  useLocation();
    const token = localStorage.getItem('TokenHealthUnityUFRR');
    const initialState = { 
        name: '', sex: 'Masculino', skinTone: 'Amarelo', birthDate: '', naturalness: '', maritalState: 'Solteiro', 
        profession: '', levelEducation: '', cellPhone: '', address: '', district: '', county: '',
        uf: '', origin: 'Servidor', namePublicEmploye: '', nameResponsible: ''
    };
    const [formData, setFormData] = useState(initialState);
    const [newPacient, setNewPacient] = useState(true);

    const history = useNavigate();

    const [showNotification, setShowNotification] = useState(false);
    const [typeNotification, setTypeNotification] = useState('error');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if(location.state) {
            setFormData(location.state.pacient);
            setNewPacient(false);
        }
        
    }, [location]);

    async function registerPacient(e){
        e.preventDefault();
        
        const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;

        if(newPacient===true){
            await axios.post(`${URL}/pacient/createPacient`, 
                {
                    name: formData.name, sex: formData.sex, skinTone: formData.skinTone, birthDate: formData.birthDate,
                    naturalness: formData.naturalness, maritalState: formData.maritalState, profession: formData.profession,
                    levelEducation: formData.levelEducation, cellPhone: formData.cellPhone, address: formData.address, 
                    district: formData.district, county: formData.county, uf: formData.uf, origin: formData.origin, 
                    namePublicEmploye: formData.namePublicEmploye, nameResponsible: formData.nameResponsible
                },
                { headers: {Authorization: AuthStr} }
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
        }
        else {
            await axios.patch(`${URL}/pacient/updatePacient/${formData._id}`, 
                [
                    {propName: "name", value: formData.name}, {propName: "sex", value: formData.sex},
                    {propName: "skinTone", value: formData.skinTone}, {propName: "birthDate", value: formData.birthDate},
                    {propName: "naturalness", value: formData.naturalness}, {propName: "maritalState", value: formData.maritalState},
                    {propName: "profession", value: formData.profession}, {propName: "levelEducation", value: formData.levelEducation},
                    {propName: "cellPhone", value: formData.cellPhone}, {propName: "address", value: formData.address},
                    {propName: "district", value: formData.district}, {propName: "county", value: formData.county},
                    {propName: "uf", value: formData.uf}, {propName: "origin", value: formData.origin},
                    {propName: "namePublicEmploye", value: formData.namePublicEmploye}, {propName: "nameResponsible", value: formData.nameResponsible},
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

    function activateNotification(type){
        setTypeNotification(type);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
            if(type==='success'){
                history('/menu'); 
            }
        }, 2000);
    }

    return (
        <div>
            <Navbar title={newPacient===true?"CADASTRO":"ATUALIZAR"} />

            <div  className={styles.wraper}>
                <div className={styles.content}>
                    <form onSubmit={registerPacient}>
                        <div className={styles.firstLine}>
                            <label className="nameLabel">
                                Nome: *
                                <input type="text" className={styles.nameInput} required value={formData.name} name="name" onChange={handleChange} />
                            </label>
                            
                            <label className="sexLabel">
                                Sexo: *
                                <select className={styles.sexSelect} name="sex" required value={formData.sex} onChange={handleChange}>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="undefined">Prefiro não dizer</option>
                                </select>
                                
                            </label>

                            <label className="colorLabel">
                                Cor: *
                                <select className={styles.sexSelect} name="skinTone" value={formData.skinTone} onChange={handleChange} >
                                    <option value="Amarelo">Amarelo</option>
                                    <option value="Branco">Branco</option>
                                    <option value="Indigena">Indígena</option>
                                    <option value="Pardo">Pardo</option>
                                    <option value="Preto">Preto</option>
                                </select>
                            </label>
                        </div>

                        <div className={styles.secondLine}>
                            <label className="birthDateLabel">
                                Data de nascimento: *
                                <input type="text" className={styles.birthDateInput} required value={formData.birthDate} name="birthDate" onChange={handleChange} />
                            </label>
                            
                            <label className="naturalnessLabel">
                                Naturalidade: *
                                <input type="text" className={styles.naturalnessInput} required value={formData.naturalness} name="naturalness" onChange={handleChange} />
                            </label>

                            <label className="maritalStatusLabel">
                                Estado Civil: *
                                <select className={styles.sexSelect} name="maritalState" value={formData.maritalState} onChange={handleChange} >
                                    <option value="Solteiro">Solteiro</option>
                                    <option value="Casado">Casado</option>
                                    <option value="Viuvo">Viúvo</option>
                                    <option value="Separado">Separado</option>
                                    <option value="Divorciado">Divorciado</option>
                                    <option value="UniaoEstavel">União Estável</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </label>
                        </div>

                        <div className={styles.thirdLine}>
                            <label className="professionLabel">
                                Profissão: *
                                <input type="text" className={styles.professionInput} required value={formData.profession} name="profession" onChange={handleChange} />
                            </label>
                            
                            <label className="schoolingLabel">
                                Escolaridade: *
                                <input type="text" className={styles.schoolingInput} required value={formData.levelEducation} name="levelEducation" onChange={handleChange} />
                            </label>

                            <label className="PhoneLabel">
                                Telefone: *
                                <input type="text" className={styles.phoneInput} required value={formData.cellPhone} name="cellPhone" onChange={handleChange} />
                            </label>
                        </div>

                        <div className={styles.fourthLine}>
                            <label className="addressLabel">
                                Endereço: *
                                <input type="text" className={styles.addressInput} required value={formData.address} name="address" onChange={handleChange} />
                            </label>

                            <label className="districtLabel">
                                Bairro: *
                                <input type="text" className={styles.districtInput} required value={formData.district} name="district" onChange={handleChange} />
                            </label>

                            <label className="cityLabel">
                                Município: *
                                <input type="text" className={styles.cityInput} required value={formData.county} name="county" onChange={handleChange} />
                            </label>

                            <label className="ufLabel">
                                UF: *
                                <input type="text" className={styles.ufInput} required value={formData.uf} name="uf" onChange={handleChange} />
                            </label>
                        </div>

                        <div className={styles.fifthLine}>
                            <label className="orignLabel">
                                Origem: *
                                <select className={styles.orignSelect} name="origin" value={formData.origin} onChange={handleChange}>
                                    <option value="" disabled hidden></option>
                                    <option value="Servidor">Servidor</option>
                                    <option value="Dependente">Dependente</option>
                                    <option value="Aluno">Aluno</option>
                                    <option value="Comunidade">Comunidade</option>
                                </select>
                            </label>
                            
                            <div style={{display: formData.origin === "Servidor" ? "" : "none"}}>
                                <label className="nameOrignLabel">
                                    Nome do Servidor(a): *
                                    <input type="text" className={styles.nameOrignInput} value={formData.namePublicEmploye} name="namePublicEmploye" onChange={handleChange} />
                                </label>
                            </div>

                            <div style={{display: formData.origin === "Dependente" ? "" : "none"}}>
                                <label className="nameOrignLabel">
                                    Nome do Responsável: *
                                    <input type="text" className={styles.nameOrignInput} value={formData.nameResponsible} name="nameResponsible" onChange={handleChange} />
                                </label>
                            </div>
                        </div>
                        
                        <div className={styles.fifthLine}>
                            <button className={styles.btn} type="submit">{newPacient===true?"CADASTRAR":"ATUALIZAR"}</button>
                        </div>
                    </form>
                </div>
            </div>

            <Notifications showNotification={showNotification} typeNotification={typeNotification} msg={msg}/>
        </div>
    )
}