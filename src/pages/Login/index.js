import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper, Typography, Container } from '@mui/material';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import axios from 'axios';

import Input from "../../components/Input/Input";

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
        [{name: "fisioterapeuta", value: "Fisioterapeuta-1", checked: false}, {name: "Médico(a)", value: "Médico(a)-1", checked: false}],
        [{name: "psicólogo(a)", value: "Psicólogo(a)-2", checked: false}]
    ]);

    const [selectedRadio, setSelectedRadio] = useState({row: 0, column: 0});
    const history = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    //functions
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup){
            if(formData.password === formData.confirmPassword){
                createUser();
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
            //create ui msg box
			console.log(error);
		}) 
    }

    async function createUser(){
        await axios.post(`${URL}/user/createUser`, 
            {name: formData.name, userName: formData.userName, password: formData.password, type: formData.type}
        ).then(res => {
            //create ui msg box
            switchMode();
            console.log(res.data.message);
            
		})
		.catch(function (error) {
            //create ui msg box
			console.log(error);
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

    return(
        <div className={styles.body}>
        <Container component="main" maxWidth="xs">
            <Paper className={styles.paper} elevation={3}>
                <img src={logoUfrr} alt="logoUfrr" height="60" />
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={styles.form} onSubmit={handleSubmit}>
                        { isSignup && (
                            <>
                                <Input name="name" label="nome" handleChange={handleChange} autoFocus />
                                {radioOpts.map(renderRow)}
                            </>
                        )}
                    <Grid container rowSpacing={2} style={{marginTop: "5px"}}>
                        <Input name="userName" label="nome de usuário" handleChange={handleChange} type="text" />
                        <Input name="password" label="Senha" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>       
                        { isSignup && <Input name="confirmPassword" label="Repita a senha" handleChange={handleChange} type="password" />}
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={styles.submitButton} style={{margin: "20px 0 0 0"}}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
        </div>
    );
};