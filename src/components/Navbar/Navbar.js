import { useState, useEffect } from 'react';
import { AppBar, Button, Typography, Toolbar, Avatar } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import styles from './Navbar.module.css';

import logoUfrr from "../../assets/Images/logoUfrr.png";

export default function Navbar({title}){
    const [user, setUser] = useState({name: '', profileImage: ''});
    const location = useLocation();
    const history = useNavigate();
  
    function logout() {
     
        history('/');
        localStorage.removeItem('TokenHealthUnityUFRR');
    };

    useEffect(() => {
        const Token = JSON.parse(localStorage.getItem('TokenHealthUnityUFRR'));
    
        if (Token) {
          const decodedToken = decode(Token);
          setUser({name: decodedToken.name, profileImage: decodedToken.profileImage})
    
          if (decodedToken.exp * 1000 < new Date().getTime()) 
            logoutEffect();
        }
        else if(location.pathname!=='/' && location.pathname!=='/menu')
            logoutEffect();

        function logoutEffect() {

            history('/');
            localStorage.removeItem('TokenHealthUnityUFRR');
        };

      }, [location, history]);

    if(location.pathname!=='/'){
        return(
            <AppBar className={styles.appBar} position="static" color="inherit">
                
                <img className={styles.image} src={logoUfrr} alt="logoEmbrapa" height="77" />
                
                {user ? (
                    <Typography component={Link} to="/menu" className={styles.heading} style={{textDecoration: "none"}}  variant="h4">{title}</Typography>
                ):(
                    <Typography to="/Menu" className={styles.heading} style={{textDecoration: "none"}} variant="h4">{title}</Typography>
                )}
                
                <Toolbar className={styles.toolbar}>
                    {user ? (
                        <div className={styles.profile}>
                            <Avatar className={styles.blue} alt={user.name} src={user.profileImage}>{user.name.charAt(0)}</Avatar>
                            <Typography className={styles.userName} variant="h6">{user.name}</Typography>
                            <Button variant="contained" color="error" onClick={logout}>Logout</Button>
                        </div>
                    ):(
                        <></>
                    )}
                </Toolbar>
            </AppBar>
        );
    } else {
        return(
            <></>
        );
    }
}