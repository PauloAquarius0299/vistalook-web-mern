import PropTypes from 'prop-types';
import { useSelector } from "react-redux"
import { Badge } from "../ui/badge"
import { DialogContent } from "../ui/dialog"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"


const ShoppingOrdersDetailsView = ({orderDetails}) => {
    const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className='sm:max-w-[600px] '>
      <div className='grid gap-6'>
        <div className='grid gap-2'>
            <div className='flex  mt-6 items-center justify-between'>
                <p className='font-medium'>Pedidos ID</p>
                <Label>{orderDetails?._id}</Label>
            </div>
            <div className='flex  mt-2 items-center justify-between'>
                <p className='font-medium'>Pedidos Data</p>
                <Label>{orderDetails?.orderDetails.split('T')[0]}</Label>
            </div>
            <div className='flex  mt-2 items-center justify-between'>
                <p className='font-medium'>Pedidos Preço</p>
                <Label>${orderDetails?.totalAmount}</Label>
            </div>
            <div className='flex  mt-2 items-center justify-between'>
                <p className='font-medium'>Metodo de Pagamento</p>
                <Label>${orderDetails?.paymentMethod}</Label>
            </div>
            <div className='flex  mt-2 items-center justify-between'>
                <p className='font-medium'>Status de Pagamento</p>
                <Label>${orderDetails?.paymentStatus}</Label>
            </div>
            <div className='flex mt-2 items-center justify-between'>
                <p className='font-medium'>Pedidos Status</p>
                <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmado"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejeitado"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
            </div>
        </div>
        <Separator />
        <div className='grid gap-4'>
            <div className="grip gap-2">
                <div className="font-medium">Detalhes do Pedido</div>
                <ul className='grid gap-3'>
                {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li key={item.id} className="flex items-center justify-between">
                      <span>Titulo: {item.title}</span>
                      <span>Quantidade: {item.quantity}</span>
                      <span>Preço: ${item.price}</span>
                    </li>
                  ))
                : null}
                </ul>
            </div>
        </div>
        <div className='grid gap-4'>
            <div className="grip gap-2">
                <div className="font-medium">Informações do Cliente</div>
                <div className='grid gap-0.5 text-muted-foreground'>
                <span>{user.userName}</span>
                <span>{orderDetails?.addressInfo?.address}</span>
                <span>{orderDetails?.addressInfo?.city}</span>
                <span>{orderDetails?.addressInfo?.pincode}</span>
                <span>{orderDetails?.addressInfo?.phone}</span>
                <span>{orderDetails?.addressInfo?.notes}</span>
                </div>
            </div>
        </div>
      </div>
    </DialogContent>
  )
};

ShoppingOrdersDetailsView.propTypes = {
    orderDetails: PropTypes.shape({
      _id: PropTypes.string,
      orderDetails: PropTypes.string,
      totalAmount: PropTypes.number,
      paymentMethod: PropTypes.string,
      paymentStatus: PropTypes.string,
      orderStatus: PropTypes.string,
      cartItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      })),
      addressInfo: PropTypes.shape({
        address: PropTypes.string,
        city: PropTypes.string,
        pincode: PropTypes.string,
        phone: PropTypes.string,
        notes: PropTypes.string,
      }),
    }).isRequired,
  };

export default ShoppingOrdersDetailsView
