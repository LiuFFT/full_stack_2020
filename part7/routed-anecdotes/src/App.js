import React, { useState } from 'react'
import { Route, Switch, useRouteMatch,useHistory } from "react-router-dom";
// import {Route, BrowserRouter as Router} from ‘react-router-dom’;

import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import Anecdote from "./components/Anecdote";
import CreateNew from "./components/CreateNew";
import About from "./components/About";
import Footer from "./components/Footer";

// import { useField } from "./hooks";


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const history = useHistory()
  let timeoutId = null
    // eslint-disable-next-line
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    history.push('/')

    clearTimeout(timeoutId)
    setNotification(`a new anecdote ${anecdote.content} is created!`)
    timeoutId = setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
      ? anecdotes.find(anecdote => Number(anecdote.id) === Number(match.params.id))
      : null

  return (
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <div>{notification}</div>
        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdote={anecdote} vote={vote} />
          </Route>
          <Route path="/create">
            <CreateNew addNew={addNew} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
        <Footer />
      </div>
  )
}

export default App;
