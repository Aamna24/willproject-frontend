import http from './httpService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import jwtDecode from 'jwt-decode'

const apiPoint = "/users/login"
const tokenKey = "token"

// login user
export async function login(email, password) {
    const {data: jwt} = await http.post(apiPoint, { email, password });
    localStorage.setItem(tokenKey, jwt.token);
    return jwt
}

// get will
export async function getWill(){
    const url= "/will/"
    return http.get(url)
}
// register document against will 
export async function regDocument(docName, docType,docDate,docNo,docLoc,docDesc,activeWillId,issuer) {
    const regEndPoint = "/users/register-document"
    return http.post(regEndPoint, { docName, docType,docDate,docNo,docLoc,docDesc,activeWillId,issuer});
    
    
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

//generate vouchers
export function generateVoucher(userID, discountID, paymentNumber,quantity){
    const voucher = "/users/vouchers"
    return http.post(voucher,{userID, discountID, paymentNumber,quantity})
}

//get detail of eacg voucher
export function getVoucherDetail(id){
    return http.get("/users/voucherdetail/"+id)
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
export function registerBasicWill(data,id){
    const will = "/will/willregisteration/"+id
              return http.post(will,data)
}

// update basic will
export function updateBasicWill(id,promotionCode,discountCode,discountAmount){
    const will = "/will/updatewill/"+id
              return http.patch(will,{promotionCode,discountCode,discountAmount})
}

// get comission listing
export function getCommissionList(id){
    return http.get("/users/commission/"+id)
}
//export function search
export function search(){
    return http.post("/will/search")
}

// exec will copy req form
export function execForm(data){
    return http.post("/will/execWill",data)
}

// update exec will after payment
export function execWillUpdate(id,discountApplied, amountPaid){
    return http.patch("/will/updateexecwill/"+id,{discountApplied, amountPaid})
}

// generate balance req
export function generateBalanceReq(userName, bankName , bankAccountName, commissionBalance, bankAccNo){
    return http.post("/users/generate-balancereq/",{userName, bankName , bankAccountName, commissionBalance, bankAccNo})
}

// probate will req
export function probForm(data){
    return http.post("/will/probateregistry",data)
}

// update after payment
export function probWillUpdate(id,discountApplied, amountPaid){
    return http.patch("/will/updateprobwill/"+id,{discountApplied, amountPaid})
}

export function logout(){
    localStorage.removeItem(tokenKey);
}

// get vouchers list
export function getVouchersList(){
    const v = "/users/voucherslist"
    return http.get(v)
}
// get products list
export function getProducts(){
    const v = "/users/products"
    return http.get(v)
}

// search form
export function searchForm(data){
    return http.post("/will/search", data)
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
    registerBasicWill,
    generateVoucher,
    getVouchersList,
    getProducts,
    getVoucherDetail,
    execForm,
    updateBasicWill,
    getCommissionList,
    execWillUpdate,
    probForm,
    probWillUpdate,
    searchForm,
    generateBalanceReq
  
}