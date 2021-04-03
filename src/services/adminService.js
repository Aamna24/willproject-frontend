import http from './httpService';

import jwtDecode from 'jwt-decode'

const apiPoint = "/users/login/"
const tokenKey = "token"
const apiEndPoint1 = "/flyer/uploadFlyer/"

export async function adminlogin(email, password) {
    const {data: jwt} = await http.post(apiPoint, { email, password })
    localStorage.setItem(tokenKey, jwt.token);
}

const apiEndPoint = "/users/register/organisationUser"
export function registerOrgUser(data) {
    return http.post(apiEndPoint,data);
  }

export function uploadFlyer(data){
  console.log("upload",data)
  return http.post(apiEndPoint1,data);
}

const discountEndPoint = "/users/setup-discount"
export async function setupDiscount(type, fromNoQty, toNoQty, discountPercentage){
  return await http.post(discountEndPoint,{type, fromNoQty, toNoQty, discountPercentage});
}



export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem(tokenKey);

       return jwtDecode(jwt);
       
      } catch (ex) {
        return null
      }
}



export default{
    adminlogin,
    getCurrentUser,
    registerOrgUser,
    uploadFlyer,
    setupDiscount
    
   
}