import React from "react";
import Header from "../../components/Header";

import styles from './schedule.module.css'


export default function Schedules() {
    return (
        <div>
            <Header title="AGENDAMENTO" />

            <div  className={styles.wraper}>
                <div className={styles.content}>
                    <form>
                        <div className={styles.firstLine}>
                            <label className="nameLabel">
                                Nome:
                                <input type="text" className={styles.nameInput} />
                            </label>

                            <label className="registryLabel">
                                Matrícula:
                                <input type="text" className={styles.registyInput} />
                            </label>
                        </div>

                        <div className={styles.secondLine}>
                            <label className="PhoneLabel">
                                Telefone:
                                <input type="text" className={styles.PhoneInput} />
                            </label>
                            
                            <label className="bondLabel">
                                Vínculo:
                                <input type="text" className={styles.bondInput} />
                            </label>
                        </div>

                        <div className={styles.thirdLine}>
                            <label className="doctorLabel">
                                Médico:
                                <input type="text" className={styles.doctorInput} />
                            </label>
                            
                            <label className="schoolingLabel">
                                Especialidade:
                                <input type="text" className={styles.schoolingInput} />
                            </label>
                        </div>

                        <div className={styles.fourthLine}>
                            <label className="dateLabel">
                                Data:
                                <input type="text" className={styles.dateInput} />
                            </label>
                        </div>

                        <div className={styles.sixth}>
                            <button className={styles.btn} type="submit">AGENDAR</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}