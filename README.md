<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Prit Sorathiya for academic use --->

# Project: UrbanScape

- _Date Created_: 2 Feb 2022
- _Last Modification Date_: 23 Feb 2022
- _Heroku deployed URL_: <https://g13-urbanscape.herokuapp.com/>
- _Group repository git URL_: <https://git.cs.dal.ca/ppandey/group-13_csci5709>

## Authors

- [Aeshna Verma] - _(B00880776)_
- [Janhavi Sonawane] - _(B00881787)_
- [Manjinder Singh] - _(B00866348)_
- [Prit Ajaykumar Sorathiya] - _(B00890175)_
- [Priti Sri Pandey] - _(B00877337)_
- [Rikin Pineshkumar Patel] - _(B00864960)_

## Team Work

## Team Work

### Feature (User Authentication)
#### Author - Janhavi Sonawane
```
- src/components/UserAuthentication/ForgetPassword.js
- src/components/UserAuthentication/Otp.js
- src/components/UserAuthentication/SignUpProfessional.js
- src/components/UserAuthentication/SignUpUser.js
- src/components/UserAuthentication/UpdatePassword.js
- src/components/UserAuthentication/UserLogin.js

```

### Feature (User Landing Page)
#### Author - Priti Sri Pandey
```
- src/pages/customer/HomePage/ServiceCarousel.js
- src/pages/customer/HomePage/ServiceTile.js
- src/pages/customer/HomePage/UserHomePage.js

- src/components/NewsLetter.js
- src/components/Footer.js

- src/action/newsletterSubscriptionAction.js
- src/reducers/newslettersubscriptionReducer.js
- src/action/serviceCategoryAction.js
- src/reducers/serviceCategoriesReducer.js
```
### Feature (Service catalog page for booking a service)
#### Author - Priti Sri Pandey
```

- src/pages/customer/ServicePage/ServiceCard.js
- src/pages/customer/ServicePage/BeautyService.js
- src/pages/customer/ServicePage/CarpenterService.js
- src/pages/customer/ServicePage/PlumbingService.js

- src/action/serviceCategoryAction.js
- src/reducers/serviceCategoriesReducer.js
```

### Feature (Cart Management)
#### Author - Aeshna Verma
```
- src/pages/customer/CartPage/CartPage.js
- src/pages/customer/profile/NotLoggedIn.js

- src/action/CartAction.js
- src/reducers/cartReducer.js
```
### Feature (Profile Management)
#### Author - Prit Ajaykumar Sorathiya
```
- src/pages/professional/HandleService/ServiceProfile.js
- src/pages/professional/profile/ProfessionalProfilePage.js
- src/pages/professional/profile/CustomerProfilePage.js

```

### Feature (Support Page)
#### Author -Rikin Pineshkumar Patel
```
- src/pages/customer/support/Contact.js

```

### Feature (Professional - Dashboard)
#### Author -Rikin Pineshkumar Patel
```
- src/pages/professional/dashboard/Dashboard.js
- src/pages/professional/dashboard/DashboardPrimary.js

```

### Feature (Professional - Service Management)
#### Author - Prit Ajaykumar Sorathiya
```
- src/pages/professional/HandleService/ServiceProfile.js
- src/pages/professional/HandleService/ServiceCard.js
- src/pages/professional/HandleService/AddService.js

- src/pages/professional/serviceListing/ServiceHistory.js
- src/pages/professional/serviceListing/ServiceRequests.js

- src/action/ServiceAction.js
- src/reducers/serviceReducer.js
- src/store/store.js

```
## Getting Started

### Prerequisites

To have a local copy of this project up and running on your local machine, you will first need to install the following software / libraries / plug-ins

- npm

```
npm install npm@latest -g
```

- deploy the project

```
install Heroku CLI
```

### Installing

A step by step process to run the project in the development env then delploy to heroku.

1. install NPM packages

```
npm install
```

2. authenticate heroku account

```
heroku login
```

3. Create a new app on heroku and add heroku remote to the project

```
heroku git:remote -a "project_name"
```

4. push the code on heroku

```
git push heroku master
```

## Deployment

