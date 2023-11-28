'use client'

import Sidebar from "@/components/Sidebar";
import {nanoid} from "nanoid";
import Editor from "@/components/Editor";
import React from "react";
import { useRouter } from 'next/navigation'



export default function Home() {

    const [notes, setNotes] = React.useState( [])

    const [currentNoteId, setCurrentNoteId] = React.useState("")
    const [tempNoteText, setTempNoteText] = React.useState("")

    const sortedNotes = notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]


    function createNewNote() {

        const newNote = {
            body: "Write your note content here...",
            archived: false,
            tag:"",
        }


        fetch(`/api/notes`, {
            body: JSON.stringify(newNote),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then(res => res.json())
            .then (data => {
                setCurrentNoteId(data.note.id)
                setNotes(prevNotes => [...prevNotes, newNote])
            })

    }

    function updateNote() {
        if (!currentNote){
            return
        }
        setNotes(preNotes => preNotes)
        fetch(`/api/notes/${currentNote.id}`, {
            body: JSON.stringify({
                body: tempNoteText,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
        }).then( setNotes( oldNotes => {
             const newArray = []
             for(let i = 0; i < oldNotes.length; i++) {
                 const oldNote = oldNotes[i]
                 if(oldNote.id === currentNoteId) {
                     newArray.unshift({ ...oldNote, body: tempNoteText })
                 } else {
                     newArray.push(oldNote)
                 }
             }
             return newArray
         }))
    }

    function deleteNote(event,id){
        fetch(`http://localhost:3000/api/notes/${id}`, {method: 'DELETE'})
            .then(setNotes(oldNotes => oldNotes.filter(oldNote => oldNote.id !== id)))

    }

    function archiveNote(){
        fetch(`/api/notes/${currentNote.id}`, {
            body: JSON.stringify({
                archived: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
        }).then(setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId ? {...oldNote, archived: true } : oldNote
        })))

    }
    function unarchiveNote(){
        fetch(`/api/notes/${currentNote.id}`, {
            body: JSON.stringify({
                archived: false,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
        }).then(setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId ? {...oldNote, archived: false } : oldNote
        })))

    }
    function selectTag(event){
        event.stopPropagation()
        setNotes(preNotes => preNotes)
        fetch(`/api/notes/${currentNote.id}`, {
            body: JSON.stringify({
                tag: event.target.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
        }).then()
    }

    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    React.useEffect(() => {
        if (currentNote) {
            setTempNoteText(currentNote.body)
        }
    }, [currentNote])

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if ( tempNoteText !== currentNote?.body) {

                updateNote(tempNoteText)

            }
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [tempNoteText])

    React.useEffect(() => {
        fetch('http://localhost:3000/api/notes', {cache: 'no-store'})
            .then((res) => res.json())
            .then((dat) => {
                setNotes(dat)

            })
    }, [])


    return (
        <main>
            <div className="container-fluid">
                <div className="row vh-100 p-0" >
                    <Sidebar
                        notes={sortedNotes}
                        currentNote={currentNote}
                        setCurrentNoteId={setCurrentNoteId}
                        createNewNote={createNewNote}
                        deleteNote={deleteNote}
                        archiveNote={archiveNote}
                        unarchiveNote={unarchiveNote}
                        selectTag={selectTag}
                    />
                    <div className="col-lg-9 col-md-6 h-100 position-relative bg-light">
                        {notes.length === 0 ? <h1 className="position-absolute top-50 start-50 translate-middle">No hay notas</h1> :
                            <Editor
                                tempNoteText={tempNoteText}
                                setTempNote={setTempNoteText}
                            />
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}