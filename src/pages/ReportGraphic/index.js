import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Navbar from "../../components/Navbar/Navbar";
import _ from 'lodash'

import styles from './reportGraphic.module.css'


export const options = {
    titleTextStyle: {
        fontSize: 30,
    },
  title: "Relatório 2021",
  borderRadius: 20
};

export default function ReportGraphic() {
  const [charData, setCharData] = useState([]);

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
    const data = [
      {attendance: "SIASS", qtd: 933},
      {attendance: "Serviço Médico", qtd: 174},
      {attendance: "Serviço de Nutrição", qtd: 45},
      {attendance: "Serviço de Enfermagem", qtd: 204},
      {attendance: "Serviço de Psicologia", qtd: 33},
      {attendance: "Serviço Social", qtd: 305},
    ];

    setCharData(loadData(data))
  }, [])

  return (
    <div>
        <Navbar title="RELATÓRIO" />
        <div className={styles.container}>
            <div>
                <Chart
                    chartType="PieChart"
                    data={charData}
                    options={options}
                    width={"900px"}
                    height={"700px"}
                    
                />
            </div>
        </div>
    </div>
  );
}