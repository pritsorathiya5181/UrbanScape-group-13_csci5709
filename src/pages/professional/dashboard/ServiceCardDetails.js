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
            }}
            style={{ backgroundColor: "black" }}
          >
            <CardContent>
              <Typography
                variant="h3"
                component="div"
                style={{ color: "white" }}
                justifyContent="center"
              >
                {props.item.name}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                style={{ color: "white" }}
                justifyContent="center"
              >
                {props.item.charge}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                style={{ color: "white" }}
                justifyContent="center"
              >
                {props.item.locations}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
  );
};

export default ServiceCardDetails;
