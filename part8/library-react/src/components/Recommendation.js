import { useApolloClient, useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';
import React, {useEffect, useState} from "react";

const Recommendation = (props) => {
    const useQuery1 = useQuery(ALL_BOOKS)
    const [books, setBooks] = useState([])

    const userQuery = useQuery(ME)

    useEffect(() => {
        if (useQuery1.data) {
            setBooks(useQuery1.data.allBooks)
        }
    }, [useQuery1])

    if (useQuery1.loading || userQuery.loading) {
        return <div>loading...</div>;
    }

    if (!props.show) {
        return null
    }
    // console.log("userQuery data: " + data.me)
    // console.log("user: "+user)
    // console.log("books: "+books)

    const favoriteGenre = userQuery.data.me.favoriteGenre;

    const recommendations = books.filter((book) =>
        book.genres.includes(favoriteGenre)
    );


    return (
        <div>
            <h1>Recommendations</h1>
            <div>
                <p>
                    books in your favourite genre: <strong>{favoriteGenre}</strong>
                </p>
            </div>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {recommendations.map(book => <tr key={book.title}>
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

export default Recommendation