// Author: Aeshna Verma - B00880776

import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Box,
  Typography,
  Divider,
  FormLabel
} from '@mui/material'


import { connect } from 'react-redux'
import * as cartAction from '../../../action/cartAction'
import * as orderAction from '../../../action/orderAction'
import { hasToken } from '../../../utils/scale'


    const Payment = (props) => {
    
    const navigate = useNavigate()

    const [cartTotal, setCartTotal] = useState(props.cartData.cartTotalAmount || 0)
    const [discount, setDiscount] = useState(props.cartData.cartDiscountAmount || 0)
    const [itemsCount, setItemsCount] = useState(props.cartData.cartDiscountAmount || 0)
    const [payUsingCard, setPayUsingCard] = useState()
    const [paymentMethod, setPaymentMethod] = useState('')
    const [cart, setCart] = useState(props.cartData || {})
    const [cartItems, setCartItems] = useState(props.cartData.cartItems || [])
    const [formErrors, setFormErrors] = useState({})
    const [isDisabled, setIsDisabled] = useState(true)

    const [formFields, setFormFields] = useState({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvvCode: ""
 
 });




 function handleClick(event){
 
  event.preventDefault();
  console.log("Handle click " , formFields)
      
  const errors = {};

  if(!formFields.cardNumber){
       errors.cardNumber = "*Card Number is a mandatory field!";
  }
  else if(formFields.cardNumber.length!=12 || !isNumber(formFields.cardNumber)){
       errors.cardNumber = "*Card Number should be a 12 digit number!";
  }

  if(!formFields.cvvCode){
    errors.cvvCode = "*CVV is a mandatory field!";
  }
  else if(formFields.cvvCode.length!=3 || !isNumber(formFields.cvvCode)){
    errors.cvvCode = "*CVV should be a 3 digit number!";
  }

  if(!formFields.expiryMonth){
    errors.expiryMonth = "*Expiry month is a mandatory field!";
  }
  else if(formFields.expiryMonth.length>2 || !isNumber(formFields.expiryMonth) || parseInt(formFields.expiryMonth)<1 || parseInt(formFields.expiryMonth)>12 ){
    errors.expiryMonth = "*Not a valid month!";
  }

  if(!formFields.expiryYear){
    errors.expiryYear = "*Expiry year is a mandatory field!";
  }
  else if(formFields.expiryYear.length!=4 || !isNumber(formFields.expiryYear) || parseInt(formFields.expiryYear)<2022 || parseInt(formFields.expiryYear)>2035 ){
    errors.expiryYear = "*Not a valid year(2022-2035)!";
  }

  console.log("Err: " + JSON.stringify(errors));
  
  setFormErrors(errors)

  console.log( " formerror length ", Object.keys(errors).length )

  if(Object.keys(errors).length == 0 )
      {
        saveOrder()
      }
 }
 
    
    const handleChange = (event) => {
        setPaymentMethod(event.target.value);
        console.log(" Payment method ", event.target.value)


        if(event.target.value === "card"){
          console.log("if")
          setPayUsingCard(true) 
          setIsDisabled(false)
        }
        else if (event.target.value === "cash"){
          console.log("else")
          setPayUsingCard(false) 
          setIsDisabled(false)
        }
  
        console.log("Pay using card is " , payUsingCard)

        
    }

    const handleFormFields = (event) => {

      const {name, value} = event.target;
 
      setFormFields( prevValue => {
 
      return{
           ... prevValue,
           [name]: value
           }
      });
 
      console.log("Fields:  " + name + " : "  +  value );
 
 }

 function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

    function handleRedirect() {
      navigate('.././success')
    }
    

    function getCartItems() {
      const user = 'dan'
      console.log("Payment get Cart details" )
      props.action
        .getCartItems(user)
        .then((res) => {
        setCart(res.cart)
        setCartItems(res.cart.cartItems)
        setCartTotal(res.cart.cartTotalAmount)
        setDiscount(res.cart.cartDiscountAmount)
        setItemsCount(res.cart.cartItems.length)
        })
        .catch((err) => {
        console.log('err', err)
        })
        

      }

      function saveOrder(){
        const user = 'dareynolds'
        console.log("Save Order")
        // console.log(cartItems)
        props.orderaction.saveOrderRequest(user,cart)
        // .then((res) => {
        //   console.log("Save Order " , res)
    
        // })
        // .catch((err) => {
        //   alert(err)
        //    console.log('save Order err', err)
        // })

        handleRedirect()
      }
    
    useEffect(() => {
    
      // if (!hasToken()) {
      //   window.location.href = '/customer/unauthenticated/'
      // }
       getCartItems() 
    
    }, [])
    
 

  return (
    <div>
   
    <Box display = "flex"
    justifyContent="center"
    alignitems = "center"
    padding='30px'> 
    <Typography  variant = "h3" display="block" >Order Summary  </Typography> 
    </Box>

    <Box display = "flex"
    justifyContent="center"
    alignitems = "center"> 
    <Typography  variant = "h5" display="block" > Total amount to Pay:  {cartTotal}  </Typography>
    </Box>

    <Box display = "flex"
    justifyContent="center"
    alignitems = "center"
    paddingBottom='30px'>
    <Typography  variant = "h5" display="block" >  No of Services Booked:  {itemsCount}  </Typography>  
    </Box>
    
    <Box display = "flex"
    justifyContent="center"
    alignitems = "center"
    paddingBottom='30px'>

    <FormControl required sx={{ m: 1, minWidth: 180 }} > 
    <InputLabel id="paymeans"> Payment Method</InputLabel>
    
    <Select
    id="paymeans"
    value={paymentMethod}
    label="Payment Method"
    onChange={handleChange}
    >
    <MenuItem value={"card"}>Debit/credit Card</MenuItem>
    <MenuItem value={"cash"}>Cash after service</MenuItem>
    </Select>
    
    </FormControl>

    </Box>


    <div>
    { payUsingCard && <div> 
      <Box  display = "flex"
    justifyContent="center"
    alignitems = "center">

  <div
      //  style={{
      //   display: "flex",
      //   padding: "1em 0.7em",
      //   width: "100%",
      //   alignItems: "center"
      // }}
      >

  
  <Divider /> 
        <div className="col-xs-12 col-md-4" alignitems="center">
        <Box  display = "flex"
         justifyContent="center"
         alignitems = "center"
         paddingTop='20px'
         paddingBottom='20px'>
      
        <Typography variant= "h4">  Enter card details </Typography>
        </Box>
        <FormControl>

 
        <FormLabel > CARD NUMBER </FormLabel>         
        <input 
        type="text" 
        placeholder="Valid Card Number"  
        name = "cardNumber" 
        onChange = {handleFormFields}
        value = {formFields.cardNumber}
        />  
           <p>{formErrors.cardNumber}</p>             
    

        <div className="row" alignitems="center">
        <div className="col-xs-7 col-md-7">

        <FormLabel > CARD EXPIRY  </FormLabel>
        <div className="col-xs-6 col-lg-6">
        <input type="text"  placeholder="MM" required
        name = "expiryMonth"
        onChange = {handleFormFields}
        value = {formFields.expiryMonth} />
         <p>{formErrors.expiryMonth}</p>       
        </div>

        <div className="col-xs-6 col-lg-6">
        <input type="text" placeholder="YYYY" required
        name = "expiryYear"
        onChange = {handleFormFields} 
        value = {formFields.expiryYear} />
         <p>{formErrors.expiryYear}</p>  
        </div>
        </div>

        <div className="col-xs-5 col-md-5">           
        <FormLabel > CVV CODE </FormLabel> 
        <input type="password"  placeholder="CVV" required
        name = "cvvCode" 
        onChange = {handleFormFields}
        value = {formFields.cvvCode} />
              <p>{formErrors.cvvCode}</p>  
        </div>
    
        </div>
        </FormControl>

        </div>

       </div>
        </Box>

        <Box  display = "flex"
        justifyContent="center"
        alignitems = "center">
        
   
        
        <Button 
        variant="contained" 
        onClick = {handleClick}
        >
        Pay
        </Button>
        </Box>
      
      </div> 
    }

    { !payUsingCard && 
      <div>  
          <Box display = "flex"
          justifyContent="center"
          alignitems = "center">   
        
        <Button variant="contained"
         onClick = {saveOrder}
         disabled = {isDisabled}
         >Proceed
         </Button>
         </Box>

      </div> 
    }
    
    </div>
  
  
    </div>
  )
  
}

function mapStateToProps(state) {
    if (state) {
      return {
        cartData: state.cart,
        orders: state.orders,
      }
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      action: bindActionCreators(cartAction, dispatch),
      orderaction: bindActionCreators(orderAction, dispatch),
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Payment)