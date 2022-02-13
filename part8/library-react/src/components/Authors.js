import React, {useEffect, useState} from 'react'
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import AuthorForm from "./AuthorForm";

const Authors = (props) => {
    const useQuery1 = useQuery(ALL_AUTHORS)
    const [authors, setAuthors] = useState([])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (useQuery1.data) {
            setAuthors(useQuery1.data.allAuthors)
        }
    }, [useQuery1])


    if (useQuery1.loading) {
        return <div>loading...</div>;
    }

    if (!props.show){
        return null
    }


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
                    <tr key={author.id}>
                        <td>{author.name}</td>
                        <td>{author.born}</td>
                        <td>{author.bookCount}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <AuthorForm data = {authors}/>
        </div>
    )


}

export default Authors