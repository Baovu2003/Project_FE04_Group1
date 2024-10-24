// [GET]: /admin/dashboard

module.exports.dashboard = (req, res) => {
    // res.send("Trang tổng quan")
    res.json({
      pageTitle:"Trang tổng quan"
    });
  }