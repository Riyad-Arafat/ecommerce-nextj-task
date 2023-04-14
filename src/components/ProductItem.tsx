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
    const {
      isProductInCart,
      addItemToCart,
      removeItemFromCart,
      updateItemInCart,
    } = React.useContext<ICartContext>(CartContext);

    const quantity = React.useRef(product.quantity || 1);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handelOnClick = React.useCallback(() => {
      if (isProductInCart(product)) {
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
        const value = Number(event.target.value);
        if (value <= 0) {
          inputRef.current!.value = "1";
          return;
        }
        quantity.current = value;
        updateItemInCart({
          ...product,
          quantity: quantity.current,
        });
      },
      [product, updateItemInCart]
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
          {isProductInCart(product) && (
            <TextField
              label="Quantity"
              type="number"
              defaultValue={quantity.current}
              // onChange={handelOnChange}
              inputRef={inputRef}
              InputProps={{
                onChange: handelOnChange,
              }}
              style={{
                marginBlock: "1rem",
                marginInline: "1rem",
              }}
            />
          )}

          <Button
            variant="contained"
            color={isProductInCart(product) ? "error" : "primary"}
            fullWidth
            onClick={handelOnClick}
          >
            {isProductInCart(product) ? "Remove from cart" : "Add to cart"}
          </Button>
        </Card>
      </Grid>
    );
  },

  (prevProps, nextProps) => prevProps.product.id === nextProps.product.id
);

export default ProductItem;
