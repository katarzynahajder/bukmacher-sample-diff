import React from "react"

const ReadOnlyRow=({record, handleEditClick, handleDeleteClick})=>{
  return(
    <tr>
      <td className="long">{record.league}</td>
      <td className="short">{record.schedule}</td>
      <td className="long">{record.firstTeam}</td>
      <td className="long">{record.secondTeam}</td>
      <td className="long">{record.bet}</td>
      <td className="short">{record.exchange}</td>
      <td className="short">{record.bid}</td>
      <td className="short">-</td>
      <td className="short"><button type="button">On hold</button></td>
      <td><button type="button" onClick={(event)=>handleEditClick(event, record)}>Edit</button></td>
      <td><button type="button" onClick={()=>handleDeleteClick(record.id)}>Delete</button></td>
    </tr>
  );
};

export default ReadOnlyRow;