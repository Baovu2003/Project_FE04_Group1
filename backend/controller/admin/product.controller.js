const Product = require("../../models/product.model");
const systemconfig = require("../../config/system");
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
// [GET]: /admin/products
module.exports.index = async (req, res) => {
  // let find = {
  //   deleted: false,
  // };

  const products = await Product.find();
  res.json({
    pageTitle: "Danh sách sản phẩm",
    products: products,
  });
  // -----------------------END Phần sort--------------------------
};

// --------------------------/admin/change-status/:status/:id-------------------------------------------
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  try {
    const result = await Product.updateOne({ _id: id }, { status: status });

    // Check if any documents were modified
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Product not found or status unchanged." });
    }

    // Optionally, you can fetch the updated product to send back to the frontend
    const updatedProduct = await Product.findById(id);

    res.json({
      message: "Cập nhật trạng thái thành công!",
      product: updatedProduct, // Send the updated product details
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật trạng thái." });
  }
};

// --------------------------/admin/change-multi--------------------------------------
module.exports.changeMulti = async (req, res) => {
  // console.log("req.body", req.body);
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  console.log({ type, ids });
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `Update status successfully ${ids.length} products`);
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", `Update status successfully ${ids.length} products`);
      break;
    case "deleteAll":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: "true", deleteAt: new Date() }
      );
      req.flash("success", `Delete successfully ${ids.length} products`);
      break;
    case "change-position":
      console.log(ids);

      // Chỗ này phải dùng for of vì forEach không hỗ trợ async/await
      for (const element of ids) {
        // console.log(element);

        // Phải dùng biến let thì mới gán lại được giá trị cho position
        let [id, position] = element.split("-");
        position = Number(position);
        // console.log(id);
        // console.log(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash(
        "success",
        `Change position successfully ${ids.length} products`
      );
      break;
    // await Product.updateMany({ _id: { $in: ids } }, { deleted: "true" });

    default:
      break;
  }
  res.redirect("back");
  // res.send("ok")
};

// -----------------------------------[DELETE]: /admin/products/delete:id-------------------
module.exports.deleteItem = async (req, res) => {
  // console.log("req.params", req.params);
  const id = req.params.id;
  console.log("id: ", id);

  // -----------Xoá vĩnh viễn------------
  // await Product.deleteOne({ _id: id }, { deleted: "true" });

  // ----------Xoá mềm---------------
  // await Product.updateOne(
  //   { _id: id },
  //   {
  //     deleted: !(Product.deleted),
  //     deleteAt: new Date(),
  //   }
  // );
  // req.flash("success", `Update products successfully `);
  // res.redirect("back");

  try {
    // Tìm sản phẩm trước để lấy trạng thái hiện tại
    const product = await Product.findById(id);

    console.log(product.deleted)
    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("back");
    }

    // Cập nhật trạng thái deleted và deleteAt
    await Product.updateOne(
      { _id: id },
      {
        deleted: !product.deleted, // Đảo trạng thái deleted
        deleteAt: new Date(), // Cập nhật thời gian xóa
      }
    );
   
    res.json({
      message: "Deleted sản phẩm thành công!",
      product: product, // Send the updated product details
    });
  } catch (error) {
    console.error("Error updating deleted:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi deleted trạng thái." });
  }
};

// -------------------------[POST]/admin/producs/create----------------
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const category = await ProductCategory.find(find);
  console.log(category);

  const newCategory = createTreeHelper.tree(category);
  console.log(newCategory);

  res.render("admin/pages/products/create.pug", {
    pageTitle: "Thêm mới một sản phẩm",
    category: newCategory,
  });
};

// -------------------------[get]/admin/producs/create----------------
// module.exports.createUsePost = async (req, res) => {
//   console.log(req.file)
//   console.log("req.body:", req.body);
//   // if(!req.body.title){
//   //   req.flash("error", `Please enter the title`);
//   //   res.redirect("back");
//   //   return;
//   // }
//   req.body.price = Number(req.body.price);
//   req.body.discountPercentage = Number(req.body.discountPercentage);
//   req.body.stock = Number(req.body.stock);
//   if (req.body.position == "") {
//     const x = await Product.countDocuments();
//     // console.log(x)
//     req.body.position = x + 1;
//   } else {
//     req.body.position = Number(req.body.position);
//   }
//   if (req.file) {
//     req.body.thumbnail = `/uploads/${req.file.filename}`;
//   }

