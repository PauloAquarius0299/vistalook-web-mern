
import Address from '@/components/shopping-view/address'
import img from '../../assets/login-hero.jpg'
import { useDispatch, useSelector } from 'react-redux'
import UserCartItemsContent from '@/components/shopping-view/cart-items-content'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { createNewOrder } from '@/store/shop/order-slice'
import { useToast } from '@/hooks/use-toast'

const ShoppingCheckout = () => {
  const {cartItems}= useSelector((state)=> state.shopCart);
  const {user}= useSelector((state)=> state.auth);
  const {approvalURL} = useSelector(state=>state.shopOrder)
  const [isPaymemntStart, setIsPaymemntStart] = useState(false)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const {toast} = useToast()

  console.log(currentSelectedAddress, 'addressListing')

  const totalCartAmount =
  cartItems && cartItems.items && cartItems.items.length > 0
    ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
            currentItem?.quantity,
        0
      )
    : 0;

  function handleInitiatePaypalPayment(){
    
    if(cartItems.length === 0){
      toast({
        title: 'Seu carrinho está vazio, add os seus produtos',
        variant: 'destructive'
      })

      return
    }

    if(currentSelectedAddress === null){
      toast({
        title: 'PorFavor selecione um endereço para progredir',
        variant: 'destructive'
      })

      return
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "paulodata");
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className='flex flex-col'>
      <div className='relative h-[360px] w-full overflow-hidden'>
        <img 
        src={img}
        className='h-full w-full object-cover object-center'
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className='flex flex-col gap-4'>
          {
            cartItems && cartItems.items && cartItems.items.length > 0 ?
            cartItems.items.map(item=> <UserCartItemsContent key={item.productId} cartItem={item} />):null
          }
          <div className='mt-8 space-y-4'>
            <div className='flex justify-between'>
                <span className='font-bold'>Total:</span>
                <span className='font-bold'>${totalCartAmount}</span>
            </div>
        </div>
        <div className='w-full mt-4'>
          <Button onClick={handleInitiatePaypalPayment} className='w-full'>Confirmar com Paypal</Button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout
