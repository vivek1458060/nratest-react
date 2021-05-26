const modalReducer = (state = { show: false, content: '' }, action) => {
    switch (action.type) {
        case 'SHOW':
            return {
                show: true,
                content: action.content
            }
        case 'HIDE':
            return {
                show: false
            }
        default:
            return state;
    }
}

export default modalReducer;