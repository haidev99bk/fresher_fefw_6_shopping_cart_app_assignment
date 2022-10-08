import { CHECKING_OUT, DONE_CHECK_OUT, TOGGLE_CHECKING_OUT, TOGGLE_CHECK_OUT } from "../types";

const INITSTATE = {
    checking_out: false,
    done_check_out: false
}
const checkOutReducer = (state = INITSTATE, action: any) => {
    switch(action.type) {
        case CHECKING_OUT: {
            return {
                ...state,
                checking_out: true
            }
        }
        case TOGGLE_CHECKING_OUT: {
            return {
                ...state,
                checking_out: false
            }
        }
        case DONE_CHECK_OUT:
            return {
                ...state,
                done_check_out: true,
            }
        case TOGGLE_CHECK_OUT:
            return {
                ...state,
                done_check_out: false,
                checking_out: false
            }
        default: return state;
    
    }
}
export default checkOutReducer;