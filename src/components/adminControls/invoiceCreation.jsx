import React ,{useState} from "react";
import * as auth from "../../services/adminService";
import * as autherize from "../../services/authService";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
toast.configure();
const EmployeeVoucherInvoiceCreation = () => {
  const [users, setUser] = useState([]);
  const [b2bClient, setName] = useState();
  const [noOfVoucher, setQuantity] = useState();
  const [products, setProducts] = useState();
  const [amount, SetAmount] = useState();
  const [show, setShow] = useState()
  const [usersList, setUsersList]= useState()
  const [discount, setDiscount]= useState()
  const [commissionEarned, setCommissionEarned] = useState();
  const [commissionBalance, setCommissionBalance] = useState();

  const userType = localStorage.getItem('type')
  const getProducts = () => {
    autherize
      .getProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(products);
    return products;
  };
  //getData();
  React.useEffect(getProducts, []);
  const getData = () => {
    auth
      .getUsersList()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(users);
    return users;
  };
  //getData();
  React.useEffect(getData, []);
  
    const getUser = () => {
      auth.getUsersList()
        .then((res) => {
          setUsersList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(usersList);
      return usersList;
    };
    //getData();
    React.useEffect(getUser, []);

    const getDiscount = () => {
      auth.getDiscounts()
        .then((res) => {
          setDiscount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    //getData();
    React.useEffect(getDiscount, []);
  
  if (!users || users.length === 0) return <p>No Users to show</p>;
  if (!products || products.length === 0) return <p>Cannot find any posts</p>;
  if(!usersList || usersList.products===0) return <p></p>
  if (!discount || discount.length === 0) return <p></p>;

  const f = usersList.data.filter(x=>x._id===localStorage.getItem('id'))
  const filtered = users.data.filter(
    (x) => x.type === "B2B" && x.status === "Activate"
  );
  //const filteredProduct = products.data.filter( (x) => x.name === "Will Creation");
  const filteredProduct = discount.data.filter( (x) => x.type === "Employee Voucher")

  const handleSubmit = async () => {
    const user = auth.getCurrentUser();
    const processedBy = user.name;
    const userID = "";
    const discountID = "";
    const paymentNumber = "";
    const invoiceID=""
    const quantity = parseInt(noOfVoucher);
    const response = await autherize.generateVoucher(
      userID,
      discountID,
      paymentNumber,
      noOfVoucher,
      b2bClient,
      processedBy,
      amount,
      invoiceID
    );

    if(userType==='organisationUser'){
      await auth.addCommission(
        userID,
        localStorage.getItem('id'),
        commissionEarned,
        commissionBalance,
        'voucher',
        localStorage.getItem('name')
      );
      await auth.addSale(
        'voucher',
        amount,
        '',
        f[0].code
      );
    }
   /* await auth.addSale(
      "voucher",
      amount,
      response.reference,
      filtercode[0].code
    );*/

   // window.location.href = "/admin/invoice-listing";
    window.location.href = "/b2bvouchers";
    if (response.status === 200) {
      toast.success("Successfully created");
    }
  };
 

  const handleCalAmount=()=>{
    
      setShow(true);
      var price = filteredProduct.filter(x=> x.fromNoQty <= noOfVoucher && x.toNoQty>=noOfVoucher)
      if(price.length>1){
        var index = price.length-1
        price = price[index]
      }
      console.log("p",price)

      var discountdetail = []
      if(userType==='organisationUser'){
        discountdetail = discount.data.filter(
          (x) => x.type === "Organisation User B2B Discount"
        );
        console.log("hello")
        const discountApplied = discountdetail[0].discountPercentage;
        const com = discountdetail[0].commissionPercentage;
        setCommissionEarned(com);
       // const actualPrice = noOfVoucher * filteredProduct[0].basePrice;
       const actualPrice = noOfVoucher * price.amount
       console.log("a",actualPrice)
        const dis = actualPrice * (discountApplied/100)
        const discountedPrice = actualPrice - dis
        SetAmount(discountedPrice)

        const commB = actualPrice * (discountdetail[0].commissionPercentage / 100);
         const comBal = actualPrice - commB;
        setCommissionBalance(comBal);

      }
      else{
        SetAmount(noOfVoucher * price.amount)
      }
    
  }
  return (
    <div className="container">
      <Form>
        <div class="form-group">
          <div className="row">
            <div className="col-md-6">
              <label>B2B Client Name</label>
            </div>
            <div className="col">
              <select
                for="exampleInputEmail1"
                name="b2bClient"
                class="form-control"
                id="exampleInputEmail1"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              >
                <option>[Please select one]</option>
                {filtered.map((post) => {
                  return <option>{post.name}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-md-6">
              <label>Enter Quantity Field</label>
            </div>
            <div className="col-md-6">
              <input
                name="noOfVoucher"
                type="number"
                className="form-control"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        {userType==="organisationUser" && (
          <>
           <div className="form-group">
          <div className="row">
            <div className="col-md-6">
              <label>promoCode</label>
            </div>
            <div className="col-md-6">
              <input
                
                disabled
                className="form-control"
                defaultValue={f[0].code}
              />
            </div>
          </div>
        </div>
          </>
        )}
        <div className="form-group">
          <div className="row">
            <div classname="col-md-6">Amount</div>
            <div className="col-md-6">
              {show && <div>{amount}</div>}

              <Button
                variant="contained"
                color="primary"
                onClick={handleCalAmount}
              >
                Calculate Amount
              </Button>
            </div>
          </div>
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Complete
        </Button>
      </Form>
    </div>
  );
};

export default EmployeeVoucherInvoiceCreation;
