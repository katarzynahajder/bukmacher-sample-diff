import React from "react"

const EditableRow=({editFormData, handleEditFormChange, handleEditFormSubmit, handleCancelClick})=>{
  return(
    <tr>
      <td><input type="text" name="league" className="longI" required="required" value={editFormData.league} onChange={handleEditFormChange}></input></td>
      <td><input type="time" name="schedule" className="shortI" required="required" value={editFormData.schedule} onChange={handleEditFormChange}></input></td>
      <td><input type="text" name="firstTeam" className="longI" required="required" value={editFormData.firstTeam} onChange={handleEditFormChange}></input></td>
      <td><input type="text" name="secondTeam" className="longI" required="required" value={editFormData.secondTeam} onChange={handleEditFormChange}></input></td>
      <td><input type="text" name="bet" className="longI" required="required" value={editFormData.bet} onChange={handleEditFormChange}></input></td>
      <td><input type="text" name="exchange" className="shortI" required="required" value={editFormData.exchange} onChange={handleEditFormChange}></input></td>
      <td><input type="text" name="bid" className="shortI" required="required" value={editFormData.bid} onChange={handleEditFormChange}></input></td>
      <td></td>
      <td></td>
      <td><button type="button" onClick={handleEditFormSubmit}>Save</button></td>
      <td><button type="button" onClick={handleCancelClick}>Cancel</button></td>
    </tr>
  );
};

export default EditableRow