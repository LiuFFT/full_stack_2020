import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {votes} from "../reducers/anecdoteReducer";
import {notification} from "../reducers/notificationReducer";


const Anecdote = ({anecdote, handleVote}) => {
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote =  async (anecdote) => {
        dispatch(votes(anecdote))
        // const a = anecdotes.find(ane => ane.id === id)
        dispatch(notification(`You voted '${anecdote.content}'`))
    }

    const anecdotesSorted = [...anecdotes]
    anecdotesSorted.sort((a, b) => b.votes - a.votes)

    // console.log(anecdotesSorted)

    const anecdotesAfterFilter = anecdotesSorted.filter(
        (a)=> a.content.toLowerCase().includes(filter.toLowerCase())
    )

    return (
        <div>
            {anecdotesAfterFilter.map(anecdote =>
                <Anecdote anecdote={anecdote} key={anecdote.id} handleVote={()=>vote(anecdote)}/>
            )}
        </div>
    )
}

export default AnecdoteList