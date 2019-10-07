const initialState = {
    menuList: [],
    isLoading: false,
    isRejected: false,
    isFullfilled:false,
}

const menuList = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_MENU_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFullfilled:false,
            }
        case 'GET_MENU_FULFILLED':
            

    }
}