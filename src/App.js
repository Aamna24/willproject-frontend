
import React from 'react';
import './App.css';
import NavBar from './components/header'
import { Switch,Route, Redirect} from 'react-router-dom';
import Login from './components/login';
import LandingPage from './components/landingPage'
import Register from './components/individualUser/IndividualSignup'
import auth from './services/authService'
import Logout from './components/logout'

import RegisterB2B from './components/b2bClient/B2BSignup';
import RegisterWillAmbassador from './components/WillAmbSignup'

import AdminLogin from './components/adminControls/adminLogin';
import RegisterOrgUser from './components/adminControls/OrganisationUserSignup';
import AdminMainPage from './components/adminControls/adminPage';
import FlyerForm from './components/adminControls/flyerForm';
import SetupDiscount from './components/adminControls/setupDiscount';
import ManageUsers from './components/adminControls/manageUsers';
import InvoiceListing from './components/adminControls/invoiceListing';


import WillAHomePage from './components/WillAmbHome';
import FlyerListing from './components/flyerListing';
import CommissionListing from './components/comListing';
import BalanceRequest from './components/balanceReq';

import RegWillListing from './components/individualUser/regWillListing';
import RegDocument from './components/registeredDocuments/regDocument';
import Details from './common/willDetail';
import listRegDoc from './components/registeredDocuments/listRegDoc'
import EditDoc from './components/registeredDocuments/editDocument';
import SearchForm from './components/products/basicSearch';

import MultiStepForm from './components/products/BasicWill/MultiStepForm'
import EmployeeVoucherPopPage from './components/b2bClient/EmpVouPopPage';
import VoucherListing from './components/VoucherListing';
import EmployeeVoucherInvoiceCreation from './components/adminControls/invoiceCreation';
import Payment from './components/adminControls/paymentID';
import Flyer from './components/adminControls/flyer';
import VoucherDetails from './components/voucherDetails';
import ExecWillForm from './components/products/execWill';
import testCom from './components/testCom';
import InHome from './components/individualUser/home';
import Checkout from './components/products/BasicWill/payment';
import ProbateWillForm from './components/products/probateReg';
import OrgUserHomePage from './components/orgUserHome';
import B2BHome from './components/b2bClient/b2bHome';
import TransactionList from './components/b2bClient/transactionList';
import OrgUserListing from './components/adminControls/orgListing';
import B2BVouchers from './components/adminControls/b2bvouchers';
import ProductsPrice from './components/adminControls/productsPrice';
import ProductsList from './components/adminControls/ProductsListing';
import EditOrgUser from './components/adminControls/editOrgUser';
import Transactions from './components/adminControls/b2btransactions';
import B2bIndividualVoucherList from './components/b2bClient/vouchersList';
import Sales from './components/adminControls/sales';
import BalanceRequests from './components/adminControls/balanceReq';
import WillCreationForm from './components/products/willcreation/willCreationForm';
class App extends React.Component {
  state = {  }
  constructor(props) {
    super(props)
    this.state = { apiResponse: "" }
  }
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({user})
    console.log(user)
  } 
  callAPI() {
    fetch(process.env.REACT_APP_API_URL)
      .then(res => console.log("connectd"))
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }
  render() { 
    const {user} = this.state;
    return ( <React.Fragment>
      <NavBar user={user}/>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout} />
        <Route path="/home" component={LandingPage}/>

      
        <Route path="/admin/login" component={AdminLogin}/>
        <Route path="/adminhome" component={AdminMainPage}/>
        <Route path="/register/orgaisationalUsers" component={RegisterOrgUser}/>
        <Route path="/admin/create-flyer" component={FlyerForm}/>
        <Route path="/admin/flyer" component={Flyer}/>
        <Route path="/admin/balance-request" component={BalanceRequest}/>
        <Route path="/admin/setup-discount" component={SetupDiscount}/>
        <Route path="/admin/manageusers" component={ManageUsers}/>
        <Route path="/admin/create-invoice" component={EmployeeVoucherInvoiceCreation}/>
        <Route path="/admin/invoice-listing" component={InvoiceListing}/>
        <Route path="/admin/products-listing" component={ProductsList}/>
        <Route path="/admin/transactions" component={Transactions}/>
        <Route path="/admin/sales" component={Sales}/>
        <Route path="/admin/managebalance" component={BalanceRequests}/>
        <Route path="/admin/org-user-listing" component={OrgUserListing}/>
        <Route path="/invoice" component={Payment}/>

        <Route path="/product/will-creation" component={WillCreationForm}/>

        <Route path="/will-listing" component={RegWillListing}/>
        <Route path="/details" component={Details}/>
        <Route path="/listregisteredDoc" component={listRegDoc}/>
        <Route path="/registerdocument" component={RegDocument}/>
        <Route path="/edit" component={EditDoc}/>
        <Route path="/checkout" component={Checkout}/>
       

        <Route path="/form" render={props => <MultiStepForm user={user} {...props}/>}/>
        

        <Route path="/commission-listing" component={CommissionListing}/>

        <Route path="/register/will-ambassador" component={RegisterWillAmbassador}/>
        <Route path="/will-ambassador/home" render={props => <WillAHomePage user={user} {...props}/>}/>
        <Route path="/will-ambassador/flyer-listing" component={FlyerListing} />

        <Route path="/register/indivdualUser" component={Register}/>
        <Route path="/register/B2B" component={RegisterB2B}/>
        <Route path="/individualuser/home" component={InHome}/>
        
       

        <Route path="/search" component={SearchForm}/>
        
        <Route path="/voucherlisting" component={VoucherListing}/>
        <Route path="/voucherdetail" component={VoucherDetails}/>
        <Route path="/voucherpage" component={EmployeeVoucherPopPage}/>
        <Route path="/b2bhome" component={B2BHome}/>

        <Route path="/execform" component={ExecWillForm}/>
        <Route path="/probateform" component={ProbateWillForm}/>
        <Route path="/test" component={testCom}/>
        <Route path="/orguserhome" render={props => <OrgUserHomePage user={user} {...props}/>}/>
        <Route path="/transactionlist" render={props => <TransactionList user={user} {...props}/>}/>
        
        <Route path="/b2bvouchers" component={B2BVouchers}/>
        <Route path="/productsprice" component={ProductsPrice}/>
        <Route path="/editorguser" component={EditOrgUser}/>
        <Route path="/b2b/voucherslist" render={props => <B2bIndividualVoucherList user={user} {...props}/>}/>


        <Redirect from="/" exact to="/home" />
   
      </Switch>
    </React.Fragment> );
  }
}
 
export default App;
