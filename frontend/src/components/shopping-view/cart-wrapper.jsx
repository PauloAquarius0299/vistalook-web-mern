import PropTypes from 'prop-types';
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from './cart-items-content'
import { useNavigate } from 'react-router-dom';

const UserCartWrapper = ({cartItems, setOpenCartSheet}) => {

    const navigate = useNavigate()

    
  const totalCartAmount =
  cartItems && cartItems.length > 0
    ? cartItems.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
            currentItem?.quantity,
        0
      )
    : 0;


  return (
    <SheetContent className='sm:max-w-md'>
        <SheetHeader>
            <SheetTitle>
                Itens no Carrinho
            </SheetTitle>
        </SheetHeader>
        <div className='mt-8 space-y-4'>
            {
                cartItems && cartItems.length > 0 ?
                cartItems.map((item) => (
                    <UserCartItemsContent  key={item.id}  cartItem={item} />
                )) : null
            }
        </div>
        <div className='mt-8 space-y-4'>
            <div className='flex justify-between'>
                <span className='font-bold'>Total:</span>
                <span className='font-bold'>${totalCartAmount}</span>
            </div>
        </div>
        <Button onClick={()=> {
            navigate('/shop/checkout')
            setOpenCartSheet(false)
        }} className='w-full mt-6'>Confirmar</Button>
    </SheetContent>
  )
};

UserCartWrapper.propTypes = {
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            productId: PropTypes.string.isRequired,
            title: PropTypes.string,
            image: PropTypes.string,
            quantity: PropTypes.number.isRequired,
            salePrice: PropTypes.number,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
    setOpenCartSheet: PropTypes.func.isRequired,
};

export default UserCartWrapper
