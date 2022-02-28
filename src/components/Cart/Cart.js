import React , { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';

const DISCOUNT = 0;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

 function Cart() {

  let arr = [
    {"service" : "Beauty - Hair",
     "date" : "20-Feb",
     "time" : "5pm",
     "price" : 400,
    },
    {"service" : "Plumber",
     "date" : "21-Feb",
     "time" : "5pm",
     "price" : 200,
    },
    {"service" : "Carpenter",
     "date" : "22-Feb",
     "time" : "6pm",
     "price" : 100,
    },
    {"service" : "Beauty - Spa",
    "date" : "22-Feb",
    "time" : "6pm",
    "price" : 100,
   }
]

const invoiceSubtotal = subtotal(arr);
const invoiceDiscount = DISCOUNT * invoiceSubtotal;
const invoiceTotal = invoiceDiscount + invoiceSubtotal;

const [cart, setCart] = useState(arr);
const [isubTotal, iSetSubTotal] = useState(subtotal(arr));

// const removeFromCart = (productToRemove) =>  {
//     console.log("Print HERE: ")
//     setCart(  cart.filter ((product) => product!==productToRemove));
// }

function  removeFromCart (item) {
  console.log("Remove from cart!");
  let filteredArr = cart.filter((el) => el !== item);
  setCart(filteredArr);
  iSetSubTotal(subtotal(filteredArr));

}

return (
    <div>
      <Typography variant="h3"> CART </Typography>
      <Typography variant="h6"> You have ({cart.length}) items in your cart</Typography>
    <div className = "cartCopy">

    <TableContainer component={Paper}>
      <Table sx={{ 
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "max-content" ,
        border: "1px solid rgba(0,0,0,0.2)",
        padding: 2
      }} 
        aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Service</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((row, idx) => (
            <TableRow key={idx}>  
              <TableCell>{row.service}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              <TableCell align="right"><Button onClick={() => removeFromCart(row)}
                                        color = "info"
                                        sx = {{backgroundColor: "#D3DEDC"}}> Remove </Button></TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} ></TableCell>
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(isubTotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Discount</TableCell>
            <TableCell align="right">{`${(DISCOUNT * 100).toFixed(0)} %`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(isubTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
`    </div>
    
    </div>
  );
}


export default Cart;