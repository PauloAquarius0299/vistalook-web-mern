import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import ShoppingOrdersDetailsView from "./order-details"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersByUserId } from "@/store/shop/order-slice"
import { Badge } from "../ui/badge"



const ShoppingOrders = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch()
  const {user} = useSelector(state=> state.auth);
  const {orderList} = useSelector(state=> state.shopOrder);

  useEffect(() =>{
    dispatch(getAllOrdersByUserId(user?.id))
  }, [dispatch]);

  console.log(orderList, 'orderList')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historico de Pedidos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedidos ID</TableHead>
              <TableHead>Pedidos Data</TableHead>
              <TableHead>Pedidos Status</TableHead>
              <TableHead>Pedidos Preço</TableHead>
              <TableHead>
                <span className='sr-only'>Detalhes</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orderList && orderList.length > 0 ?
              orderList.map((orderItem=>  
              <TableRow  key={orderItem?._id}>
                <TableCell>{orderItem?._id}</TableCell>
                <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                <TableCell>
                  <Badge className='p-4'>{orderItem?.orderStatus}</Badge>
                </TableCell>
                <TableCell>${orderItem?.totalAmount}</TableCell>
                <TableCell>
                  <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                    <Button onClick={()=> setOpenDetailsDialog(true)}>Ver Detalhes</Button>
                  <ShoppingOrdersDetailsView />
                  </Dialog>
                  </TableCell>
              </TableRow> )
              ) : null
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ShoppingOrders
