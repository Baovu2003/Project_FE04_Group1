const Role = require("../../models/roles.model");
const systemconfig = require("../../config/system");
// [GET]: /admin/roles
// module.exports.index = async (req, res) => {
//   let find = {
//     deleted: false,
//   };
//   const role = await Role.find(find);
//   console.log(role);
//   res.render("admin/pages/roles/index.pug", {
//     pageTitle: "Trang Nhóm quyền",
//     records: role,
//   });
// };
// [GET]: /api/admin/roles
module.exports.index = async (req, res) => {
  try {
    const roles = await Role.find({ deleted: false });
    res.status(200).json({
      pageTitle: "Trang Nhóm quyền",
      records: roles,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles", error });
  }
};

// module.exports.create = async (req, res) => {
//     let find = {
//       deleted: false,
//     };
//     const role = await Role.find(find);
//     console.log(role);
//     res.render("admin/pages/roles/create.pug", {
//       pageTitle: "Tạo quyền",
//       records: role,
//     });
//   };

// module.exports.createPost = async (req, res) => {
//   const record = new Role(req.body)
//   await record.save();
//   res.redirect(`${systemconfig.prefixAdmin}/roles`);
// };
// [POST]: /api/admin/roles/create
module.exports.createPost = async (req, res) => {
  try {
    const record = new Role(req.body);
    await record.save();
    res.status(201).json({ message: "Role created successfully", record });
  } catch (error) {
    res.status(500).json({ message: "Error creating role", error });
  }
};

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await Role.findOne({ deleted: false, _id: id });

    if (!role) {
      // If no role is found, send a 404 response or redirect
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({
      pageTitle: "Sửa Nhóm quyền",
      records: role,
    });
  } catch (error) {
    // Log the error and handle other exceptions
    console.error("Error fetching role:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await Role.updateOne({_id: id }, req.body);

    res.status(200).json({ message: "Load ok" });
  } catch (error) {
    // Log the error and handle other exceptions
    console.error("Error fetching role:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// module.exports.permissions = async (req, res) => {
//   let find = {
//     deleted: false,
//   };
//   const role = await Role.find(find);
//   console.log(role);
//   res.render("admin/pages/roles/permissions.pug", {
//     pageTitle: "Trang phân quyền",
//     records: role,
//   });

//   // res.send("Ok")
// };

// module.exports.permissionsPatch = async (req, res) => {

//   try {
//     console.log(req.body.permissions)
//     const permissions = JSON.parse(req.body.permissions);
//     console.log(permissions)
//     for(const item of permissions){
//       console.log(item)
//          const id = item.id;
//       const permissionsChild = item.permissionsChild
//       console.log(permissionsChild)
//       await Role.updateOne(
//         {_id: id},
//         {permission: permissionsChild}
//       )
//     }
//     req.flash("success", `Phân quyền successfully`);
//     res.redirect("back");
//   } catch (error) {
//     req.flash("error", `Phân quyền error `);
//   }

// };
