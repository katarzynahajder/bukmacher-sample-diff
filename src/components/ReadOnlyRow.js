import React, {useState} from "react"

const ReadOnlyRow=({record, handleEditClick, handleDeleteClick, tax})=>{
  const [state, setState]=useState(record.state)

  const handleStateChange=()=>{
    switch(state){
      case "On hold":
        setState("Won")
        break;
      case "Won":
        setState("Lost")
        break;
      case "Lost":
        setState("Return")
        break;
      case "Return":
        setState("On hold")
        break;
      default:
        console.log("No match found")
        break;
      }
  }

  let stateClass=""
  let bid=record.bid
  let profit="-"

  if(state==="Won"){
    stateClass=state
    profit=Number(Math.round(record.exchange*bid+"e+2")+"e-2")
    if(tax){
      bid*=0.88
      profit=Number(Math.round(record.exchange*bid+"e+2")+"e-2")
    }
    if(tax&&(profit>=2280))profit=Number(Math.round(profit*0.9+"e+2")+"e-2")
    profit-=record.bid
  }
  else if(state==="Lost"){
    stateClass=state
    profit=0-bid
  }
  else if(state==="Return"){
    stateClass=state
    profit=0
  }
  return(
    <tr>
      <td className="long">{record.league}</td>
      <td className="short">{record.schedule}</td>
      <td className="long">{record.firstTeam}</td>
      <td className="long">{record.secondTeam}</td>
      <td className="long">{record.bet}</td>
      <td className="short">{record.exchange}</td>
      <td className="short">{record.bid}</td>
      <td className="short">{profit}</td>
      <td className="short"><button type="button" className={stateClass} onClick={handleStateChange}>{state}</button></td>
      <td><button type="button" onClick={(event)=>handleEditClick(event, record)}>Edit</button></td>
      <td><button type="button" onClick={()=>handleDeleteClick(record.id)}>Delete</button></td>
    </tr>
  );
};

export default ReadOnlyRow;