//   const product = new Product(req.body);
//   await product.save();
//   req.flash("success", `Create products successfully `);
//   res.redirect(`${systemconfig.prefixAdmin}/products`);
//   // res.send("Create use post");
// };

// module.exports.createUsePost = async (req, res) => {
//   try {
//       // Access the uploaded file's path
//       const thumbnailPath = req.file ? req.file.path : null;

//       console.log("thumbnailPath",thumbnailPath)
//       if (req.body.position == "") {
//         const x = await Product.countDocuments();
//         // console.log(x)
//         req.body.position = x+1
//       } else {
//         req.body.position = Number(req.body.position);
       
//       }
//       // Assuming you have a Product model
//       const productData = {
//           title: req.body.title,
//           description: req.body.description,
//           price: req.body.price,
//           discountPercentage: req.body.discountPercentage,
//           stock: req.body.stock,
//           category_id: req.body.category_id,
//           thumbnail: thumbnailPath, // Save the file path
//           position: req.body.position,
//           status: req.body.status
//       };

//       // const product = await Product.create(productData);
//       // res.status(201).json({ message: 'Product created successfully', product });
      
//   } catch (error) {
//       console.error('Error creating product:', error);
//       res.status(500).json({ error: error.message });
//   }
// };

module.exports.createUsePost = async (req, res) => {
  console.log("req.body:", req.body);
  console.log(req.file);
  // Cài đặt vị trí nếu chưa được cung cấp
  if (req.body.position === "") {
    const x = await Product.countDocuments();
    req.body.position = x + 1; // Tự động tăng vị trí
  } else {
    req.body.position = Number(req.body.position);
  }

  // Xử lý thumbnail
  if (req.file) {
    // Đường dẫn đến file đã upload
    req.body.thumbnail = `/uploads/${req.file.filename}`; // Lưu trữ đường dẫn vào req.body
  }

  // Tạo danh mục
  const product = new Product(req.body);
  console.log(product);

  await product.save();
  req.flash("success", "Create products successfully");
  res.redirect(`${systemconfig.prefixAdmin}/products-category`);
};


// -------------------------[GET]/admin/producs/edit/:id----------------
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      deleted: false,
      _id: id,
    };
    // const product = await Product.findById(id).exec();
    const product = await Product.findOne(find).exec();
    console.log("productById: ", product);

    let findProductCategory = {
      deleted: false,
    };
    const category = await ProductCategory.find(findProductCategory);
    console.log(category);

    const newCategory = createTreeHelper.tree(category);
    console.log(newCategory);

    //  res.send("ok")
    res.render("admin/pages/products/edit.pug", {
      pageTitle: "Update sản phẩm",
      product: product,
      category: newCategory,
    });
  } catch (error) {
    res.redirect(`${systemconfig.prefixAdmin}/products`);
  }
};

// -------------------------[PATCH]/admin/producs/edit/:id----------------

module.exports.editPatch = async (req, res) => {
  console.log("req.body:", req.body);
  req.body.price = Number(req.body.price);
  req.body.discountPercentage = Number(req.body.discountPercentage);
  req.body.stock = Number(req.body.stock);
  req.body.position = Number(req.body.position);

  if (req.body.position == "") {
    const x = await Product.countDocuments();
    // console.log(x)
    req.body.position = x + 1;
  } else {
    req.body.position = Number(req.body.position);
  }
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    await Product.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Update products successfully");

    // Send success response
    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Error updating product" }); // Send error response
  }

  // res.redirect(`${systemconfig.prefixAdmin}/products`);
};
// --------------[GET]: /admin/producs/detail/:id-----------
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      deleted: false,
      _id: id,
    };
    // const product = await Product.findById(id).exec();
    const product = await Product.findOne(find).exec();
    console.log("productById: ", product);
    //  res.send("ok")
    res.json({
      pageTitle: "Detail sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`admin/products`);
  }
};
