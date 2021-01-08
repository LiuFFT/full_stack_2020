const initialState = ['TEST']

const notificationReducer = ((state=initialState,action)=>{
    switch (action.type) {
        case 'INIT': {
            return initialState
        }
        case 'NEW_NOTIFICATION':{
            return [...state, action.data]
        }
        // case 'CLEAR_NOTIFICATION': {
        // }
        default:
            return state
    }
})

export const init = () => {
    return {
        type: 'INIT'
    }
}

export default notificationReducer