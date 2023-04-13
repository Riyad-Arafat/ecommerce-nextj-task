import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "../src/components/Link";
import ProductList from "../src/components/ProductList";
import { IProduct } from "../src/typings/product";
import { CartContext } from "../src/contexts/CartContextProvider";
import { ICartContext } from "../src/typings/cart";

export default function CartPage() {
  const { cartItems } = React.useContext<ICartContext>(CartContext);

  const cartItemsTotal = React.useMemo(() => {
    return cartItems.length;
  }, [cartItems]);

  const cartItemsCost = React.useMemo(() => {
    return cartItems.reduce(
      (acc: number, item: IProduct) => acc + item.price,
      0
    );
  }, [cartItems]);

  return (
    <Grid
      container
      spacing={5}
      alignItems="center"
      p={{
        xs: 2,
        sm: 4,
      }}
    >
      <Grid item xs={12} sm={6}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">Cart</Typography>
          <Typography variant="subtitle1">
            Total Items: {cartItemsTotal}
          </Typography>
          <Typography variant="subtitle1">
            Total Cost: ${cartItemsCost}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Link href="/" color="secondary">
          Go to products
        </Link>
      </Grid>

      <Grid item xs={12}>
        <ProductList products={cartItems} />
      </Grid>
    </Grid>
  );
}
