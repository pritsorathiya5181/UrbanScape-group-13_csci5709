import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useWindowDimensions from "../../../utils/scale";
import ServiceCardDetails from "./ServiceCardDetails";

export default function DashboardPrimary({ item }) {
  const { width } = useWindowDimensions();

  const serviceList = [
    {
      name: "Plumbing",
      charge: "30",
      locations: "Halifax, Dartmouth",
    },
    {
      name: "Carpenting",
      charge: "40",
      locations: "Halifax South-End",
    },
    {
      name: "Carpenting",
      charge: "40",
      locations: "Halifax South-End",
    },
    {
      name: "Carpenting",
      charge: "40",
      locations: "Halifax South-End",
    },
    {
      name: "Carpenting",
      charge: "40",
      locations: "Halifax South-End",
    },
  ];

  return (
    <>
      <Grid container spacing={0.25} sx={{margin: "0px 40px", display: "flex", justifyContent: "center", alignItems: "center"}} >
        <Grid item xs>
          <Card
            sx={{
              maxWidth: "275px",
            //   m: 4
            }}
            style={{ backgroundColor: "black" }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ color: "white", display: "flex", alignContent:"center",
                justifyContent:"center"}}
              >
                Pending Requests
              </Typography>
              <Typography
                variant="h1"
                component="div"
                sx={{ color: "white", display: "flex", alignContent:"center",
                justifyContent:"center" }}
              >
                12
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card
            sx={{
              maxWidth: "275px",
            }}
            style={{ backgroundColor: "black" }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ color: "white", display: "flex", alignContent:"center",
                justifyContent:"center" }}
              >
                Approved Requests
              </Typography>
              <Typography
                variant="h1"
                component="div"
                sx={{ color: "white", display: "flex", alignContent:"center",
                justifyContent:"center" }}
              >
                4
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card
            sx={{
              maxWidth: "275px",
            }}
            style={{ backgroundColor: "black" }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ color: "white", display: "flex", alignContent:"center",
                justifyContent:"center" }}
              >
                Processed Requests
              </Typography>
              <Typography
                variant="h1"
                component="div"
                sx={{ color: "white", display: "flex", alignContent:"center",
                justifyContent:"center" }}
              >
                123
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card
            sx={{
              maxWidth: "275px",
            }}
            style={{ backgroundColor: "black" }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ color: "white", display: "flex", alignContent:"center",
                justifyContent:"center" }}
              >
                Cancelled Requests
              </Typography>
              <Typography
                variant="h1"
                component="div"
                sx={{ color: "white", display: "flex", alignContent:"center",
                justifyContent:"center" }}
              >
                45
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={1} justifyContent="center" alignItems="center">
        {serviceList.map((item, index) => {
          return <ServiceCardDetails key={index.toString()} item={item} />;
        })}
      </Grid>

      {/* <Card
        sx={{
          maxWidth: "275px",
        }}
        style={{ backgroundColor: "black" }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            style={{ color: "white" }}
            justifyContent="center"
          >
            Pending Requests
          </Typography>
          <Typography
            variant="h1"
            component="div"
            style={{ color: "white" }}
            justifyContent="center"
          >
            12
          </Typography>
        </CardContent>
      </Card> */}
    </>
  );
}
