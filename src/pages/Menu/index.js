import React from 'react'
import Header from '../../components/Header'

import { MdGroupAdd } from 'react-icons/md'

import styles from './menu.module.css'

export default function Menu() {
    return (
        <div>
            <Header title="MENU" />

            <MdGroupAdd width={20} height={50} />
        </div>
    )
}