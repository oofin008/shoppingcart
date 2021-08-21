import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { List, Box, Typography, CircularProgress, Container, Grid } from "@material-ui/core";
import CartContentItem from "./CartContentItem";
import { CartItemState } from "../../presenters";
import { useCartPloc } from "../App";
import { usePlocState } from "../../shared/presentation/usePlocState";

const useStyles = makeStyles((theme: Theme) => ({
  titleContainer: {
    marginBottom: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  totalPriceContainer: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 0),
    justifyContent: "space-around",
  },
  itemsContainer: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 0),
    justifyContent: "space-around",
    minHeight: 150,
  },
  itemsList: {
    overflow: "scroll",
  },
  infoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
}));

const CartContent: React.FC = () => {
  const classes = useStyles();
  const ploc = useCartPloc();
  const state = usePlocState(ploc);

  const cartItems = (items: CartItemState[]) => (
    <List className={classes.itemsList}>
      {items.map((item, index) => (
        <CartContentItem key={index} cartItem={item} />
      ))}
    </List>
  );

  const emptyCartItems = () => (
    <React.Fragment>
      <Typography variant="h6" component="h2">
        Empty Cart :(
      </Typography>
    </React.Fragment>
  );

  switch (state.kind) {
    case "LoadingCartState": {
      return (
        <div className={classes.infoContainer}>
          <Typography display="inline" variant="h5" component="h2">
            {"Shopping Cart Loading..."}
          </Typography>
        </div>
      );
    }
    case "ErrorCartState": {
      return (
        <div className={classes.infoContainer}>
          <Typography display="inline" variant="h5" component="h2">
            {state.error}
          </Typography>
        </div>
      );
    }
    case "UpdatedCartState": {
      return (
        <Container className={classes.cardGrid} maxWidth="xl">
          <Box className={classes.totalPriceContainer}>
            <Typography display="inline" variant="h5" component="h2">
              {"Shopping Cart"}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {state.items.length > 0 ? cartItems(state.items) : emptyCartItems()}
          </Grid>
        </Container>
        // <React.Fragment>
        //     <Box flexDirection="column" className={classes.itemsContainer}>
        //         {state.items.length > 0 ? cartItems(state.items) : emptyCartItems()}
        //     </Box>
        //     <Divider />
        //     <Box flexDirection="row" className={classes.totalPriceContainer}>
        //         <Typography variant="h6" component="h2">
        //             Total Price
        //         </Typography>
        //         <Typography variant="h6" component="h2">
        //             {state.totalPrice}
        //         </Typography>
        //     </Box>
        // </React.Fragment>
      );
    }
  }
};

export default CartContent;
