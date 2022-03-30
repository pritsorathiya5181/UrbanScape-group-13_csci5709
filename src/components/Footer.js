/**
 * Author: Priti Sri Pandey - B00877337
 */

import { MailOutline, Phone, Room } from '@mui/icons-material'
import styled from 'styled-components'
import {
  Grid,
  Link
} from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const Desc = styled.p`
  margin: 20px 0px;
`

const Title = styled.h3`
  margin-bottom: 30px;
`

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`

const Payment = styled.img`
  width: 50%;
`

const Footer = () => {
  return (




    <Grid sx={{ padding: "50px" }} container spacing={3}>
      <Grid item xs={6}>
        <Title>About Us</Title>
        <Desc>
          We understand that your time is precious and finding time for everyday chores in your busy schedule is challenging.
          That's why we are here to ease your workload.
          We provide beauty services like salon at home and home care services like plumbing and carpentry, all at your doorstep.
          Our professionals are well articulated in their profession and they undergo rigorous training.
          Your satisfaction means the world to us.
        </Desc>
        <Desc>
          We at Urbanscape, believe in excellence! All our certified professionals are trained to deliver expert services that will surpass your expectations.
        </Desc>
        <Desc>

          We love mother nature and all the products used for our beauty services are organic and certified cruelty free.

        </Desc>
      </Grid>
      <Grid item xs>

        <Title>Useful Links</Title>
        <List>
          <ListItem disablePadding>


            <Link href="./beautyservices" color="inherit">
              <ListItemText primary="Beauty Services" />
            </Link>

          </ListItem>
          <ListItem disablePadding>

            <Link href="./carpentryservices" color="inherit">
              <ListItemText primary="Carpentry Services" />
            </Link>

          </ListItem>
          <ListItem disablePadding>
            <Link href="./plumbingservices" color="inherit">
              <ListItemText primary="Plumbing Services" />
            </Link>

          </ListItem>
          <ListItem disablePadding>

            <Link href="./" color="inherit">
              <ListItemText primary="Offers" />
            </Link>

          </ListItem>
          <ListItem disablePadding>
            <Link href="./" color="inherit">
              <ListItemText primary="FAQs" />
            </Link>

          </ListItem>
          <ListItem disablePadding>
            <Link href="./" color="inherit">
              <ListItemText primary="Reviews" />
            </Link>
          </ListItem>
        </List>

      </Grid>
      <Grid item xs>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: '10px' }} /> 6299 South St, Halifax, NS
          B3H 4R2
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: '10px' }} /> +1 234 56 789
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: '10px' }} /> contact@urbanscapeteam.dev
        </ContactItem>
        <Payment src='https://i.ibb.co/Qfvn4z6/payment.png' />
      </Grid>
    </Grid>

  )
}

export default Footer
