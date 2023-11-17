let categoryModel  = require("../models/category");
let getCategory = async (req, res) => {
    let category = req.params.category;
    try {
      let data = await categoryModel.findOne({ cat_title: category });
      res.status(200).json(data);
    } catch (err) {
      res.json(err.message);
    }
};


module.exports = {
    getCategory
};
