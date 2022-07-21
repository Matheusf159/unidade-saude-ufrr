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
            <AppBar 
                className={styles.appBar} 
                style={{
                    display: "flex", flexDirection: "row", justifyContent: "space-between", 
                    alignItems: "center", padding: "0px 20px", backgroundColor:"rgba(42,63,84,255)"
                }} 
                position="static" 
                color="inherit"
                >
                
                {user 
                    ? 
                    <Link to="/Menu">
                        <img className={styles.image} style={{marginLeft: "15px"}} src={logoUfrr} alt="logoEmbrapa" height="77" />
                    </Link>
                    :
                    <img className={styles.image} style={{marginLeft: "15px"}} src={logoUfrr} alt="logoEmbrapa" height="77" />
                }
                
                {user ? (
                    <Typography component={Link} to="/menu" className={styles.heading} style={{textDecoration: "none", color: "rgba(255,255,255,255)"}}  variant="h4">{title}</Typography>
                ):(
                    <Typography className={styles.heading} style={{textDecoration: "none", color: "rgba(255,255,255,255)"}} variant="h4">{title}</Typography>
                )}
                
                <Toolbar className={styles.toolbar} style={{display: "flex", justifyContent: "flex-end", maxWidth: "400px"}}>
                    {user ? (
                        <div className={styles.profile} style={{display: "flex", justifyContent: "space-between"}}>
                            <Avatar className={styles.blue} style={{color: "rgba(255,255,255,255)", backgroundColor: "rgba(3,83,127,255)"}} alt={user.name} src={user.profileImage}>{user.name.charAt(0)}</Avatar>
                            <Typography 
                                className={styles.userName} 
                                style={{
                                    display: "flex", 
                                    alignItems: "center", 
                                    color: "rgba(255,255,255,255)",
                                    margin: "0 10px 0 10px"
                                }} 
                                variant="h6">{user.name}
                            </Typography>
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