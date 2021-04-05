import http from './httpService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import jwtDecode from 'jwt-decode'

const apiPoint = "/users/login/"
const tokenKey = "token"

// login user
export async function login(email, password) {
    const {data: jwt} = await http.post(apiPoint, { email, password });
    localStorage.setItem(tokenKey, jwt.token);
    
}

// get will
export async function getWill(){
    const url= "/will/"
    return http.get(url)
}
// register document against will 
export async function regDocument(docName, docType,docDate,docNo,docLoc,docDesc,activeWillId) {
    const regEndPoint = "/users/register-document"
    return http.post(regEndPoint, { docName, docType,docDate,docNo,docLoc,docDesc,activeWillId});
    
    
}

// register individual user
export function register(data) {
    const apiEndPoint = "/users/register/individualUser"
    return http.post(apiEndPoint,data);
  }

// register B2B Client  
export function registerB2B(data) {
    const apiEndPoint1 = "/users/register/B2B"
      return http.post(apiEndPoint1,data);
}
    
// register will ambassador
export function registerWillAmbassdor(data) {
    const apiEndPoint2 = "/users/register/willAmbassdor"
    return http.post(apiEndPoint2, data);
}

// get details of each will
export function getDetails(id){
    const detailsEndPoint = "/will/details/"+id
    return http.get(detailsEndPoint)
}

// get list of registered documents against each will 
export function getRegDoc(id){
    const regDocsEndPoint = "/will/registeredDocuments/"+id
    return http.get(regDocsEndPoint)
}

// remove registered document against specific will
export function removeRegDoc(id){
    const point = "/will/deleteDoc/"+id
    return http.delete(point)
}

// get each registered document
export function getEachDocDetails(id){
    const eachdetail = "/will/documentdetails/"+id
    return http.get(eachdetail)
}

// register basic will
// get each registered document
export function registerBasicWill(data,id){
    const will = "/will/willregisteration/"+id
              return http.post(will,data)
}
export function logout(){
    localStorage.removeItem(tokenKey);
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
    login,
    logout,
    getCurrentUser,
    register,
    registerB2B,
    registerWillAmbassdor,
    getDetails,
    getRegDoc,
    getWill,
    registerBasicWill
}