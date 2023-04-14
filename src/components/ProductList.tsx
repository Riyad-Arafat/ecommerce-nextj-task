import React from "react";
import { Grid, Typography } from "@mui/material";
import { IProduct } from "../typings/product";
import ProductItem from "./ProductItem";

type ProductListProps = {
  products: IProduct[];
};

const ProductList = React.memo(({ products }: ProductListProps) => {
  if (products.length === 0) {
    return (
      <Typography variant="h6" textAlign="center" width="100%">
        No products found
      </Typography>
    );
  }

  return (
    <Grid container spacing={5} alignItems="stretch">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Grid>
  );
});

export default ProductList;
