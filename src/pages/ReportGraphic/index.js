import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import Navbar from "../../components/Navbar/Navbar";
import _ from 'lodash'
import Notifications from "../../components/Notifications/Notifications";

import styles from './reportGraphic.module.css'

const URL = process.env.REACT_APP_URL;
export default function ReportGraphic() {

  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [searchYear, setSearchYear] = useState(currentDate.getFullYear());

  const options = {
    titleTextStyle: {
        fontSize: 30,
    },
    title: `Relatório ${year}`,
    borderRadius: 20
  };

  const token = localStorage.getItem('TokenHealthUnityUFRR');
  const [charData, setCharData] = useState([]);
  const [reportData, setReportData] = useState({
    Total: 0, Dentist: 0, Physiotherapist: 0, Doctor: 0, Nurse: 0, Psychologist: 0
  })

  const [showNotification, setShowNotification] = useState(false);
  const [typeNotification, setTypeNotification] = useState('error');
  const [msg, setMsg] = useState('');

  const loadData = (data) => {
    const values = _.groupBy(data, (value) =>  value.attendance)

    //console.log("values", values)

    const result = _.map(values, (value, key) => [
      key,
      _.sumBy(values[key], (v) => v.qtd)
    ])

    //console.log("results", [["Atendimentos", "Quantidade"], ...result])

    return [["Atendimentos", "Quantidade"], ...result]
  }

  useEffect(() => {
    
    LoadReport();
    
  }, []);

  async function LoadReport() {
    //remove o " no início e no fim de token
    const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;

    await axios.post(`${URL}/schedule/getReportSchedule`, {year: searchYear}, { headers: {Authorization: AuthStr} })
      .then(res => {
        let data;
        if(res.data.Total===0){
          data = [{attendance: "Não há atendimentos cadastrados para este período", qtd: 1}]
        }
        else{
          data = [
            /*{attendance: "SIASS", qtd: res.data.Total},*/
            {attendance: "Serviço de Dentista", qtd: res.data.Dentist},
            {attendance: "Serviço de Fisioterapia", qtd: res.data.Physiotherapist},
            {attendance: "Serviço Médico", qtd: res.data.Doctor},
            {attendance: "Serviço de Enfermagem", qtd: res.data.Nurse},
            {attendance: "Serviço de Psicologia", qtd: res.data.Psychologist}
          ];
        }
        setCharData(loadData(data));
        setReportData(res.data);
      })
      .catch(function (error) {
        setMsg("Não foi possível se conectar ao servidor");
        activateNotification('error');
      })

    setYear(searchYear);
  }

  async function generateReport(){
    //remove o " no início e no fim de token 
    const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;

    await axios.post(`${URL}/service/createdoc`,
      {
        reportData: reportData,
        year: year
      },
      { responseType: 'blob' }, 
      { headers: {Authorization: AuthStr} }
    ).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'relatorio.docx');
        document.body.appendChild(link);
        link.click();
    });
  }

  function activateNotification(type){
    setTypeNotification(type);
    setShowNotification(true);
    setTimeout(() => {
        setShowNotification(false);
    }, 2000);
  }

  function handleChangeYear(e) {
    
    
  }

  return (
    <div>
        <Navbar title="RELATÓRIO" />
        <div className={styles.container}>
            <div className={styles.subContainer}>
              <Chart
                  chartType="PieChart"
                  data={charData}
                  options={options}
                  width={"900px"}
                  height={"500px"}
                  
              />
              <label>
                  Ano:
                  <input type="text" value={searchYear} onChange={(e) => setSearchYear(e.target.value)} name="type" placeholder="YYYY" className={styles.yearInput} />
                  <button className={styles.btnSearch} onClick={()=>LoadReport()}>Buscar</button>
              </label>
              <button className={styles.btn} onClick={generateReport}>Gerar Relatório</button>
            </div>
        </div>

        <Notifications showNotification={showNotification} typeNotification={typeNotification} msg={msg}/>
    </div>
  );
}