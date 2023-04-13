import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
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

    const quantity = React.useRef<number>(product.quantity || 1);

    // check if the product is already in the cart
    const isProductInCart = React.useMemo(() => {
      return cartItems.some((item) => item.id === product.id);
    }, [cartItems, product.id]);

    const handelOnClick = React.useCallback(() => {
      if (isProductInCart) {
        quantity.current = 1;
        removeItemFromCart(product);
      } else {
        addItemToCart({
          ...product,
          quantity: quantity.current,
        });
      }
    }, [isProductInCart, product, addItemToCart, removeItemFromCart]);

    const handelOnChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        quantity.current = Number(event.target.value);
        addItemToCart({
          ...product,
          quantity: quantity.current,
        });
      },
      [addItemToCart, product]
    );

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
          {isProductInCart && (
            <TextField
              label="Quantity"
              type="number"
              defaultValue={quantity.current}
              onChange={handelOnChange}
              style={{
                marginBlock: "1rem",
                marginInline: "1rem",
              }}
            />
          )}

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
