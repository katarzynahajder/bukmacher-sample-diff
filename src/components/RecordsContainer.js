import React, {useState, Fragment} from "react"
import {nanoid} from "nanoid"
import "./RecordsContainer.css"
import data from "./mock-data.json"
import ReadOnlyRow from "./ReadOnlyRow"
import EditableRow from "./EditableRow"

const RecordsContainer=()=>{
  const [records, setRecords]=useState(data);
  const [addFormData, setAddFormData]=useState({
    league: "",
    schedule: "",
    firstTeam: "",
    secondTeam: "",
    bet: "",
    exchange: "",
    bid: ""
  });

  const [editFormData, setEditFormData]=useState({
    league: "",
    schedule: "",
    firstTeam: "",
    secondTeam: "",
    bet: "",
    exchange: "",
    bid: ""
  });

  const [editRecordId, setEditRecordId]=useState(null);

  const handleAddFormChange=(event)=>{
    event.preventDefault();
    const fieldName=event.target.getAttribute("name");
    const fieldValue=event.target.value;
    const newFormData={ ...addFormData };
    newFormData[fieldName]=fieldValue;
    setAddFormData(newFormData);
  };

  const handleEditFormChange=(event)=>{
    event.preventDefault();
    const fieldName=event.target.getAttribute("name");
    const fieldValue=event.target.value;
    const newFormData={ ...editFormData };
    newFormData[fieldName]=fieldValue;
    setEditFormData(newFormData);
  };

  const handleAddFormSubmit=(event)=>{
    event.preventDefault();
    const newRecord={
      id: nanoid(),
      league: addFormData.league,
      schedule: addFormData.schedule,
      firstTeam: addFormData.firstTeam,
      secondTeam: addFormData.secondTeam,
      bet: addFormData.bet,
      exchange: addFormData.exchange,
      bid: addFormData.bid,
      profit: "-",
      state: "On hold",
    };
    const newRecords=[...records, newRecord];
    setRecords(newRecords);
  };

  const handleEditFormSubmit=(event)=>{
    event.preventDefault();
    const editedRecord={
      id: editRecordId,
      league: editFormData.league,
      schedule: editFormData.schedule,
      firstTeam: editFormData.firstTeam,
      secondTeam: editFormData.secondTeam,
      bet: editFormData.bet,
      exchange: editFormData.exchange,
      bid: editFormData.bid,
      profit: "-",
      state: "On hold"
    };
    const newRecords=[...records];
    const index=records.findIndex((record)=>record.id===editRecordId);
    newRecords[index]=editedRecord;
    setRecords(newRecords);
    setEditRecordId(null);
  };

  const handleEditClick=(event, record)=>{
    event.preventDefault();
    setEditRecordId(record.id);
    const formValues={
      league: record.league,
      schedule: record.schedule,
      firstTeam: record.firstTeam,
      secondTeam: record.secondTeam,
      bet: record.bet,
      exchange: record.exchange,
      bid: record.bid
    };
    setEditFormData(formValues);
  };

  const handleCancelClick=()=>{
    setEditRecordId(null);
  };

  const handleDeleteClick=(recordId)=>{
    const newRecords=[...records];
    const index=records.findIndex((record)=>record.id===recordId);
    newRecords.splice(index, 1);
    setRecords(newRecords);
  };

  const [tax, setTax]=useState(false);

  const handleTaxChange=()=>{
    setTax(!tax);
    console.log(!tax)
  }

  return(
    <div id="recordsContainer">
      <form onSubmit={handleAddFormSubmit}>
        <table id="headers-input">
          <thead>
            <tr>
              <th className="long">League</th>
              <th className="short">Schedule</th>
              <th className="long">Team #1</th>
              <th className="long">Team #2</th>
              <th className="long">Bet</th>
              <th className="short">Exchange</th>
              <th className="short">Bid</th>
              <th className="short">Profit</th>
              <th className="short">State</th>
            </tr>
            <tr>
              <td className="long"><input type="text" name="league" className="longI" required="required" onChange={handleAddFormChange} /></td>
              <td className="short"><input type="time" name="schedule" className="shortI" required="required" onChange={handleAddFormChange} /></td>
              <td className="long"><input type="text" name="firstTeam"  className="longI"required="required" onChange={handleAddFormChange} /></td>
              <td className="long"><input type="text" name="secondTeam" className="longI" required="required" onChange={handleAddFormChange} /></td>
              <td className="long"><input type="text" name="bet" className="longI" required="required" onChange={handleAddFormChange} /></td>
              <td className="short"><input type="text" name="exchange" className="shortI" required="required" onChange={handleAddFormChange} /></td>
              <td className="short"><input type="text" name="bid" className="shortI" required="required" onChange={handleAddFormChange} /></td>
              <td className="short"></td>
              <td className="short"></td>
              <td><button type="submit">Add</button></td>
              <td><button type="button" className={tax ? "taxOn" : ""} onClick={handleTaxChange}>Tax</button></td>
            </tr>
          </thead>
        </table>
      </form>
      <form onSubmit={handleEditFormSubmit}>
        <table id="data">
          <tbody>
            {records.map((record) => (
              <Fragment>
                {editRecordId === record.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    record={record}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    tax={tax}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
          <tfoot>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="totalProfit" colSpan="2">Total profit</td>
            <td className="totalProfit"></td>
          </tfoot>
        </table>
      </form>
    </div>
  );
};

export default RecordsContainer;