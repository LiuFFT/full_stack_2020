import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)

    const points = [0, 0, 0, 0, 0, 0]

    const [votes, setVotes]= useState(points)


    console.log(votes.indexOf(Math.max.apply(null, votes)))

    const mostVotes = votes.indexOf(Math.max.apply(null, votes))

    const handleClick = () => {
        setSelected(Math.floor( Math.random() * 6 ))
        console.log(selected)
    }

    const handleAddVoteClick = () => {
        const copy = [...votes]

        copy[selected] += 1

        setVotes(copy)

    }


    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <Button text="vote" onClick={handleAddVoteClick}/>
            <Button text="next anecdotes" onClick={handleClick}/>

            <h1>Anecdote with most votes</h1>
            <p>{props.anecdotes[mostVotes]} has {votes[mostVotes]} votes</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)