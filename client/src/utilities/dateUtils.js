/**
 * Given a recognizable date string, eg., '2019-06-16T17:58:44.709Z' returns a user-friendly date
 * string in the local format, eg. 6/18/2019.
 * @param {String} dateString, eg., '2019-06-16T17:58:44.709Z' 
 */
export const formatDateLocal = dateString => {
    return new Date(dateString).toLocaleDateString();
};
