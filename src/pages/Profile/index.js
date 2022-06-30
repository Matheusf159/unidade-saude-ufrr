import React from 'react'
import Header from '../../components/Header'
import { Link } from "react-router-dom"


import { MdAccountCircle } from 'react-icons/md'

import styles from './profile.module.css'

export default function Profile() {
    return (
        <div>
            <Header title="PERFIL" /> 

            <div  className={styles.wraper}>
                <div className={styles.content}>
                    <div className={styles.head}>
                        <div className={styles.left}>
                            <MdAccountCircle size={70} color="2A3F54" />
                            
                            <div className={styles.nameRegisty}>
                                <p style={{fontWeight: "bold", fontSize: 18}}>José da Silva</p>
                                <p style={{marginTop: -20, fontWeight: "lighter" }}>Matrícula: 123456789</p>
                            </div>
                        </div>

                        <div className={styles.right}>
                            <button className={styles.button}>EDITAR</button>
                            <button className={styles.button}>AGENDAR</button>
                        </div>
                    </div>

                    <div className={styles.data}>
                        <p className={styles.datas}>
                           <p>Data de Nascimento: 10/10/1999 Sexo: Masculino Cor: Pardo Naturalidade: Roraimense Estado Civil: Solteiro </p>
                           <p>Profissão: Estagiário Escolaridade: Superior Incompleto Telefone: (55) 95555-5555 </p>
                           <p>Endereço: Rua Principal, n111 bairro: Centro Município: Boa Vista UF: RRs</p>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}