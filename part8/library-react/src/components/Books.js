import React, {useEffect, useState} from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
    const useQuery1 = useQuery(ALL_BOOKS)
    const [books, setBooks] = useState([])
    const [filter, setFilter] = useState(null);

    useEffect(() => {
        if (useQuery1.data) {
            setBooks(useQuery1.data.allBooks)
        }
    }, [useQuery1])

    if (useQuery1.loading) {
        return <div>loading...</div>;
    }

    if (!props.show){
        return null
    }

    let bookGenres = []
    books.forEach(book => {
        book.genres.forEach((genre) => {
            if (!bookGenres.includes(genre)) {
                bookGenres.push(genre);
            }
        });
    });

    const filterBooks = filter ? books.filter(book => book.genres.includes(filter))
                               : books

    return (
        <div>
            <h1>Books</h1>
            <div>
                <p>
                    in genre <strong>{filter ? filter : "all genres"}</strong>
                </p>
            </div>
            <table>
                <tbody>
                <tr>
                    <th>title</th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {filterBooks.map(book =>
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author.name}</td>
                        <td>{book.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <div>
                {bookGenres.map(genre => (
                    <button key={genre} onClick={()=>setFilter(genre)}>{genre}</button>
                ))
                }

                <button onClick={() => setFilter(null)}>all genres</button>
            </div>
        </div>
    )


}

export default Books