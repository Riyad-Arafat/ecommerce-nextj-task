import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { IProduct } from "../typings/product";
import { ICartContext } from "../typings/cart";
import { CartContext } from "../contexts/CartContextProvider";

type ProductItemProps = {
  product: IProduct;
};

const ProductItem = React.memo(
  ({ product }: ProductItemProps) => {
    const { cartItems, addItemToCart, removeItemFromCart } =
      React.useContext<ICartContext>(CartContext);

    // check if the product is already in the cart
    const isProductInCart = React.useMemo(() => {
      return cartItems.some((item) => item.id === product.id);
    }, [cartItems, product.id]);

    const handelOnClick = React.useCallback(() => {
      if (isProductInCart) {
        removeItemFromCart(product);
      } else {
        addItemToCart(product);
      }
    }, [isProductInCart, product, addItemToCart, removeItemFromCart]);

    return (
      <Grid item xs={12} sm={6} md={4} key={product.id}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              height={200}
            />
            <CardContent>
              <Typography variant="h5" component="h2" noWrap>
                {product.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.category}
              </Typography>
              <Typography variant="h6" color="textPrimary" component="p">
                ${product.price}
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                Rating : {product.rating.rate} ({product.rating.count})
              </Typography>
            </CardContent>
          </CardActionArea>
          <Button
            variant="contained"
            color={isProductInCart ? "error" : "primary"}
            fullWidth
            onClick={handelOnClick}
          >
            {isProductInCart ? "Remove from cart" : "Add to cart"}
          </Button>
        </Card>
      </Grid>
    );
  },

  (prevProps, nextProps) => prevProps.product.id === nextProps.product.id
);

export default ProductItem;
