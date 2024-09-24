import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";


function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log(orderDetails, "orderList");

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todos os Pedidos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID do Pedido</TableHead>
              <TableHead>Data do Pedido</TableHead>
              <TableHead>Status do Pedido</TableHead>
              <TableHead>Valor Total do Pedido</TableHead>
              <TableHead>
                <span className="sr-only">Detalhes</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {orderList && orderList.length > 0
    ? orderList.map((orderItem) => (
        <TableRow key={orderItem?._id}>
          <TableCell>{orderItem?._id}</TableCell>
          <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
          <TableCell>
            <Badge
              className={`py-1 px-3 ${
                orderItem?.orderStatus === "confirm"
                  ? "bg-green-500"
                  : orderItem?.orderStatus === "rejected"
                  ? "bg-red-600"
                  : "bg-black"
              }`}
            >
              {orderItem?.orderStatus}
            </Badge>
          </TableCell>
          <TableCell>${orderItem?.totalAmount}</TableCell>
          <TableCell>
            <Dialog
              open={openDetailsDialog}
              onOpenChange={() => {
                setOpenDetailsDialog(false);
                dispatch(resetOrderDetails());
              }}
            >
              <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>
               Detalhes
              </Button>
              <AdminOrderDetailsView orderDetails={orderDetails} />
            </Dialog>
          </TableCell>
        </TableRow>
      ))
    : null}
    </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;