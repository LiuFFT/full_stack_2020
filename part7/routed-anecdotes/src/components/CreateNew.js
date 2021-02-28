import React from "react";
import { useField } from "../hooks";

const CreateNew = (props) => {
    const { onReset: contentValue, ...content } = useField('content')
    const { onReset: authorValue, ...author } = useField('author')
    const { onReset: infoValue, ...info } = useField('info')


    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content,
            author,
            info,
            votes: 0
        })
    }

    const handleReset = () => {
        contentValue()
        authorValue()
        infoValue()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                <button type='submit'>create</button>
                <button type="onReset" onClick={handleReset}>
                    reset
                </button>
            </form>
        </div>
    )

}

export default CreateNew