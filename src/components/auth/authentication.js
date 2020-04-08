export function setUserData(data) {
    localStorage.setItem('username', data.username)
    localStorage.setItem('authtoken', data._kmd.authtoken)
    localStorage.setItem('creator', data._acl.creator)
    localStorage.setItem('userId', data._id)
}
export function getUserData() {
    let isAuth = localStorage.getItem('authtoken') !== null;
    let username = localStorage.getItem('username')
    
}