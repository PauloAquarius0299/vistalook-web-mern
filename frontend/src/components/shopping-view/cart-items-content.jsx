import PropTypes from 'prop-types';
import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";


const UserCartItemsContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction){

    if(typeOfAction == 'plus'){
      let getCartItems = cartItems.items || [];

    if(getCartItems.length){
      const indexOfCurrentItem = getCartItems.findIndex(item=> item.productId === getCartItem?.productId);

      const getCurrentProductIndex = productList.findIndex(
        (product) => product._id === getCartItem?.productId
      );
      
      const getTotalStock = productList[getCurrentProductIndex].totalStock;

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
    }

    dispatch(updateCartQuantity({
      userId: user?.id, 
      productId: getCartItem?.productId, 
      quantity:
      typeOfAction === 'plus' ?
      getCartItem?.quantity + 1 : getCartItem?.quantity - 1
    })).then(data=> {
      if(data?.payload?.success){
        toast({
          title: 'Items atualizados no carrinho!',
        })
      }
    })
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(deleteCartItem({ userId: user?.id, productId: getCartItem?.productId }))
    .then(data=> {
      if(data?.payload?.success){
        toast({
          title: 'Items deletados no carrinho!',
        })
      }
    })
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className='flex-1'>
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className='flex items-center gap-2 mt-1'>
          <Button variant='outline' size='icon' className='h-8 w-8 rounded-full' type="button"
          disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, 'minus')}
          >
            <Minus className='w-4 h-4' />
            <span className='sr-only'>Diminuir</span>
          </Button>
          <span className='font-semibold'>{cartItem?.quantity}</span>
          <Button variant='outline' size='icon' className='h-8 w-8 rounded-full' type="button"
            onClick={() => handleUpdateQuantity(cartItem, 'plus')}>
            <Plus className='w-4 h-4' />
            <span className='sr-only'>Aumentar</span>
          </Button>
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <p className='font-semibold'>
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash onClick={() => handleCartItemDelete(cartItem)} className="cursor-pointer mt-1" size={20} />
      </div>
    </div>
  );
}

UserCartItemsContent.propTypes = {
  cartItem: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    quantity: PropTypes.number,
    salePrice: PropTypes.number,
    price: PropTypes.number,
    productId: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCartItemsContent;
