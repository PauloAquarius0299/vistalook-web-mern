import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import accImg from '../../assets/accImg.jpg'
import ShoppingOrders from '@/components/shopping-view/orders'
import Address from '@/components/shopping-view/address'

const ShoppingAccount = () => {
  return (
    <div className="flex flex-col">
      <div className='relative h-[350px] w-full overflow-hidden'>
        <img
        className='h-full w-full object-cover object-center'
        src={accImg}
        />
      </div>
      <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-md'>
          <Tabs defaultValue='orders'>
            <TabsList>
              <TabsTrigger value='orders'>Pedidos</TabsTrigger>
              <TabsTrigger value='address'>Endereço</TabsTrigger>
            </TabsList>
            <TabsContent value='orders'>
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value='address'>
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount
