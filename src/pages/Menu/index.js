import React from 'react'
import Header from '../../components/Header'
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
            <Header title="MENU" /> 

            <div  className={styles.wraper}>
                <div className={styles.content}>
                    <div className={styles.line}>
                        <Link to="/signupPatient" className={styles.btnMenu} >
                            <button>
                                <MdGroupAdd size={50} />
                                Cadastrar Paciente
                            </button>
                        </Link>

                        <Link to="/schedule" className={styles.btnMenu} >
                            <button>
                                <MdPersonSearch size={50} />
                                Buscar Paciente
                            </button>
                        </Link>

                        <Link to="/schedule" className={styles.btnMenu} >
                            <button>
                                <MdGroups size={50} />
                                Funcionários
                            </button>
                        </Link>
                    </div>
                    
                    <div className={styles.line}>
                        <Link to="/schedule" className={styles.btnMenu} >
                            <button>
                                <MdOutlineAddchart size={50} />
                                Relatório
                            </button>
                        </Link>

                        <Link to="/schedule" className={styles.btnMenu} >
                            <button>
                                <MdPersonAdd size={50} />
                                Cadastrar Funcionário
                            </button>
                        </Link>

                        <Link to="/schedule" className={styles.btnMenu} >
                            <button>
                                <MdOutlineCalendarToday size={50} />
                                Agendar Consulta
                            </button>
                        </Link>
                    </div>

                    <div className={styles.line}>
                        <Link to="/schedule" className={styles.btnMenu} >
                            <button>
                                <MdPersonAdd size={50} />
                                Cadastrar Usuário
                            </button>
                        </Link>

                        <Link to="/schedule" className={styles.btnMenu} >
                            <button>
                                <MdOutlineAddchart size={50} />
                                Relatório
                            </button>
                        </Link>
                        <Link to="/schedule" className={styles.btnMenu} >
                            <button>
                                <MdOutlineCalendarToday size={50} />
                                Agendar Consulta
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}