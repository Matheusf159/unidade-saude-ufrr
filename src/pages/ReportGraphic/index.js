import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import Navbar from "../../components/Navbar/Navbar";
import _ from 'lodash'

import styles from './reportGraphic.module.css'

const URL = process.env.REACT_APP_URL;
export const options = {
    titleTextStyle: {
        fontSize: 30,
    },
  title: "Relatório 2021",
  borderRadius: 20
};

export default function ReportGraphic() {

  const token = localStorage.getItem('TokenHealthUnityUFRR');
  const [charData, setCharData] = useState([]);
  const [reportData, setReportData] = useState({
    Total: 0, Dentist: 0, Physiotherapist: 0, Doctor: 0, Nurse: 0, Psychologist: 0
  })

  const loadData = (data) => {
    const values = _.groupBy(data, (value) =>  value.attendance)

    console.log("values", values)

    const result = _.map(values, (value, key) => [
      key,
      _.sumBy(values[key], (v) => v.qtd)
    ])

    console.log("results", [["Atendimentos", "Quantidade"], ...result])

    return [["Atendimentos", "Quantidade"], ...result]
  }

  useEffect(() => {
    //remove o " no início e no fim de token 
    const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;
    
    async function LoadReport() {
        await axios.get(`${URL}/schedule/getReportSchedule`, { headers: {Authorization: AuthStr} })
        .then(res => {
            const data = [
              {attendance: "SIASS", qtd: res.data.Total},
              {attendance: "Serviço de Dentista", qtd: res.data.Dentist},
              {attendance: "Serviço de Fisioterapia", qtd: res.data.Physiotherapist},
              {attendance: "Serviço Médico", qtd: res.data.Doctor},
              {attendance: "Serviço de Enfermagem", qtd: res.data.Nurse},
              {attendance: "Serviço de Psicologia", qtd: res.data.Psychologist}
            ];

            setCharData(loadData(data));
            setReportData(res.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    LoadReport();
    
  }, []);

  async function generateReport(){
    //remove o " no início e no fim de token 
    const AuthStr = `Bearer ${token.substr(1, token.length-2)}`;

    await axios.post(`${URL}/service/createdoc`,
      {
        reportData
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
                  height={"600px"}
                  
              />

              <button className={styles.btn} onClick={generateReport}>Gerar Relatório</button>
            </div>
        </div>
    </div>
  );
}