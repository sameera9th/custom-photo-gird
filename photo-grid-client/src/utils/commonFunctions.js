export const setLocaStorage = data => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.user.email);
}