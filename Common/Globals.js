import DatabaseConnector from "../Database/DatabaseConnector.js";
import User from "./User.js";
import AlertComponent from "../Components/AlertComponent.js";

let user = null;

export function getUser() 
{
    return user;
}

// Move to UtilityFunctions ??
export async function login(userInfo)
{
    const email = userInfo.email;
    const password = userInfo.password;
    
    if(!email || !password)
    {
        return false;
    }

    const query = `SELECT * FROM user WHERE email='${email}' AND password='${password}';`;
    const result = await DatabaseConnector.executeQuery(query);
    const rows = result.rows;
    
    if(rows.length == 0)
    { 
        return false;
    }
    
    user = new User(email);
    const headerComponent = document.querySelector("header-component");
    headerComponent.showLogoutButton();
    return true;
}

export async function logout()
{
    user = null;
    const headerComponent = document.querySelector("header-component");
    headerComponent.hideLogoutButton();
    window.clearAndOpenPage("login-signup-screen");

}

export function createAlert(message, callback=()=>{})
{
    const alertComponent = document.createElement("alert-component");
    alertComponent.setAttribute("message", message);
    alertComponent.setCallback(callback);
    document.body.appendChild(alertComponent);
}

