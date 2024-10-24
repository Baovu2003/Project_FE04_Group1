const Product = require("../../models/product.model");


// -------------------------[GET]: /admin/products-------------------------------
module.exports.index = async (req, res) => {
  // const products = await Product.find({
  //   status: "active",
  //   deleted: false,
  // })
  // .sort({position: "desc"})

  // console.log({products})

  // const newProducts= products.map(item =>{
  //   item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(0);
  //   return item;
  // })


  // console.log("products", newProducts);


  // res.render("client/pages/products/index.pug", {
  //   pageTitle: "Danh sách sản phẩm",
  //   products: newProducts,
  // });
  try {
    const products = await Product.find({
      status: "active",
      deleted: false,
    }).sort({ position: "desc" });

    const newProducts = products.map(item => {
      item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
      return item;
    });

    res.status(200).json(newProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

