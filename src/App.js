
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
import RegisterOrgUser from './components/OrganisationUserSignup';
import AdminMainPage from './components/adminPage';
import FlyerForm from './components/flyerForm';
import WillAHomePage from './components/WillAmbHome';
import FlyerListing from './components/flyerListing';
import CommissionListing from './components/comListing';
import BalanceRequest from './components/balanceReq';
import TableSectionInbound from './components/testCom'
import RegWillListing from './components/regWillListing';
import RegDocument from './components/registeredDocuments/regDocument';
import SetupDiscount from './components/setupDiscount';
import Details from './common/willDetail';
import listRegDoc from './components/registeredDocuments/listRegDoc'
import EditDoc from './components/registeredDocuments/editDocument';
import SearchForm from './components/testCom';

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
        <Route path="/admin/balance-request" component={BalanceRequest}/>
        <Route path="/admin/setup-discount" component={SetupDiscount}/>

        <Route path="/will-listing" component={RegWillListing}/>
        <Route path="/details" component={Details}/>
        <Route path="/listregisteredDoc" component={listRegDoc}/>
        <Route path="/registerdocument" component={RegDocument}/>
        <Route path="/edit" component={EditDoc}/>
        

        <Route path="/commission-listing" component={CommissionListing}/>

        <Route path="/register/will-ambassador" component={RegisterWillAmbassador}/>
        <Route path="/will-ambassador/home" component={WillAHomePage}/>
        <Route path="/will-ambassador/flyer-listing" component={FlyerListing} />

        <Route path="/register/indivdualUser" component={Register}/>
        <Route path="/register/B2B" component={RegisterB2B}/>
        
       
        <Route path="/register/orgaisationalUsers" component={RegisterOrgUser}/>

        <Route path="/test" component={SearchForm}/>
        <Redirect from="/" exact to="/home" />

        
      </Switch>
    </React.Fragment> );
  }
}
 
export default App;
