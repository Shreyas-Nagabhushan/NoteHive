import { attributeConstraints } from "./Constants/AttributeConstraints.js";
import { roles } from "./Constants/Roles.js";

export function validateUserInfo(userInfo)
{
    if(!userInfo.name || 
        !userInfo.email || 
        !userInfo.password || 
        !userInfo.role || 
        !userInfo.institute ||
        userInfo.password != userInfo.confirmPassword ||
        userInfo.role < Math.min(Object.values(roles)) || 
        userInfo.role > Math.max(Object.values(roles)) ||
        userInfo.name.length > attributeConstraints.maxNameLength ||
        userInfo.password.length < attributeConstraints.minPasswordLength ||
        !(/^[A-Za-z\s]+$/.test(userInfo.name))

    )
    {
        return false;
    }
    
    return true;
}