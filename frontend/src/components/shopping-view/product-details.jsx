import PropTypes from 'prop-types';
import { Separator } from "../ui/separator"; 
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { setProductDetails } from '@/store/shop/product-slice';
import { Label } from '../ui/label';
import StarRatingComponent from '../common/star-rating';
import { useEffect, useState } from 'react';
import { addReview, getReviews } from '@/store/shop/review-slice';

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  const [reviewMsg, setReviewMsg] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth);
  const {cartItems} = useSelector((state)=> state.shopCart);
  const {reviews} = useSelector((state)=> state.shopReview);
  const {toast} = useToast();

  function handleRatingChange(getRating){
    setRating(getRating)
  }

  function handleAddCart(getCurrentProductId, getTotalStock){
    let getCartItems = cartItems.items || [];

    if(getCartItems.length){
      const indexOfCurrentItem = getCartItems.findIndex(item=> item.productId === getCurrentProductId);
      if(indexOfCurrentItem > -1){
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if(getQuantity + 1 > getTotalStock){
          toast({
            title: `Só ${getQuantity} quantidade pode ser adicionada para este item`,
            variant: "destructive",
          });
          
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }))
    .then((data)=> {
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Produto adicionado ao carrinho",
        });
      }
    })
  }

  function handleDialogClose(){
    setOpen(false)
    dispatch(setProductDetails());
    setRating(0)
    setReviewMsg('');
  };

  function handleAddReview(){
    dispatch(addReview({
      productId: productDetails?._id,
      userId: user?.id,
      userName: user?.userName,
      reviewMessage: reviewMsg,
      reviewValue: rating,
    })).then(data=> {
      if(data.payload.success){
        setRating(0);
        setReviewMsg('');
        dispatch(getReviews(productDetails?._id));
        toast({
          title: 'Comentário adicionado com sucesso!'
        })
      }
      console.log(data)
    })
  };

  useEffect(() => {
    if(productDetails !== null) dispatch(getReviews(productDetails?._id))
  }, [productDetails]);

  const averageReview = reviews && reviews.length > 0 ?
        reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-extrabold">
              {productDetails?.title}
            </h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="mt-5 mb-5">
            <Button className="w-full" onClick={()=> handleAddCart(productDetails?._id, productDetails?.totalStock)} >Add ao Carrinho</Button>
          </div>
          <Separator />
          <div className="max-h-[360px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Avaliação</h2>
            <div className="grid gap-6">
                {
                  reviews && reviews.length > 0 ?
                  reviews.map(reviewItem =>    
                  <div className="flex gap-4" key={reviewItem._id}>
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={averageReview} />
                        ({averageReview.toFixed(2)})
                      </div>
                      <p className="text-muted-foreground">
                      {reviewItem?.reviewMessage}
                      </p>
                    </div>
                  </div> ) : <h1>Não há comentários</h1>
                }

            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Escreva seu comentário</Label>
              <div className='flex gap-1'>
                <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
              </div>
              <Input name='reviewMsg' 
              value={reviewMsg}
              onChange={(event) => setReviewMsg(event.target.value)} placeholder="Escrever a avaliação..." />
              <Button
              onClick={handleAddReview}
              disabled={reviewMsg.trim() === ''}
              >Enviar</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

ProductDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  productDetails: PropTypes.shape({
    _id: PropTypes.string.isRequired, 
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    salePrice: PropTypes.number,
    totalStock: PropTypes.number,
  }).isRequired,
};

export default ProductDetailsDialog;
