import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {ALL_AUTHORS, EDIT_AUTHOR} from "../queries";

const AuthorForm = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [editAuthor] = useMutation(EDIT_AUTHOR,
{
        refetchQueries: [{ query: ALL_AUTHORS }]
    });


    const submitEditAuthor = (event) => {
        event.preventDefault()
        editAuthor({
            variables: {name, born: parseInt(born)}
        })
        setBorn("")
        setName("")
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submitEditAuthor}>
                <div>
                    name
                    <input value={name} onChange={({ target }) => setName(target.value)}/>
                </div>
                <div>
                    born
                    <input value={born} onChange={({ target }) => setBorn(target.value)}/>
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default AuthorForm