import { FETCH_SURVEYS } from '../actions/types';

/**
 * States:
 * 1. Set default return value to an empty array indicating when app first boots up, we do not yet have a list of surveys.
 * 2. When we have gotten a response from our Ajax call (FETCH_SURVEYS case) it will be an array of surveys passed in the
 *    action.payload which we want to return immediately.
 */
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_SURVEYS: return action.payload;
        default: return state;
    }
}