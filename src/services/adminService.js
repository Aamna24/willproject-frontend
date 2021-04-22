import http from './httpService';

import jwtDecode from 'jwt-decode'

const apiPoint = "/users/login/"
const tokenKey = "token"

export async function adminlogin(email, password) {
    const {data: jwt} = await http.post(apiPoint, { email, password })
    localStorage.setItem(tokenKey, jwt.token);
}


export function registerOrgUser(data) {
    return http.post("/users/register/organisationUser",data);
  }

export function uploadFlyer(data){
  return http.post("/flyer/uploadFlyer/",data);
}


export async function setupDiscount(type, fromNoQty, toNoQty, discountPercentage,commissionPercentage,amount){

  return await http.post("/users/setup-discount",{type, fromNoQty, toNoQty, discountPercentage,commissionPercentage,amount});
}

// get discounts list
export async function getDiscounts(){
  return await http.get("/users/discounts");
}
// get list of users
export function getUsersList(){
  return http.get("/users/")
}

// get list of flyers
export function getFlyers(){
  return http.get("/flyer/")
}

// remove flyer
export function removeFlyer(id){
  return http.delete("/flyer/delete/"+id)
}
export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem(tokenKey);

       return jwtDecode(jwt);
       
      } catch (ex) {
        return null
      }
}

// generate invoice link
export function generateInvoice(b2bClient,noOfVoucher,amount,processedBy){
  return http.post("/users/generate-invoice",{b2bClient,noOfVoucher,amount,processedBy})
}
// get invoice
export function getInvoice(){
  return http.get("/users/invoice")
}
// change invoice status
export function updateInvoice(id,paymentID){
  return http.patch("/users/invoice/"+id,{paymentID})
}
// get transactions
export function getTransactionList(){
  return http.get("/users/transactionlist")
}
// add commission
export function addCommission(userID , willAmbID, commissionEarned, commissionBalance,productName,
  userName,salesID){
  return http.post("/users/generate-commission",{userID , willAmbID, commissionEarned, commissionBalance,productName,
    userName,salesID})
}
// disable user
export function DisableUser(id){
  return http.patch("/users/disable/"+id)
}
// update price
export function updatePrice(product, amount){
  return http.patch("/users/updateproduct",{product,amount})
}

// generate transaction
export function transaction(userid, discountID,paymentNumber,quantity,b2bClient,processedBy,amount){
  return http.post("/users/transaction",{userid, discountID,paymentNumber,quantity,b2bClient,processedBy,amount})
}

// update org user profile
export function updateProfile(id,name, email, password, town,country,add1,add2,phoneNo){
  return http.patch("/users/editprofile/"+id,{name, email, password, town,country,add1,add2,phoneNo})
}

// add sale
export function addSale(product, amount, transactionID){
  return http.post("/users/sales",{product, amount, transactionID})
}

// get balance requests
export function getBalanceRequests(){
  return http.get("/balance/balancerequests")
}

// get sales
export function getSales(){
  return http.get("/users/sales")
}

// clear balance req payment
export function clearPayment(id){
  return http.patch("/balance/balance/"+id)
}

// update balance req status
export function clearCommissionStatus(id){
  return http.patch("/balance/commissions/"+id)
}
// eslint-disable-next-line
export default{
    adminlogin,
    getCurrentUser,
    registerOrgUser,
    uploadFlyer,
    setupDiscount,
    getUsersList,
    getDiscounts,
    generateInvoice,
    getInvoice,
    updateInvoice,
    getFlyers,
    removeFlyer,
    addCommission,
    updatePrice,
    DisableUser,
    transaction,
    getTransactionList,
    updateProfile,
    addSale,
    getSales,
    getBalanceRequests,
    clearCommissionStatus,
    clearPayment
    
   
}