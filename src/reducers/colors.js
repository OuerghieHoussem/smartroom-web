const colors = (state={r:0,g:0,b:0},action) => {
    switch(action.type){
        case 'r':
            return {...state,r:action.payload}
        case 'g':
            return {...state,g:action.payload}
        case 'b':
            return {...state,b:action.payload}
        default:
            return state
    }
}

export default colors