export function setUserData(data) {
    localStorage.setItem('username', data.username)
    localStorage.setItem('authtoken', data._kmd.authtoken)
    localStorage.setItem('creator', data._acl.creator)
}
export function getUserData(data) {
    data.isAuth = localStorage.getItem('authtoken') !== null;
    data.username = localStorage.getItem('username')
}