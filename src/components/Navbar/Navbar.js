import { useState, useEffect } from 'react';
import { AppBar, Button, Typography, Toolbar, Avatar } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import './Navbar.css';

import logoUfrr from "../../assets/Images/logoUfrr.png";

export default function Navbar(){
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
            <AppBar className="appBar" position="static" color="inherit">
                <div className="brandContainer">
                    <img className="image" src={logoUfrr} alt="logoEmbrapa" height="60" />
                    {user ? (
                        <Typography component={Link} to="/menu" className="heading" style={{textDecoration: "none"}}  variant="h6" align="center">UNIDADE DE SAÚDE UNIVERSIDADE FEDERAL DE RORAIMA</Typography>
                    ):(
                        <Typography to="/Menu" className="heading" style={{textDecoration: "none"}} variant="h6" align="center">UNIDADE DE SAÚDE UNIVERSIDADE FEDERAL DE RORAIMA</Typography>
                    )}
                </div>
                <Toolbar className="toolbar">
                    {user ? (
                        <div className="profile">
                            <Avatar className="blue" alt={user.name} src={user.profileImage}>{user.name.charAt(0)}</Avatar>
                            <Typography className="userName" variant="h6">{user.name}</Typography>
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