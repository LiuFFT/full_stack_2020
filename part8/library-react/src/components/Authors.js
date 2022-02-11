import React from 'react'
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';

const Authors = (props) => {
    const useQuery1 = useQuery(ALL_AUTHORS)
    if (!props.show){
        return null
    }
    if (useQuery1.loading) {
        return <div>loading...</div>;
    }
    const authors = useQuery1.data.allAuthors

    return (
        <div>
            <h1>authors</h1>
            <table>
                <tbody>
                <tr>
                    <th>     </th>
                    <th>born</th>
                    <th>books</th>
                </tr>
                {authors.map(author =>
                    <tr key={author.name}>
                        <td>{author.name}</td>
                        <td>{author.born}</td>
                        <td>{author.bookCount}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )


}

export default Authors