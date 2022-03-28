import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const ServiceCardDetails = (props) => {
  console.log(props.item.name);
  return (
    <Grid item xs>
          <Card
            sx={{
              maxWidth: "275px",
              m: 1
            }}
            style={{ backgroundColor: "black" }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ color: "white", display: "flex", alignContent:"center",
                justifyContent:"center", borderBottom: 1, borderColor: "white"}}
              >
                {props.item.name}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "white" }}
              >
                Charges per visit: {props.item.charge}$/hour
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "white" }}
                justifyContent="center"
              >
                Locations Served: {props.item.locations}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
  );
};

export default ServiceCardDetails;
