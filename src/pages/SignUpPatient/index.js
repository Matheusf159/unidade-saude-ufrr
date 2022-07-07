import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

import styles from './signup.module.css'

const URL = process.env.REACT_APP_URL;
export default function SignUpPatient() {
    
    const initialState = { 
        name: '', sex: 'Masculino', skinTone: 'Amarelo', birthDate: '', naturalness: '', maritalState: 'Solteiro', 
        profession: '', levelEducation: '', cellPhone: '', address: '', district: '', county: '',
        uf: '', origin: 'Servidor', namePublicEmploye: '', nameResponsible: ''
    };
    const [formData, setFormData] = useState(initialState);

    const history = useNavigate();

    async function registerPacient(e){
        e.preventDefault();
        
        await axios.post(`${URL}/pacient/createPacient`, 
            {
                name: formData.name, sex: formData.sex, skinTone: formData.skinTone, birthDate: formData.birthDate,
                naturalness: formData.naturalness, maritalState: formData.maritalState, profession: formData.profession,
                levelEducation: formData.levelEducation, cellPhone: formData.cellPhone, address: formData.address, 
                district: formData.district, county: formData.county, uf: formData.uf, origin: formData.origin, 
                namePublicEmploye: formData.namePublicEmploye, nameResponsible: formData.nameResponsible
            }
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

    return (
        <div>
            <Navbar title="CADASTRO" />

            <div  className={styles.wraper}>
                <div className={styles.content}>
                    <form onSubmit={registerPacient}>
                        <div className={styles.firstLine}>
                            <label className="nameLabel">
                                Nome:
                                <input type="text" className={styles.nameInput} required name="name" onChange={handleChange} />
                            </label>
                            
                            <label className="sexLabel">
                                sexo:
                                <select className={styles.sexSelect} name="sex" required value={formData.sex} onChange={handleChange}>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="undefined">Prefiro não dizer</option>
                                </select>
                                
                            </label>

                            <label className="colorLabel">
                                Cor:
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
                                Data de nascimento:
                                <input type="text" className={styles.birthDateInput} required name="birthDate" onChange={handleChange} />
                            </label>
                            
                            <label className="naturalnessLabel">
                                Naturalidade:
                                <input type="text" className={styles.naturalnessInput} required name="naturalness" onChange={handleChange} />
                            </label>

                            <label className="maritalStatusLabel">
                                Estado Civil:
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
                                Profissão:
                                <input type="text" className={styles.professionInput} required name="profession" onChange={handleChange} />
                            </label>
                            
                            <label className="schoolingLabel">
                                Escolaridade:
                                <input type="text" className={styles.schoolingInput} required name="levelEducation" onChange={handleChange} />
                            </label>

                            <label className="PhoneLabel">
                                Telefone:
                                <input type="text" className={styles.phoneInput} required name="cellPhone" onChange={handleChange} />
                            </label>
                        </div>

                        <div className={styles.fourthLine}>
                            <label className="addressLabel">
                                Endereço:
                                <input type="text" className={styles.addressInput} name="address" onChange={handleChange} />
                            </label>

                            <label className="districtLabel">
                                Bairro:
                                <input type="text" className={styles.districtInput} required name="district" onChange={handleChange} />
                            </label>

                            <label className="cityLabel">
                                Município:
                                <input type="text" className={styles.cityInput} required name="county" onChange={handleChange} />
                            </label>

                            <label className="ufLabel">
                                UF:
                                <input type="text" className={styles.ufInput} required name="uf" onChange={handleChange} />
                            </label>
                        </div>

                        <div className={styles.fifthLine}>
                            <label className="orignLabel">
                                Origem:
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
                                    Nome do servidor:
                                    <input type="text" className={styles.nameOrignInput} name="namePublicEmploye" onChange={handleChange} />
                                </label>
                            </div>

                            <div style={{display: formData.origin === "Dependente" ? "" : "none"}}>
                                <label className="nameOrignLabel">
                                    Nome do responsável:
                                    <input type="text" className={styles.nameOrignInput} name="nameResponsible" onChange={handleChange} />
                                </label>
                            </div>
                        </div>
                        
                        <div className={styles.fifthLine}>
                            <button className={styles.btn} type="submit">CADASTRAR</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}