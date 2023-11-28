'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles


const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });


export default function Editor(props) {

    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ align: [] }],
            [{ color: [] }],
            ['code-block'],
            ['clean'],
        ],
    };

    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'align',
        'color',
        'code-block',
    ];


    return (
        <main>
            <div className="vh-75 w-screen flex items-center flex-col p-0 ">

                <div className="h-100 w-[90vw]">
                    <QuillEditor
                        value={props.tempNoteText }
                        onChange={props.setTempNote}
                        modules={quillModules}
                        formats={quillFormats}
                        className="w-full h-100 mt-4 bg-white"
                    />
                </div>
            </div>
        </main>
    );
}