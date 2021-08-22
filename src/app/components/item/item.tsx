import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
} from "@material-ui/core";
import { ItemProps } from "../../../domains/item/itemInterface";
import { useCartPloc } from "../../App";

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    justifyContent: "center",
  },
  productTitle: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: 50,
  },
  productPrice: {
    textAlign: "center",
  },
  quantityField: {
    marginTop: theme.spacing(1),
    width: 60,
  },
}));

interface itemListProps {
  item: ItemProps;
}

const Item: React.FC<itemListProps> = ({item: product}) => {
  const classes = useStyles();
  const bloc = useCartPloc();

  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.productTitle} gutterBottom variant="subtitle1">
            {product.title}
          </Typography>
          <Typography variant="h6" className={classes.productPrice}>
            {product.price.toLocaleString("th-TH", {
              style: "currency",
              currency: "THB",
            })}
          </Typography>
          <TextField
            id="standard-number"
            label="Quantity"
            type="number"
            className={classes.quantityField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="none"
            value={product.quantity}
            disabled
          />
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={() => bloc.addItemToCart('A001', product)}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Item;
