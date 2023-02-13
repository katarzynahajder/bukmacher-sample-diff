import React from "react"

const ReadOnlyRow=({record, records, setRecords, handleEditClick, handleDeleteClick, tax})=>{
  const stateChange=()=>{
    let profit="-"
    switch(record.state){
      case "On hold":
        profit=Number(Math.round(record.exchange*record.bid+"e+2")+"e-2")-record.bid
        if(tax)profit=Number(Math.round(record.exchange*record.bid*0.88+"e+2")+"e-2")-record.bid
        if(tax&&(profit>=2280))profit=Number(Math.round(profit*0.9+"e+2")+"e-2")-record.bid
        handleStateProfitChange("Won", profit)
        break
      case "Won":
        profit=0-record.bid
        handleStateProfitChange("Lost", profit)
        break
      case "Lost":
        profit=0
        handleStateProfitChange("Return", profit)
        break;
      case "Return":
        handleStateProfitChange("On hold", profit)
        break
      default:
        console.log("No match found")
        break
      }
  }

  const handleStateProfitChange=(state, profit)=>{
    const updatedRecord={
      id: record.id,
      league: record.league,
      schedule: record.schedule,
      firstTeam: record.firstTeam,
      secondTeam: record.secondTeam,
      bet: record.bet,
      exchange: record.exchange,
      bid: record.bid,
      profit: profit,
      state: state
    }
    const newRecords=[...records]
    const index=records.findIndex((x)=>x.id===record.id)
    newRecords[index]=updatedRecord
    setRecords(newRecords)
  }

  let stateClass=""

  if(record.state==="Won")stateClass=record.state
  else if(record.state==="Lost")stateClass=record.state
  else if(record.state==="Return")stateClass=record.state

  return(
    <tr>
      <td className="long">{record.league}</td>
      <td className="short">{record.schedule}</td>
      <td className="long">{record.firstTeam}</td>
      <td className="long">{record.secondTeam}</td>
      <td className="long">{record.bet}</td>
      <td className="short">{record.exchange}</td>
      <td className="short">{record.bid}</td>
      <td className="short">{record.profit}</td>
      <td className="short"><button type="button" className={stateClass} onClick={stateChange}>{record.state}</button></td>
      <td><button type="button" onClick={(event)=>handleEditClick(event, record)}>Edit</button></td>
      <td><button type="button" onClick={()=>handleDeleteClick(record.id)}>Delete</button></td>
    </tr>
  )
}

export default ReadOnlyRow