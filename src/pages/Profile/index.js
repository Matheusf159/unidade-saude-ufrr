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
                            <MdAccountCircle size={50} color="blue" />
                            
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