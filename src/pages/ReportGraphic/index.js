import React from "react";
import { Chart } from "react-google-charts";
import Navbar from "../../components/Navbar/Navbar";

import styles from './reportGraphic.module.css'

export const data = [
  ["Atendimentos", "Quantidade"],
  ["SIASS", 933],
  ["Serviço Médico", 174],
  ["Serviço de Nutrição", 45],
  ["Serviço de Enfermagem", 204],
  ["Serviço de Psicologia", 33],
  ["Serviço Social", 305],
];

export const options = {
    titleTextStyle: {
        fontSize: 30,
    },
  title: "Relatório 2021",
  borderRadius: 20
};

export default function ReportGraphic() {
  return (
    <div>
        <Navbar title="RELATÓRIO" />
        <div className={styles.container}>
            <div>
                <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"900px"}
                    height={"700px"}
                    
                />
            </div>
        </div>
    </div>
  );
}