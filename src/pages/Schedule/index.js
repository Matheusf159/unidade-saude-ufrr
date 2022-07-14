import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import Navbar from "../../components/Navbar/Navbar";
import Notifications from "../../components/Notifications/Notifications";

import styles from './schedule.module.css'

const URL = process.env.REACT_APP_URL;
export default function Schedules() {

    const location =  useLocation();
    const token = localStorage.getItem('TokenHealthUnityUFRR');

    const [selectedDoctor, setSelectedDoctor] = useState();
    const [doctorList, setDoctorList] = useState([]);

    const initialState = { 
        doctorName: '', type: '', scheduleDate: new Date(),
        time: '10:00'
    };

    const [formData, setFormData] = useState(initialState);


    const [pacientState, setPacientState] = useState({
        _id: '', name: '', cellPhone: '', origin: ''
    });

    const history = useNavigate();

    const [showNotification, setShowNotification] = useState(false);
    const [typeNotification, setTypeNotification] = useState('error');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if(location.state) {
            setPacientState(location.state.pacient);
        }
        
    }, [location]);

    useEffect(() => {
        //remove o " no início e no fim de token 
        const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;
        
        async function LoadUsers() {
            await axios.get(`${URL}/user/getAllUsers`, { headers: {Authorization: AuthStr} })
            .then(res => {
                let tempDoctorList = [];
                if(res.data !== undefined){
                    res.data.map(item => {
                        if(item.type!=="adm")
                            tempDoctorList.push({ value: item._id, label: item.name, type: item.type});
                    });

                    setDoctorList(tempDoctorList);
                    setSelectedDoctor(tempDoctorList[0]);
                    setFormData({ ...formData, "doctorName": tempDoctorList[0].label, "type": tempDoctorList[0].type });
                }

            })
            .catch(function (error) {
                //create ui msg box
                console.log(error);
            })
        }
        LoadUsers(doctorList);
        
    }, []);

    function handleSelect(selected_doctor) {
        
        setSelectedDoctor(selected_doctor);
        setFormData({ ...formData, "type": selected_doctor.type });
    }

    async function registerSchedule(e) {
        e.preventDefault();
        let date = `${formData.scheduleDate.getDate()}/${formData.scheduleDate.getMonth()+1<10?"0"+formData.scheduleDate.getMonth()+1:formData.scheduleDate.getMonth()+1}/${formData.scheduleDate.getFullYear()}`;
        
        const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;
        if(pacientState._id!==''){
            await axios.post(`${URL}/schedule/createSchedule`,
                    {
                        userId: selectedDoctor.value, pacientId: pacientState._id,
                        scheduleDate: date, time: formData.time
                    },
                    { headers: {Authorization: AuthStr} }
                ).then(res => {
                    setMsg(res.data.message);
                    activateNotification('success');
                })
                .catch(function (error) {
                    setMsg("Não foi possível se conectar ao servidor");
                })
        }
    };

    function activateNotification(type){
        setTypeNotification(type);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
            if(type==='success'){
                history('/menu');
            }
        }, 2000);
    }

    return (
        <div>
            <Navbar title="AGENDAMENTO" />

            <div  className={styles.wraper}>
                <div className={styles.content}>
                    <form onSubmit={registerSchedule}>
                        <div className={styles.firstLine}>
                            <label className="nameLabel">
                                Nome:
                                <input type="text" value={pacientState.name} name="name" disabled required className={styles.nameInput} />
                            </label>

                        </div>

                        <div className={styles.secondLine}>
                            <label className="PhoneLabel">
                                Telefone:
                                <input type="text" value={pacientState.cellPhone} name="cellPhone" disabled required placeholder="(99) 999999999" className={styles.PhoneInput} />
                            </label>
                            
                            <label className="bondLabel">
                                Vínculo:
                                <input type="text" value={pacientState.origin} name="origin" disabled required className={styles.bondInput} />
                            </label>
                        </div>

                        <div className={styles.thirdLine}>
                            <label className="doctorLabel">
                                <div className={styles.doctorContainer}>
                                    <span>Profissional:</span>
                                    <Select
                                        className={styles.doctorInput}
                                        options={doctorList}
                                        placeholder="Médico"
                                        value={selectedDoctor}
                                        onChange={handleSelect}
                                        isSearchable={true}
                                        required
                                    />
                                </div>
                            </label>
                            
                            <label className="schoolingLabel">
                                Especialidade:
                                <input type="text" value={formData.type} name="type" disabled className={styles.schoolingInput} />
                            </label>
                        </div>

                        <div className={styles.fourthLine}>
                            <label className="dateLabel">
                                Data:
                                <DatePicker 
                                    format="dd-MM-y" 
                                    value={formData.scheduleDate} 
                                    minDate={new Date()} 
                                    required 
                                    className={styles.dateInput} 
                                    onChange={(value)=>setFormData({ ...formData, ["scheduleDate"]: value })} 
                                />
                                
                            </label>

                            <label className="dateLabel">
                                Horário:                                
                                <TimePicker 
                                    value={formData.time}
                                    required
                                    className={styles.timeInput}
                                    onChange={(value)=>setFormData({ ...formData, "time": value })}
                                />
    
                            </label>
                        </div>

                        <div className={styles.sixth}>
                            <button className={styles.btn} type="submit">AGENDAR</button>
                        </div>
                    </form>
                </div>
            </div>

            <Notifications showNotification={showNotification} typeNotification={typeNotification} msg={msg}/>
        </div>
    )
}