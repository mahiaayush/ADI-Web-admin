const removeHyphen = (userData) => {
    Object.keys(userData).forEach((key) => {
        if (userData[key] === '-') {
            userData[key] = "";
        }
        // return userData[key];
    })
}
export default removeHyphen;