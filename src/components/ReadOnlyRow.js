import React from "react"

const ReadOnlyRow=({record, records, handleEditClick, handleDeleteClick, tax, calculateTax, totalProfitCounter})=>{
  const stateChange=()=>{
    switch(record.state){
      case "On hold":
        handleStateProfitChange("Won")
        break
      case "Won":
        handleStateProfitChange("Lost")
        break
      case "Lost":
        handleStateProfitChange("Return")
        break;
      case "Return":
        handleStateProfitChange("On hold")
        break
      default:
        console.log("No match found")
        break
      }
  }

  const handleStateProfitChange=(state)=>{
    const updatedRecord={
      ...record,
      state
    }
    const newRecords=[...records]
    const index=records.findIndex((x)=>x.id===record.id)
    newRecords[index]=updatedRecord
    calculateTax(newRecords)
  }

  totalProfitCounter(records)

  return(
    <tr>
      <td className="long">{record.league}</td>
      <td className="short">{record.schedule}</td>
      <td className="long">{record.firstTeam}</td>
      <td className="long">{record.secondTeam}</td>
      <td className="long">{record.bet}</td>
      <td className="short">{record.exchange}</td>
      <td className="short">{record.bid}</td>
      <td className="short">
        {record.state==="On hold" && "-"}
        {record.state==="Won" && (tax ? record.taxedProfit : record.profit)}
        {record.state==="Lost" && -record.bid}
        {record.state==="Return" && 0}
      </td>
      <td className="short"><button type="button" className={record.state} onClick={stateChange}>{record.state}</button></td>
      <td><button type="button" onClick={(event)=>handleEditClick(event, record)}>Edit</button></td>
      <td><button type="button" onClick={()=>handleDeleteClick(record.id)}>Delete</button></td>
    </tr>
  )
}

export default ReadOnlyRow