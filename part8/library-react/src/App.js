import React, { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from "@apollo/client";

import Authors from './components/Authors'
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendation from "./components/Recommendation";
import {BOOK_ADDED} from "./queries";

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const apolloClient = useApolloClient()

    useEffect(() => {
        const token = localStorage.getItem('library-user-token')
        console.log(token)
        if (token){
            setToken(token)
        }
    }, [])

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            console.log(subscriptionData)
        }
    })

    const logout = () => {
        setToken(null)
        localStorage.clear()
        apolloClient.resetStore()
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                { !token
                    ? <button onClick={() => setPage('login')}>login</button>
                    : <span>
                        <button onClick={() => setPage('addBook')}>add book</button>
                        <button onClick={() => setPage('recommendations')}>recommendations</button>
                        <button onClick={logout}>logout</button>
                      </span>
                }
            </div>
            <Authors
                show = {page === "authors"}
            />
            <Books
                show = {page === "books"}
            />
            <NewBook
                show = {page === "addBook"}
            />
            <LoginForm
                show = {page === "login"}
                setToken={setToken}
                setError={error => console.log(error)}
                setPage={setPage}
            />

            <Recommendation
                show={page === 'recommendations'}
            />

        </div>
    )
}
export default App;
