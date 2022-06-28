import { Checkbox } from "@mui/material";
import "./List.module.css";

 export default function List({header, items, check, handlePresence}){

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
        
        return(
            <td 
                key={ColumnIndex} 
                style={{
                    "width": ColumnIndex===0 ? "50%": `${width}+%`, 
                    textAlign: ColumnIndex!==0 ? "center": "left",
                    
                }}>
                {
                    header.length === ColumnIndex+2 && check===true
                    ? <Checkbox onClick={handlePresence} name={`${rowIndexTemp}`}/>
                    : <span style={{marginLeft: ColumnIndex!==0? "0":"10px"}}>{Data}</span>
                }
            </td>
        )
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