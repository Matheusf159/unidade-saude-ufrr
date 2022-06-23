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
                            <button>EDITAR</button>
                            <button>AGENDAR</button>
                        </div>
                    </div>

                    <div className={styles.dates}>

                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.head}>
                        <div className={styles.left}>
                            <MdAccountCircle size={50} color="blue" />
                        </div>

                        <div className={styles.right}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}