// components/custom-editor.js

import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
    ]
};

function New( props ) {
    return (
        <div className="m-4 p-0">
            <CKEditor
                editor={ Editor }
                config={ editorConfiguration }
                data={ props.currentNote.body }
                onChange={ (event, editor ) => {

                    const data = editor.getData();
                    props.updateNote(data, props.currentNote.id)
                    console.log( { event, editor, data } );
                } }
            />
        </div>

    )
}

export default New;
