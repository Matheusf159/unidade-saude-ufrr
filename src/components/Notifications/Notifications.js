import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

import styles from "./Notifications.module.css";


export default function Notifications({showNotification, typeNotification, msg}){

    return(
        <div className={styles.container} style={{top: showNotification===true? "16px": "-100px", padding: "12px"}}>
            {typeNotification==="information"?
                <div className={styles.subContainer} style={{backgroundColor: "rgb(37, 150, 190)", padding: "12px"}}>
                    <InfoIcon style={{ fontSize: 25, marginRight: "5px" }}/>
                    <span>{msg}</span>
                </div>
                : typeNotification==="success"?
                <div className={styles.subContainer} style={{backgroundColor: "rgb(0, 153, 51)", padding: "12px"}}>
                    <CheckCircleIcon style={{ fontSize: 25, marginRight: "5px" }}/>
                    <span>{msg}</span>
                </div>
                : typeNotification==="warning"?
                <div className={styles.subContainer} style={{backgroundColor: "rgb(255, 153, 0)", padding: "12px"}}>
                    <ErrorIcon style={{ fontSize: 25, marginRight: "5px" }}/>
                    <span>{msg}</span>
                </div>
                :
                <div className={styles.subContainer} style={{backgroundColor: "rgb(204, 0, 0)", padding: "12px"}}>
                    <ErrorIcon style={{ fontSize: 25, marginRight: "5px" }}/>
                    <span>{msg}</span>
                </div>
            }
        </div>
    );
}