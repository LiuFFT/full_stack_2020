import React from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
    const useQuery1 = useQuery(ALL_BOOKS)
    if (!props.show){
        return null
    }
    if (useQuery1.loading) {
        return <div>loading...</div>;
    }
    const books = useQuery1.data.allBooks

    return (
        <div>
            <h1>Books</h1>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books.map(book =>
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author.name}</td>
                        <td>{book.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )


}

export default Books