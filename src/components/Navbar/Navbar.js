import React, { useState } from 'react'
import { AppBar, IconButton, Toolbar, Typography, Button, Box, MenuItem, MenuList, Menu } from '@material-ui/core'
import { Home } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    let navigate = useNavigate();

    const navigateToBeautyServices = () => {
        handleClose();
        navigate("./beautyservices");
    };

    const navigateToHome = () => {
        navigate("./");
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openMenu = Boolean(anchorEl);
    return (
        <div>
            <AppBar style={{ backgroundColor: "#282C34" }} position="static">
                <Toolbar>
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: '100%' }} component="div">
                        <Box>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={navigateToHome}>
                                <Home></Home>
                                <Typography style={{ paddingLeft: "10px" }} variant="h6">
                                    Urban Halifax
                                </Typography>
                            </IconButton>
                        </Box>

                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                            {/* <Button
                            sx={{textTransform: 'unset'}}
                                uppercase="false"
                                color="inherit"
                                aria-controls={openMenu ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <Typography sx={{textTransform: 'unset'}} variant="h6">
                                    Services
                                </Typography>

                            </Button> */}
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>

                                <Typography sx={{ marginRight: "20px" }} variant="h6" aria-controls='menu-list' aria-haspopup='true' aria-expanded={openMenu ? 'true' : undefined}  >
                                    Services
                                </Typography>

                                <ExpandMoreIcon />

                            </IconButton>


                            <Menu 
                                getContentAnchorEl={null}
                                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                                transformOrigin={{vertical: 'top', horizontal: 'center'}}
                                id='menu-list' open={openMenu} onClose={handleClose} anchorEl={anchorEl}>
                                <MenuItem onClick={navigateToBeautyServices}>
                                    Beauty Services
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    Home Repair Services
                                </MenuItem>
                            </Menu>

                            <Typography style={{ padding: "12px" }} variant="h6">
                                Offers
                            </Typography>
                            <Typography style={{ padding: "12px" }} variant="h6"  >
                                Reviews
                            </Typography>
                            {/* <Typography sx={{ marginRight:"20px", cursor: "pointer"  }}>
                                Offers
                            </Typography>
                            <Typography sx={{ marginRight:"20px", cursor: "pointer"  }}>
                                Reviews
                            </Typography> */}
                        </Box>

                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                            <Typography style={{ padding: "12px" }} variant="h6"  >
                                Contact Us
                            </Typography>
                            <Typography style={{ padding: "12px" }} variant="h6"  >
                                FAQs
                            </Typography>
                            <Typography style={{ padding: "12px" }} variant="h6"  >
                                View Cart
                            </Typography>
                            <Button color="inherit">Logout</Button>
                        </Box>

                    </Box>



                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Navbar
