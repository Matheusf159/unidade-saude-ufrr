import React, { useState } from "react";
import Header from "../../components/Header";

import styles from './signup.module.css'


export default function SignUpPatient() {
    const [orignSelect, setOrignSelect] = useState("")

    return (
        <div>
            <Header title="CADASTRO" />

            <div  className={styles.wraper}>
                <div className={styles.content}>
                    <form>
                        <div className={styles.firstLine}>
                            <label className="nameLabel">
                                Nome:
                                <input type="text" className={styles.nameInput} />
                            </label>
                            
                            <label className="sexLabel">
                                sexo:
                                <select className={styles.sexSelect}>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                                
                            </label>

                            <label className="colorLabel">
                                Cor:
                                <input type="text" className={styles.colorInput} />
                            </label>
                        </div>

                        <div className={styles.secondLine}>
                            <label className="birthDateLabel">
                                Data de nascimento:
                                <input type="text" className={styles.birthDateInput} />
                            </label>
                            
                            <label className="naturalnessLabel">
                                Naturalidade:
                                <input type="text" className={styles.naturalnessInput} />
                            </label>

                            <label className="maritalStatusLabel">
                                Estado Civil:
                                <input type="text" className={styles.maritalStatusInput} />
                            </label>
                        </div>

                        <div className={styles.thirdLine}>
                            <label className="professionLabel">
                                Profissão:
                                <input type="text" className={styles.professionInput} />
                            </label>
                            
                            <label className="schoolingLabel">
                                Escolaridade:
                                <input type="text" className={styles.schoolingInput} />
                            </label>

                            <label className="PhoneLabel">
                                Telefone:
                                <input type="text" className={styles.phoneInput} />
                            </label>
                        </div>

                        <div className={styles.fourthLine}>
                            <label className="addressLabel">
                                Endereço:
                                <input type="text" className={styles.addressInput} />
                            </label>

                            <label className="districtLabel">
                                Bairro:
                                <input type="text" className={styles.districtInput} />
                            </label>

                            <label className="cityLabel">
                                Município:
                                <input type="text" className={styles.cityInput} />
                            </label>

                            <label className="ufLabel">
                                UF:
                                <input type="text" className={styles.ufInput} />
                            </label>
                        </div>

                        <div className={styles.fifthLine}>
                            <label className="orignLabel">
                                Origem:
                                <select className={styles.orignSelect} onChange={(e) => setOrignSelect({value: e.target.value})}>
                                    <option value="" selected disabled hidden></option>
                                    <option value="Servidor">Servidor</option>
                                    <option value="Dependente">Dependente</option>
                                    <option value="Aluno">Aluno</option>
                                    <option value="Comunidade">Comunidade</option>
                                </select>
                            </label>

                            {console.log(orignSelect)}
                            
                            <div style={{display: orignSelect.value === "Servidor" ? "" : "none"}}>
                                <label className="nameOrignLabel">
                                    Nome do servidor:
                                    <input type="text" className={styles.nameOrignInput} />
                                </label>
                            </div>

                            <div style={{display: orignSelect.value === "Dependente" ? "" : "none"}}>
                                <label className="nameOrignLabel">
                                    Nome do responsável:
                                    <input type="text" className={styles.nameOrignInput} />
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