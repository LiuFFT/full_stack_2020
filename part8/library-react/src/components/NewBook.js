import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import {ADD_BOOK, ALL_AUTHORS, ALL_BOOKS} from '../queries';

const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [addBook] = useMutation(ADD_BOOK,
    {
            refetchQueries: [
                {query: ALL_AUTHORS},
                {query: ALL_BOOKS}
            ]
        })

    if (!props.show) {
        return null;
    }

    const submit = async (event) => {
        event.preventDefault()

        addBook({
            variables: {title, author, published, genres}
        })

        setTitle('')
        setAuthor('')
        setPublished('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    Title
                    <input value={title} onChange={({ target }) => setTitle(target.value)}/>
                </div>
                <div>
                    Author
                    <input value={author}
                           onChange={({ target }) => setAuthor(target.value)}/>
                </div>
                <div>
                    Published
                    <input
                        type="number" value={published}
                        onChange={({ target }) => setPublished(parseInt(target.value))}/>
                </div>
                <div>
                    Genre
                    <input value={genre} onChange={({ target }) => setGenre(target.value)}/>
                    <button onClick={addGenre} type="button">Add genre</button>
                </div>
                <div>
                    genres: {genres.join(' ')}
                </div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}

export default NewBook