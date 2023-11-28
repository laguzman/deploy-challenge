'use client'
import {nanoid} from "nanoid";
import React from "react";
import styles from "./components.module.css"

export default function Sidebar(props){

    function createNoteElement(note, type) {
        return (
            <div key={note.id}  className="active">
                <div role="button" className={`${styles.note} d-flex col-12 p-4 ${props.currentNote.id === note.id ? "bg-primary bg-gradient text-white": ""}`}  onClick={() => {
                    console.log(props.currentNote.id)
                    props.setCurrentNoteId(note.id)
                }}>
                    <h6 className="m-auto text-truncate w-75">{note.body.replace(/<[^>]+>/g, '')}</h6>
                    <select className="form-select form-select-sm w-25" aria-label=".form-select-sm example" onChange={props.selectTag} defaultValue={`${note.tag}`}>
                        <option value="">Tag</option>
                        <option value="High Priority" onClick={event => event.stopPropagation()}>High priority</option>
                        <option value="Groceries" onClick={event => event.stopPropagation()}>Groceries</option>
                        <option value="Three" onClick={event => event.stopPropagation()}>Three</option>
                    </select>

                    <svg xmlns="http://www.w3.org/2000/svg"
                         onClick={type}
                         width="16" height="16" fill="currentColor"
                         className="bi bi-archive-fill m-auto ms-2" viewBox="0 0 16 16">
                        <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                    </svg>
                    <svg
                        onClick={event => props.deleteNote(event, note.id)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor"
                        className="bi bi-trash-fill ms-2 m-auto" viewBox="0 0 16 16 ">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>


                </div>
            </div>
        )
    }
    const noteElement = props.notes.filter(note => {
        return !note.archived
    }).map(note => {

        return (
            createNoteElement(note, props.archiveNote)
        )

    })
    const noteElementArchived = props.notes.filter(note => {
        return note.archived
    }).map(note => {

        return (
            createNoteElement(note, props.unarchiveNote)
        )

    })

    return (
        <div className="col-lg-3 col-md-6  h-100 p-0 " >
            <div className=" col-12 d-flex justify-content-between ps-5 pe-5  bg-dark-subtle" style={{height:"15vh"}}>
                <h2 className="align-self-center" >Notes</h2>
                <button type="button " onClick={props.createNewNote} className="btn btn-primary align-self-center">Add new note +</button>
            </div>
            <ul className="nav nav-tabs bg-dark-subtle" id="myTab" role="tablist" >
                <li className="nav-item" role="presentation">
                    <button className="nav-link active " id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Notes</button>
                </li>
                <li className="nav-item " role="presentation">
                    <button className="nav-link " id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Archived</button>
                </li>

            </ul>
            <div className=" tab-content overflow-auto" id="myTabContent" style={{height:"80vh"}}>
                <div className=" tab-pane  fade show active  p-0 m-0"  id="home" role="tabpanel" aria-labelledby="home-tab">
                    {noteElement}
                </div>
                <div className=" tab-pane  fade show  p-0 m-0"  id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    {noteElementArchived}
                </div>

            </div>

        </div>

    )
}