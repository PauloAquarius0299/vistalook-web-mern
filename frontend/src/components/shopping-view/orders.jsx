import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import ShoppingOrdersDetailsView from "./order-details"

const ShoppingOrders = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

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
            <TableRow>
              <TableCell>123456789</TableCell>
              <TableCell>21/09/2024</TableCell>
              <TableCell>Em Processo...</TableCell>
              <TableCell>$1000</TableCell>
              <TableCell>
                <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                  <Button onClick={()=> setOpenDetailsDialog(true)}>Ver Detalhes</Button>
                <ShoppingOrdersDetailsView />
                </Dialog>
                </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ShoppingOrders
