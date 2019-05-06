import { FETCH_USER } from '../actions/types';

/**
 * States:
 * 1. Set default return value to null indicating we do not yet know whether or not user is logged in.
 * 2. When we have gotten a response from our Ajax call (FETCH_USER case) it will either be a User object
 *    (action.payload) or the empty string in which case we want to return false.
 */
export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}