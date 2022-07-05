import React, {useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from './register.module.css';

export default function RegisterStaff(){

    const [type, setType] = useState("Dentist");


    function handleChangeType(e){
        
        setType(e.target.value);
    }

    return(
        <div>

            <Navbar title="CADASTRAR USUÁRIO" />

            <div  className={styles.wraper}>
                <div className={styles.content}>
                    <form>
                        <div className={styles.firstLine}>
                            <label className="nameLabel">
                                Nome:
                                <input type="text" className={styles.nameInput} />
                            </label>

                            <label className="registryLabel">
                                Nome de Usuário:
                                <input type="text" className={styles.registyInput} />
                            </label>
                        </div>

                        <div className={styles.secondLine}>
                            <label className="passwordLabel">
                                Senha:
                                <input type="password" className={styles.passwordInput} />
                            </label>
                            
                            <label className="bondLabel">
                                tipo:
                                <select className={styles.selectBox} value={type} onChange={handleChangeType}>
                                    <option value={"Dentist"}>Dentista</option>
                                    <option value={"Nurse"}>Enfermeiro(a)</option>
                                    <option value={"physiotherapist"}>fisioterapeuta</option>
                                    <option value={"Doctor"}>Médico(a)</option>
                                    <option value={"psychologist"}>psicólogo(a)</option>
                                </select>
                            </label>
                        </div>

                        <div className={styles.thirdLine}>
                            <label className="doctorLabel">
                                status:
                                <select className={styles.selectBox}>
                                    <option value={"adm"}>Administrador</option>
                                    <option value={"approved"}>Aprovado</option>
                                    <option value={"disabled"}>Desabilitado</option>
                                    <option value={"pending"}>Pendente</option>
                                    <option value={"rejected"}>Rejeitado</option>
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