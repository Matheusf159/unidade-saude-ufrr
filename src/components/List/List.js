import { Checkbox } from "@mui/material";
import "./List.module.css";

 export default function List({header, items, check, handlePresence}){
    
    function renderHeader(Data, index){
        return(
            <th key={index}>{Data}</th>
        )
    }

    function renderRow(Data, index){
        return(
            <tr key={index}>
                {
                    Data.map(renderBody)
                }
            </tr>
        )
    }

    function renderBody(Data, index ){
        const width = 50/(header.length-1);
        console.log(index);
        return(
            <td key={index} style={{"width": index===0 ? "50%": `${width}+%`, textAlign: index!==0 ? "center": "left"}}>
                {
                    header.length === index+1 && check===true
                    ? <Checkbox onClick={handlePresence} name={`${index}`}/>
                    : Data
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