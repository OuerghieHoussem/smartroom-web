const smooth = (state=false,action) => {
    switch(action.type){
        case "setSmooth":
            return action.payload
        case 'toggle':
            return !state

        default:
            return state
    }
}

export default smooth