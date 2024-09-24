import { useState } from "react"
import PropTypes from "prop-types";
import CommonForm from "../common/form"
import { DialogContent } from "../ui/dialog"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { useToast } from "@/hooks/use-toast"
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/admin/order-slice"

const initialFormData = {
    status: ''
}

const AdminOrdersDetailsView = ({orderDetails}) => {
    const [formData, setFormData] = useState(initialFormData);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function handleUpdateStatus(event){
        event.preventDefault();
        const {status} = formData;

        dispatch(
            updateOrderStatus({id: orderDetails?._id, orderDetails: status})
        ).then((data) => {
            if(data?.payload?.success){
                dispatch(getOrderDetailsForAdmin(orderDetails?._id));
                dispatch(getAllOrdersForAdmin());
                toast({
                    title: data?.payload?.message,
                })
            }
        })
    }

  return (
    <DialogContent className='sm:max-w-[600px] '>
       <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">ID do Pedido</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Data do Pedido</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Valor Total</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Metodo de Pagamento</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Status de Pagamento</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Status do Pedido</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
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
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Detalhes do Pedido</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li  key={item.id} className="flex items-center justify-between">
                      <span>Titulo: {item.title}</span>
                      <span>Quantitdade: {item.quantity}</span>
                      <span>Preço: ${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Informações de Envio</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Status do Pedido",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pendente" },
                  { id: "inProcess", label: "No Processo" },
                  { id: "inShipping", label: "No envio..." },
                  { id: "delivered", label: "Entregue" },
                  { id: "rejected", label: "Rejeitado" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Atualizando status do pedido"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  )
};

// Definindo os propTypes para validação
AdminOrdersDetailsView.propTypes = {
    orderDetails: PropTypes.shape({
      _id: PropTypes.string,
      orderDate: PropTypes.string,
      totalAmount: PropTypes.number,
      paymentMethod: PropTypes.string,
      paymentStatus: PropTypes.string,
      orderStatus: PropTypes.string,
      cartItems: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
          quantity: PropTypes.number,
          price: PropTypes.number,
        })
      ),
      addressInfo: PropTypes.shape({
        address: PropTypes.string,
        city: PropTypes.string,
        pincode: PropTypes.string,
        phone: PropTypes.string,
        notes: PropTypes.string,
      }),
    }),
};

export default AdminOrdersDetailsView