- [Heroku](https://devcenter.heroku.com/start) - The cloud platform used for deployment.

## Built With

- [React](https://reactjs.org/docs/getting-started.html) - The web front-end framework used.
- [React Redux](https://react-redux.js.org/) - The library used for the state management.

## Sources Used

## NavBar.js

_Lines 179-200_

```
<Menu
    sx={{ mt: '45px' }}
          id='menu-appbar'
          anchorEl={profileSettingOption}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(profileSettingOption)}
          onClose={handleCloseUserMenu}
        >
          {MENU.profileSettings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign='center'>{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
```

The code above was created by adapting the code in [React Menu component - MUI](https://mui.com/components/menus/) as shown below:

```
<MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
```

- <!---How---> The code in [React Menu component - MUI](https://mui.com/components/menus/) was implemented by using various material ui components to design menu layout.
- <!---Why---> [React Menu component - MUI](https://mui.com/components/menus/)'s code was used because,  material ui menu components provides attractive animations and customize styling options.
- <!---How---> [React Menu component - MUI](https://mui.com/components/menus/)'s code was modified by customizing css styling and using map to iterate through each menuitem.

## NavBar.js

_Lines 223-249_

```
<AppBar position='static'>
      <Container maxWidth='100%'>
        <Toolbar disableGutters>
          <Box
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            {renderAppIconView()}
          </Box>

          {renderPagesListingView()}
          {renderResponsiveMenu()}

          <Box
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {renderAppIconView()}
          </Box>

          {renderServiceView()}
          {renderProfileView()}
        </Toolbar>
      </Container>
    </AppBar>
```

The code above was created by adapting the code in [App Bar React component - MUI](https://mui.com/components/app-bar/#main-content) as shown below:

```
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
```

- <!---How---> The code in [App Bar React component - MUI](https://mui.com/components/app-bar/#main-content) was implemented by using various material ui components to design appbar for the website.
- <!---Why---> [App Bar React component - MUI](https://mui.com/components/app-bar/#main-content)'s code was used because, material ui appbbar components provides attractive animations, customize styling options, and auto responsive desing implementation.
- <!---How---> [App Bar React component - MUI](https://mui.com/components/app-bar/#main-content)'s code was modified by customizing css styling, add code to hide and display componet to give responsiveness, and integrate other component such menu, buttons.

## ServiceCarousel.js

_Lines 23-40_

```
<Grid container spacing={2}>
            <Grid item xs={8}>
                <img src={service.img} height="100%" width="300px" />
            </Grid>
            <Grid item xs={4}>
                <div className='content'>
                <div className='title'>{service.serviceName}</div>
                <p className='description'>{service.desc}</p>
                <Button sx={{color: "black"}} onClick={() => navigate('./beautyservices')}
                size='small'
                variant="outlined"
                >
                Book Now
                </Button>
                </div>
            </Grid>
</Grid>
```

The code above was created by adapting the code in [React Responsive Carousel](https://www.npmjs.com/package/react-responsive-carousel) as shown below:

```
<Carousel>
                <div>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div>
 </Carousel>
```

- <!---What---> The code in [React Responsive Carousel](https://www.npmjs.com/package/react-responsive-carousel) was implemented by using various material ui components to design a responsive carousel.
- <!---Why---> [React Responsive Carousel](https://www.npmjs.com/package/react-responsive-carousel)'s code was used because, it provides responsive carousels which are easy to integrate and customize.
- <!---How---> [React Responsive Carousel](https://www.npmjs.com/package/react-responsive-carousel)'s code was modified by customizing css styling and using map to iterate through each item in the carousel. Also, material UI grid was used for sectioning the carousel slides in two parts, of picture and details.

## ServiceTile.js

_Lines 44-80_

```
<Card className={classes.root}>
     <div
        style={{
          flex: 1,
          heigth: '140px',
          position: 'relative',
          maxWidth: "inherit",
    minWidth: "inherit"
        }}
      >
      <CardMedia style={{ height: "700px", width: "100%", paddingTop: "2%" }} component="img" image={props.service.categoryImg} title={props.service.serviceCategory}/> 
      <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'white',
          margin: '80px',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
          <Typography variant='h4'>{props.service.serviceCategory}</Typography>
          <Typography variant='h6'>{props.service.categoryDesc}</Typography>

         <Button
          size='small'
          variant="contained"
          color='primary'
          onClick={navigateToServicePage}
        >
          Book Now
        </Button>
         </div>
  </div>
</Card>
```

The code above was created by adapting the code in [Card component - MUI](https://mui.com/components/cards/#basic-card) as shown below:

```
 <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
```

- <!---What---> The code in [Card component - MUI](https://mui.com/components/cards/#basic-card) was implemented by using various material ui components to design cards for service tiles that are reused in the website for different services.
- <!---Why---> [Card component - MUI](https://mui.com/components/cards/#basic-card)'s code was used because, material ui card components provides attractive, and customizable styling options. Also these are easy to reuse.
- <!---How---> [Card component - MUI](https://mui.com/components/cards/#basic-card)'s code was modified by customizing css styling, and adding the text and buttons on the media.

## ServiceCard.js

_Lines 143-165_

```
<Card className={classes.root}>
        <CardHeader
          title={props.services.serviceName}
          subheader={props.services.subheader}
          sx={{ textAlign: 'start' }}
        />
        <CardMedia className={classes.media} image={props.services.img} />
        <CardContent>
        <Typography align='left' variant='overline' color='textSecondary' gutterBottom component='p'>
          <b>Base price: ${props.services.price}*</b>
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.services.title}
          </Typography>
          
        </CardContent>
        <CardActions className={classes.cardAction} disableSpacing>
          {/* <IconButton aria-label='add to cart'>
            <ShoppingCartIcon />
          </IconButton> */}
          <Button size="small" variant='text' onClick={handleClickOpenDialog} sx={{ textDecoration: 'underline' }}>
            Book Service
          </Button>
</Card>
```

The code above was created by adapting the code in [Card component - MUI](https://mui.com/components/cards/#complex-interaction) as shown below:

```
 <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
```
- <!---What---> The code in [Card component - MUI](https://mui.com/components/cards/#complex-interaction) was implemented by using various material ui components to design cards for service tiles that are reused in the website for different services.
- <!---Why---> [Card component - MUI](https://mui.com/components/cards/#complex-interaction)'s code was used because, material ui card components provides attractive, and customizable styling options. Also these are easy to reuse.
- <!---How---> [Card component - MUI](https://mui.com/components/cards/#complex-interaction)'s code was modified by customizing css styling, and adding dialogs for card action.
