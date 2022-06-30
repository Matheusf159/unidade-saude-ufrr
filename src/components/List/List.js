import { Checkbox } from "@mui/material";
import "./List.module.css";

 export default function List({header, items, check, select, handlePresence, handleStatus}){

    let rowIndexTemp = 0;
    
    function renderHeader(Data, index){
        return(
            <th key={index}>{Data}</th>
        )
    }

    function renderRow(Data, RowIndex){
        const width = 50/(header.length-1);
        rowIndexTemp = RowIndex;

        return(
            <tr key={RowIndex}>
                <td style={{"width": `${width}+%`, textAlign: "center"}}>{RowIndex}</td>
                {
                    Data.map(renderItem)
                }
            </tr>
        )
    }

    function renderItem(Data, ColumnIndex){
        const width = 50/(header.length-1);
        
        if(ColumnIndex!==0){
            return(
                <td 
                    key={ColumnIndex} 
                    style={{
                        "width": ColumnIndex===1 ? "50%": `${width}+%`, 
                        textAlign: ColumnIndex!==1 ? "center": "left",
                        
                    }}>
                    {
                        header.length === ColumnIndex+1 && check===true
                        ? <Checkbox onClick={handlePresence} name={`${rowIndexTemp}`}/>
                        : header.length === ColumnIndex+1 && select===true
                        ? <select style={{marginLeft: ColumnIndex!==1? "0":"10px"}} name={`${rowIndexTemp}`} value={Data} onChange={handleStatus}>
                            <option value={"adm"}>Administrador</option>
                            <option value={"approved"}>Aprovado</option>
                            <option value={"disabled"}>Desabilitado</option>
                            <option value={"pending"}>Pendente</option>
                            <option value={"rejected"}>Rejeitado</option>
                          </select>
                        : <span style={{marginLeft: ColumnIndex!==1? "0":"10px"}}>{Data}</span>
                    }
                </td>
            )
        }
    }

    return(
        <div>
            <table>
                <thead>
                    <tr>
                    {
                        header.map(renderHeader)
                    }
                    </tr>
                </thead>
                
                <tbody>
                    {
                        items.map(renderRow)
                    }
                </tbody>
            </table>
        </div>
    )
 }