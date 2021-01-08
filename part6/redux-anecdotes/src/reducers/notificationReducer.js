const notificationReducer = (state=null,action)=>{
    switch (action.type) {
        case 'INIT': {
            return null
        }
        case 'NEW_NOTIFICATION':{
            return action.data
        }
        case 'CLEAR_NOTIFICATION': {
            return null
        }
        default:
            return state
    }
}

export const notification = (msg) => {
    return  (dispatch)=>{
        dispatch({
            type:'NEW_NOTIFICATION',
            data: msg
        })

        setTimeout(() => dispatch({
                type: 'CLEAR_NOTIFICATION'
        }), 1000 * 5)

    }
}

export default notificationReducer