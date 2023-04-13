import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "../src/components/Link";
import ProductList from "../src/components/ProductList";
import { IProduct } from "../src/typings/product";
import { Grid } from "@mui/material";

type HomeProps = {
  products: IProduct[];
};

// getServersideProps is a Next.js function that fetches data on the server side
// and passes it to the component as props
export async function getServerSideProps() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = (await response.json()) as IProduct[];
  return {
    props: {
      products,
    },
  };
}

export default function Home({ products }: HomeProps) {
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} sm={6}>
        <Typography variant="h3">Products</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Link href="/cart" color="secondary">
          Go to cart
        </Link>
      </Grid>
      <Grid item xs={12}>
        <ProductList products={products} />
      </Grid>
    </Grid>
  );
}
