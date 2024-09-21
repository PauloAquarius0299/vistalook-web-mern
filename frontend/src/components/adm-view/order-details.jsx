
import { useState } from "react"
import CommonForm from "../common/form"
import { DialogContent } from "../ui/dialog"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"

const initialFormData = {
    status: ''
}

const AdminOrdersDetailsView = () => {

    const [formData, setFormData] = useState(initialFormData);

    function handleUpdateStatus(event){
        event.preventDefault()
    }

  return (
    <DialogContent className='sm:max-w-[600px] '>
      <div className='grid gap-6'>
        <div className='grid gap-2'>
            <div className='flex  mt-6 items-center justify-between'>
                <p className='font-medium'>Pedidos ID</p>
                <Label>123456</Label>
            </div>
            <div className='flex  mt-2 items-center justify-between'>
                <p className='font-medium'>Pedidos Data</p>
                <Label>19/09/2025</Label>
            </div>
            <div className='flex  mt-2 items-center justify-between'>
                <p className='font-medium'>Pedidos Preço</p>
                <Label>$500</Label>
            </div>
            <div className='flex mt-2 items-center justify-between'>
                <p className='font-medium'>Pedidos Status</p>
                <Label>Em Progresso...</Label>
            </div>
        </div>
        <Separator />
        <div className='grid gap-4'>
            <div className="grip gap-2">
                <div className="font-medium">Detalhes do Pedido</div>
                <ul className='grid gap-3'>
                    <li className='flex items-center justify-between'>
                        <span>Product One</span>
                        <span>$100</span>
                    </li>
                </ul>
            </div>
        </div>
        <div className='grid gap-4'>
            <div className="grip gap-2">
                <div className="font-medium">Informações do Cliente</div>
                <div className='grid gap-0.5 text-muted-foreground'>
                    <span>Fulano de Tal</span>
                    <span>Endereço</span>
                    <span>Cidade</span>
                    <span>CEF</span>
                    <span>Telefone</span>
                    <span>Info add</span>
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
                    { id: "inProcess", label: "Em Processo" },
                    { id: "inShipping", label: "No Envio" },
                    { id: "delivered", label: "Entregue" },
                    { id: "rejected", label: "Rejeitado" },
                  ],
                }
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={'Status do Pedido Atualizado'}
            onSubmit={handleUpdateStatus}
            />
        </div>
      </div>
    </DialogContent>
  )
}

export default AdminOrdersDetailsView
