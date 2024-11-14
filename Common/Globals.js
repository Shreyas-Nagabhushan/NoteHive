import User from "./User.js";

let user = null;

export function getUser() 
{
    return user;
}

export function login(email)
{
    user = new User(email);
}
