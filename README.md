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
