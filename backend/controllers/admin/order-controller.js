const Order = require('../../models/Order')

const getAllOrdersAllUsers = async (req, res) => {
    try {
  
      const orders = await Order.find({  });
  
      if (!orders.length) {
        return res.status(404).json({
          success: false,
          message: "Pedido não encontrado!",
        });
      }
  
      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Algo deu errado!",
      });
    }
};

const getOrderDetailsForAdmin = async (req, res) => {
    try {
      const { id } = req.params;
  
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Pedido não encontrado!",
        });
      }
  
      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Algo deu errado!",
      });
    }
};

const updateOrderStatus = async (req,res)=> {
  try {
    const {id} = req.params;
    const {orderStatus} = req.body;

    const order = await Order.findById(id);

    if(!order){
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado'
      });
    }

    await Order.findByIdAndUpdate(id, {orderStatus});

    res.status(200).json({
      success: true,
      message: 'Status do pedido foi atualizado com sucesso!'
    })
  } catch (e) {
    console.log(e);
      res.status(500).json({
        success: false,
        message: "Algo deu errado!",
      });
  }
};

  

module.exports = {getAllOrdersAllUsers, getOrderDetailsForAdmin, updateOrderStatus}