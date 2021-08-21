import React, { Key } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  CardContent,
  Grid,
  Card,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Clear";
import { useCartPloc } from "../App";
import { CartItemState } from "../../presenters";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  productTitle: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: 50,
  },
  productPrice: {
    textAlign: "center",
  },
  itemContainer: {
    margin: theme.spacing(1),
  },
  itemImage: {
    padding: theme.spacing(0, 1),
    backgroundSize: "auto 100%",
  },
  secondContainer: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 0),
    justifyContent: "space-around",
  },
  quantityField: {
    marginTop: theme.spacing(1),
    width: 60,
  },
}));

interface CartProps {
  key: Key;
  cartItem: CartItemState;
}

const CartContentItem: React.FC<CartProps> = ({ key, cartItem }) => {
  const classes = useStyles();
  const bloc = useCartPloc();

  return (
    <Grid item xs={6} md={3} lg={2}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.productTitle} gutterBottom variant="subtitle1">
            {cartItem.title}
          </Typography>
          <Typography variant="h6" className={classes.productPrice}>
            {cartItem.price}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

        // <React.Fragment>
        //     <Paper className={classes.itemContainer}>
        //         <ListItem key={key}>
        //             <ListItemText
        //                 primary={cartItem.title}
        //                 secondary={
        //                     <Box flexDirection="row" className={classes.secondContainer}>
        //                         <TextField
        //                             id="standard-number"
        //                             label="Quantity"
        //                             type="number"
        //                             className={classes.quantityField}
        //                             InputLabelProps={{
        //                                 shrink: true,
        //                             }}
        //                             margin="none"
        //                             value={cartItem.quantity}
        //                             onChange={event =>
        //                                 bloc.editQuantityCartItem('A001',cartItem, +event.target.value)
        //                             }
        //                         />
        //                         <Typography variant="body1">{cartItem.price}</Typography>
        //                     </Box>
        //                 }
        //             />
        //             <ListItemSecondaryAction>
        //                 <IconButton edge="end" aria-label="delete">
        //                     <RemoveIcon onClick={() => bloc.removeCartItem('A001', cartItem)} />
        //                 </IconButton>
        //             </ListItemSecondaryAction>
        //         </ListItem>
        //     </Paper>
        // </React.Fragment>
    );
};

export default CartContentItem;
