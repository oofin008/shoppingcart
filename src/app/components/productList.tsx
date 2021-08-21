import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Grid, Container, Box, Typography } from "@material-ui/core";
import ProductItem from "./productItem";
import { dependenciesLocator } from "../../shared/dependency/dependencyLocator";
import { usePlocState } from "../../shared/presentation/usePlocState";

const useStyles = makeStyles(theme => ({
    titleContainer: {
        marginBottom: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    infoContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
    },
}));

const ploc = dependenciesLocator.provideItemPloc();

const ProductList: React.FC = () => {
  const classes = useStyles();
  const state = usePlocState(ploc);

    React.useEffect(() => {
        const searchProducts = async (filter: string) => {
            ploc.search(filter);
        };

        searchProducts("Element");
    }, [ploc]);

    switch (state.kind) {
        case "LoadingProductsState": {
            return (
                <div className={classes.infoContainer}>
                    <CircularProgress />
                </div>
            );
        }
        case "ErrorProductsState": {
            return (
                <div className={classes.infoContainer}>
                    <Typography display="inline" variant="h5" component="h2">
                        {state.error}
                    </Typography>
                </div>
            );
        }
        case "LoadedProductsState": {
            return (
                <Container className={classes.cardGrid} maxWidth="xl">
                    <Box className={classes.titleContainer}>
                      <Typography display="inline" variant="h5" component="h2">
                        {"Item List"}
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {state.products.map((product, index) => (
                            <ProductItem product={product} key={index} />
                        ))}
                    </Grid>
                </Container>
            );
        }
    }
};

export default ProductList;
