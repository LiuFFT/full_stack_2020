import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {ALL_AUTHORS, EDIT_AUTHOR} from "../queries";
import Select from 'react-select';

const AuthorForm = ({data}) => {
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

    const options = data.map(author => ({
        value: author.name,
        label: author.name,
    }));

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submitEditAuthor}>
                <Select name="name"
                        options={options}
                        onChange={({ value }) =>  setName(value)}
                />
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