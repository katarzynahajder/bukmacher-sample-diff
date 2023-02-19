import React, {useState} from "react"
import "./NotesArea.css"

const NotesArea=()=>{
    const [notes, setNotes]=useState("")
    return(
        <div id="notesArea">
            <h4>NOTES</h4>
            <textarea name="notes" rows="10" value={notes} onChange={e=>setNotes(e.target.value)}></textarea>
        </div>
    )
}

export default NotesArea