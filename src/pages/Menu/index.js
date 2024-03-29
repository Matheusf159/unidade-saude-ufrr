import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from "react-router-dom"


import {
    MdGroupAdd, 
    MdPersonSearch, 
    MdGroups, 
    MdOutlineAddchart, 
    MdOutlineCalendarToday,
    MdPersonAdd
} from 'react-icons/md'

import styles from './menu.module.css'

export default function Menu() {
    return (
        <div>
            <Navbar title="MENU" />

            <div  className={styles.wraper}>
                <div className={styles.content}>
                    <div className={styles.line}>
                        <Link to="/signupPatient" className={styles.btnMenu} >
                            <button className={styles.button}>
                                <MdGroupAdd size={50} />
                                Cadastrar Paciente
                            </button>
                        </Link>

                        <Link to="/pacientSearch" className={styles.btnMenu} >
                            <button className={styles.button}>
                                <MdPersonSearch size={50} />
                                Buscar Paciente
                            </button>
                        </Link>

                        <Link to="/users" className={styles.btnMenu} >
                            <button className={styles.button}>
                                <MdGroups size={50} />
                                Usuários
                            </button>
                        </Link>
                    </div> 
                    
                    <div className={styles.line}>
                        <Link to="/reportGraphic" className={styles.btnMenu} >
                            <button className={styles.button}>
                                <MdOutlineAddchart size={50} />
                                Relatório
                            </button>
                        </Link>

                        <Link to="/registerUser" className={styles.btnMenu} >
                            <button className={styles.button}>
                                <MdPersonAdd size={50} />
                                Cadastrar Usuário
                            </button>
                        </Link>

                        <Link to="/pacientList" className={styles.btnMenu} >
                            <button className={styles.button}>
                                <MdOutlineCalendarToday size={50} />
                                Consultas do Dia
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}