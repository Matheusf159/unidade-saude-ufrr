import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from "react-router-dom"


import { MdAccountCircle } from 'react-icons/md'

import styles from './profile.module.css'

export default function Profile() {
    return (
        <div>
            <Navbar title="PERFIL" /> 

            <div  className={styles.wraper}>
                <div className={styles.content}>
                    <div className={styles.head}>
                        <div className={styles.left}>
                            <MdAccountCircle size={50} color="blue" />
                            
                            <p>nome</p>
                            <div>

                            </div>
                        </div>

                        <div className={styles.right}>

                        </div>
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