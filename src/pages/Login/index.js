import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper, Typography, Container, Checkbox } from '@mui/material';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import axios from 'axios';

import Input from "../../components/Input/Input";
import Notifications from "../../components/Notifications/Notifications";

import logoUfrr from "../../assets/Images/logoUfrr.png";

import styles from "./login.module.css";

const URL = process.env.REACT_APP_URL;
export default function Login (){
    
    const initialState = { name: '', userName: '', password: '', confirmPassword: '', type: 'Dentista' };

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const [radioOpts, setRadioOpts] = useState([
        [{name: "Dentista", value: "Dentista-0", checked: true}, {name: "Enfermeiro(a)", value: "Enfermeiro(a)-0", checked: false}],
        [{name: "Fisioterapeuta", value: "Fisioterapeuta-1", checked: false}, {name: "Pediatra", value: "Pediatra-1", checked: false}],
        [{name: "Psicólogo(a)", value: "Psicólogo(a)-2", checked: false}, {name: "Serviço Social", value: "Serviço Social-2", checked: false}],
        [{name: "Nutricionista", value: "Nutricionista-3", checked: false}, {name: "Clínico Geral", value: "Clínico Geral-3", checked: false}],
        [{name: "Recepscionista", value: "Recepscionista-4", checked: false}],
    ]);

    const [selectedRadio, setSelectedRadio] = useState({row: 0, column: 0});
    const [showNotification, setShowNotification] = useState(false);
    const [typeNotification, setTypeNotification] = useState('error');
    const [msg, setMsg] = useState('');

    const history = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    //functions
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup){
            if(formData.password === formData.confirmPassword){
                createUser();
            }
            else {
                alert("Sehnas não coincidem")
            }
        } else{
            signIn();
        }

    };
    
    async function signIn(){
        await axios.post(`${URL}/user/signin`, 
            {userName: formData.userName, password: formData.password}
        ).then(res => {
			localStorage.setItem('TokenHealthUnityUFRR', JSON.stringify(res.data.token));
            history('/menu');
		})
		.catch(function (error) {
            if(error.response.data!==undefined){
                setMsg(error.response.data.message);
            }
            else {
                setMsg("Não foi possível se conectar ao servidor");
            }
            activateNotification('error');
		}) 
    }

    async function createUser(){
        await axios.post(`${URL}/user/createUser`, 
            {name: formData.name, userName: formData.userName, password: formData.password, type: formData.type}
        ).then(res => {
            switchMode();
            setMsg(res.data.message);
            activateNotification('success');
            
		})
		.catch(function (error) {
            if(error.response.data!==undefined){
                setMsg(error.response.data.message);
            }
            else {
                setMsg("Não foi possível se conectar ao servidor");
            }
            activateNotification('error');
		})
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false); 
    }

    const handleChangeRadio = (value) => {
        const valueArray = value.split('-');
        const row = parseInt(valueArray[1]);
        const column = radioOpts[row].findIndex((item) => item.value === value);
        
        let radioOptsTemp = radioOpts;
        radioOptsTemp[selectedRadio.row][selectedRadio.column].checked = false;
        radioOptsTemp[row][column].checked = true;
        
        setSelectedRadio({row: row, column: column});
        setRadioOpts(radioOptsTemp);
        setFormData({...formData, type: valueArray[0]})
        
    };

    function renderRow(Data, index){
        return(
            <div key={index} style={{marginTop: "15px"}}>
                <RadioGroup key={index} onChange={handleChangeRadio} horizontal>
                    {Data.map(renderRadio)}
                </RadioGroup>
            </div>
        );
    };

    function renderRadio(Data, index){
        return(
            <RadioButton key={index} value={Data.value} checked={Data.checked}>
                {Data.name}
            </RadioButton>
        );
    };

    function activateNotification(type){
        setTypeNotification(type);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    }

    return(
        <div className={styles.body}>
            <Container component="main" maxWidth="xs">
                <Paper className={styles.paper} elevation={3}>
                    <img src={logoUfrr} alt="logoUfrr" height="60" />
                    <Typography variant="h5">{isSignup ? 'Cadastro' : 'Login'}</Typography>
                    <form className={styles.form} onSubmit={handleSubmit}>
                            { isSignup && (
                                <>
                                    <Input name="name" label="nome" handleChange={handleChange} autoFocus />
                                    {radioOpts.map(renderRow)}
                                </>
                            )}
                        <Grid container rowSpacing={2} style={{marginTop: "5px"}}>
                            <Grid container>
                                { isSignup && <p>Estagiário(a)</p>}
                                { isSignup && <Checkbox name="dsdsd" />}
                            </Grid>
                            <Input name="userName" label="Nome de usuário" handleChange={handleChange} type="text" />
                            <Input name="password" label="Senha" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>       
                            
                            { isSignup && <Input name="confirmPassword" label="Repita a senha" handleChange={handleChange} type="password" />}
                        </Grid>

                        <Button type="submit" fullWidth variant="contained" color="primary" className={styles.submitButton} style={{margin: "20px 0 0 0"}}>
                            {isSignup ? 'Cadastrar' : 'Entrar'}
                        </Button>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    { isSignup ? 'Já possui cadastro? Logar' : "Não possui uma conta? Cadastre-se"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>

            <Notifications showNotification={showNotification} typeNotification={typeNotification} msg={msg}/>
        </div>
    );
};