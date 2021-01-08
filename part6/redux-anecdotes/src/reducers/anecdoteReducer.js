import anecdoteService from "../services/anecdotes"

// const anecdotesAtStart = [
//     'If it hurts, do it more often',
//     'Adding manpower to a late software project makes it later!',
//     'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//     'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//     'Premature optimization is the root of all evil.',
//     'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//     return {
//         content: anecdote,
//         id: getId(),
//         votes: 0
//     }
// }
//
// const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'VOTE':{
            const voteToChange = state.find(n => n.id === action.data.id)
            voteToChange.votes += 1
            return state.map(vote =>
                vote.id === action.data.id ? voteToChange : vote
            )
        }
        case 'ADD_ANECDOTE': {
            return [...state, action.data]
        }
        case 'INIT_DATA': {
            return action.data
        }
        default:
            return state

    }
}

export const votes = (anecdote) => {
    // return {
    //     type: 'VOTE',
    //     data: { id }
    // }
    return async dispatch => {
        dispatch({
            type: 'VOTE',
            data: anecdote
        })
        await anecdoteService.updateAnecdote(anecdote)

    }
}

export const addAnecdote = (content) => {
    // return {
    //     type: 'ADD_ANECDOTE',
    //     data,
    // }
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
                type: 'ADD_ANECDOTE',
                data: newAnecdote
        })
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_DATA',
            data: anecdotes
        })
    }
}

export default anecdoteReducer