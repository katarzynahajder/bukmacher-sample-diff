import React, {useState, Fragment} from "react"
import {nanoid} from "nanoid"
import "./RecordsContainer.css"
import data from "./mock-data.json"
import ReadOnlyRow from "./ReadOnlyRow"
import EditableRow from "./EditableRow"

const initialState={
  league: "",
  schedule: "",
  firstTeam: "",
  secondTeam: "",
  bet: "",
  exchange: "",
  bid: ""
}

const fields=[
  {name: "league", className: "long", type: "text", value: "League", input: true},
  {name: "schedule", className: "short", type: "time", value: "Schedule", input: true},
  {name: "firstTeam", className: "long", type: "text", value: "Team #1", input: true},
  {name: "secondTeam", className: "long", type: "text", value: "Team #2", input: true},
  {name: "bet", className: "long", type: "text", value: "Bet", input: true},
  {name: "exchange", className: "short", type: "text", value: "Exchange", input: true},
  {name: "bid", className: "short", type: "text", value: "Bid", input: true},
  {name: "profit", className: "short", type: "text", value: "Profit", input: false},
  {name: "state", className: "short", type: "text", value: "State", input: false}
]

const RecordsContainer=()=>{
  const [records, setRecords]=useState(data)

  const [addFormData, setAddFormData]=useState({...initialState})
  const [editFormData, setEditFormData]=useState({...initialState})

  const [editRecordId, setEditRecordId]=useState(null)

  const [totalProfit, setTotalProfit]=useState(0)

  const handleAddFormChange=(event)=>{
    event.preventDefault()
    const fieldName=event.target.getAttribute("name")
    const fieldValue=event.target.value
    const newFormData={...addFormData}
    newFormData[fieldName]=fieldValue
    setAddFormData(newFormData)
  }

  const handleEditFormChange=(event)=>{
    event.preventDefault()
    const fieldName=event.target.getAttribute("name")
    const fieldValue=event.target.value
    const newFormData={...editFormData}
    newFormData[fieldName]=fieldValue
    setEditFormData(newFormData)
  }

  const handleAddFormSubmit=(event)=>{
    event.preventDefault()
    const newRecord={
      ...addFormData,
      id: nanoid(),
      profit: "-",
      taxedProfit: "-",
      state: "On hold"
    }
    const newRecords=[...records, newRecord]
    calculateTax(newRecords)
  }

  const handleEditFormSubmit=(event)=>{
    event.preventDefault()
    const editedRecord={
      ...editFormData,
      id: editRecordId,
      state: "On hold"
    }
    const newRecords=[...records]
    const index=records.findIndex((record)=>record.id===editRecordId)
    newRecords[index]=editedRecord
    calculateTax(newRecords)
    setEditRecordId(null)
  }

  const handleEditClick=(event, record)=>{
    event.preventDefault()
    setEditRecordId(record.id)
    const formValues={...record}
    setEditFormData(formValues)
  }
  
  const handleCancelClick=()=>{
    setEditRecordId(null)
  }

  const handleDeleteClick=(recordId)=>{
    const newRecords=[...records]
    const index=records.findIndex((record)=>record.id===recordId)
    newRecords.splice(index, 1)
    calculateTax(newRecords)
    totalProfitCounter(newRecords)
  }

  const [tax, setTax]=useState(false)

  const handleTaxChange=()=>{
    setTax(!tax)
  }

  const calculateTax=(records)=>{
    let newRecords=[]
    records.forEach((record)=>{
      let profit=Number(Math.round(record.exchange*record.bid+"e+2")+"e-2")-record.bid
      let taxedProfit=Number(Math.round(record.exchange*record.bid*0.88+"e+2")+"e-2")
      if(taxedProfit>=2280)taxedProfit=Number(Math.round(taxedProfit*0.9+"e+2")+"e-2")
      taxedProfit-=record.bid
      newRecords.push({
        ...record,
        profit,
        taxedProfit
      })
    })
    setRecords(newRecords)
  }

  const totalProfitCounter=(records)=>{
    let newTotal=0
    records.forEach((record)=>{
      if(record.state==="Won"){
        if(tax)newTotal+=record.taxedProfit
        else newTotal+=record.profit
      }
      else if(record.state==="Lost")newTotal-=record.bid
    })
    newTotal=Number(Math.round(newTotal+"e+2")+"e-2")
    setTotalProfit(newTotal)
  }

  return(
    <div id="recordsContainer">
      <form onSubmit={handleAddFormSubmit}>
        <table>
          <thead id="headers-input">
            <tr>
              {fields.map(({name, className, value})=>(
                <th key={name} className={className}>
                  {value}
                </th>
              ))}
            </tr>
            <tr>
              {fields.map(({name, className, type, input})=>(
                <td key={name}>
                  {input ? (
                    <input
                      type={type}
                      name={name}
                      className={`${className}I`}
                      required
                      onChange={handleAddFormChange}
                    />
                    ) : (null)}
                </td>
              ))}
              <td><button type="submit">Add</button></td>
              <td><button type="button" className={tax ? "taxOn" : ""} onClick={handleTaxChange}>Tax</button></td>
            </tr>
            <tr>
              <td colSpan="11" style={{border: "none"}}/>
            </tr>
          </thead>
          <tbody id="data">
            {records.map((record) => (
              <Fragment>
                {editRecordId === record.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleEditFormSubmit={handleEditFormSubmit}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    record={record}
                    records={records}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    tax={tax}
                    calculateTax={calculateTax}
                    totalProfitCounter={totalProfitCounter}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
          <tfoot>
            <td colSpan="5" style={{border: "none"}} />
            <td className="totalProfit" colSpan="2">Total profit</td>
            <td className={totalProfit>0 ? "totalProfit W" : totalProfit<0 ? "totalProfit L" : "totalProfit"}>
              {totalProfit}
            </td>
          </tfoot>
        </table>
      </form>
    </div>
  )
}

export default RecordsContainer