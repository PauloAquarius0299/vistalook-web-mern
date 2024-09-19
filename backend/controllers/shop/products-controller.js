const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const { Categoria = [], Marcas = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (Categoria.length) {
      filters.category = { $in: Categoria.split(",") };
    }

    if (Marcas.length) {
      filters.brand = { $in: Marcas.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Algo deu errado nos filters",
    });
  }
};

const getProductDetails = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
  
      if (!product)
        return res.status(404).json({
          success: false,
          message: "Produto não encontrado!",
        });
  
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (e) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Some error occured",
      });
    }
  };
module.exports = {getFilteredProducts, getProductDetails}