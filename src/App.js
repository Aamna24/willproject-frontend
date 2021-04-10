
import React from 'react';
import './App.css';
import NavBar from './components/header'
import { Switch,Route, Redirect} from 'react-router-dom';
import Login from './components/login';
import LandingPage from './components/landingPage'
import Register from './components/IndividualSignup'
import auth from './services/authService'
import Logout from './components/logout'
import RegisterB2B from './components/B2BSignup';
import RegisterWillAmbassador from './components/WillAmbSignup'
import AdminLogin from './components/adminLogin';
import RegisterOrgUser from './components/adminControls/OrganisationUserSignup';
import AdminMainPage from './components/adminPage';
import FlyerForm from './components/adminControls/flyerForm';
import WillAHomePage from './components/WillAmbHome';
import FlyerListing from './components/flyerListing';
import CommissionListing from './components/comListing';
import BalanceRequest from './components/balanceReq';

import RegWillListing from './components/regWillListing';
import RegDocument from './components/registeredDocuments/regDocument';
import SetupDiscount from './components/adminControls/setupDiscount';
import Details from './common/willDetail';
import listRegDoc from './components/registeredDocuments/listRegDoc'
import EditDoc from './components/registeredDocuments/editDocument';
import SearchForm from './components/basicSearch';

import MultiStepForm from './components/willRegForm.jsx/MultiStepForm'
import ManageUsers from './components/adminControls/manageUsers';
import EmployeeVoucherPopPage from './components/EmpVouPopPage';
import VoucherListing from './components/VoucherListing';
import EmployeeVoucherInvoiceCreation from './components/adminControls/invoiceCreation';
import InvoiceListing from './components/adminControls/invoiceListing';
import Payment from './components/adminControls/paymentID';
import Flyer from './components/adminControls/flyer';
import VoucherDetails from './components/voucherDetails';

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
        <Route path="/admin/create-flyer" component={FlyerForm}/>
        <Route path="/admin/flyer" component={Flyer}/>
        <Route path="/admin/balance-request" component={BalanceRequest}/>
        <Route path="/admin/setup-discount" component={SetupDiscount}/>
        <Route path="/admin/manageusers" component={ManageUsers}/>
        <Route path="/admin/create-invoice" component={EmployeeVoucherInvoiceCreation}/>
        <Route path="/admin/invoice-listing" component={InvoiceListing}/>
        <Route path="/invoice" component={Payment}/>

        <Route path="/will-listing" component={RegWillListing}/>
        <Route path="/details" component={Details}/>
        <Route path="/listregisteredDoc" component={listRegDoc}/>
        <Route path="/registerdocument" component={RegDocument}/>
        <Route path="/edit" component={EditDoc}/>
       
        <Route path="/form" render={props => <MultiStepForm user={user} {...props}/>}/>
        

        <Route path="/commission-listing" component={CommissionListing}/>

        <Route path="/register/will-ambassador" component={RegisterWillAmbassador}/>
        <Route path="/will-ambassador/home" component={WillAHomePage}/>
        <Route path="/will-ambassador/flyer-listing" component={FlyerListing} />

        <Route path="/register/indivdualUser" component={Register}/>
        <Route path="/register/B2B" component={RegisterB2B}/>
        
       
        <Route path="/register/orgaisationalUsers" component={RegisterOrgUser}/>

        <Route path="/search" component={SearchForm}/>
        
        <Route path="/voucherlisting" component={VoucherListing}/>
        <Route path="/voucherdetail" component={VoucherDetails}/>
        <Route path="/voucherpage" component={EmployeeVoucherPopPage}/>
        <Redirect from="/" exact to="/home" />

        
      </Switch>
    </React.Fragment> );
  }
}
 
export default App;
