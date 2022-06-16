import React from "react";

import { MdAccountCircle } from 'react-icons/md'

import styles from './header.module.css'

import Logo from "../../images/logo.png"

export default function Header(props) {
    return (
        <header className={styles.headerSite}>
            <img src={Logo} alt="logo" className={styles.logoImg} />

            <h1 className={styles.title}>{props.title}</h1>

            <div className={styles.rightHeader}>
                <MdAccountCircle size={50} color="white" />

                <div className={styles.rightInfo}>
                    <p className={styles.pr}>Usuário</p>
                    <a className={styles.alink} href="#">Sair</a>
                </div>
            </div>
        </header>
    )
}