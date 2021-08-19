import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { ItemProps } from "../../domains/item/itemInterface";
import { useCartPloc } from "../App";

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    backgroundSize: "auto 100%",
    paddingTop: "100%",
    margin: theme.spacing(1),
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
}));

interface ProductListProps {
  product: ItemProps;
}

const ProductItem: React.FC<ProductListProps> = ({product}) => {
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
            {product.price.toLocaleString("es-ES", {
              style: "currency",
              currency: "THB",
            })}
          </Typography>
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

export default ProductItem;
