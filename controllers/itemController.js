const Item = require("../models/item");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

let categoryData = []
let itemData = []


exports.add_item = asyncHandler(async (req, res, next) => {
    const name = req.body.itemName;
    const description = req.body.itemDescription;
    const price = req.body.itemPrice;
    const stock = req.body.itemStock;
    const URL = req.body.itemURL;
    const category = req.body.itemCategory;
    await Item.create({
        name: name,
        description: description,
        price: price,
        stock: stock,
        URL: URL,
        category: category
    });
    res.redirect("/categories");
});

exports.render_item = asyncHandler(async (req, res, next) => {
    const page = "items"
    res.render('layout', { title: 'Items', currentCategory: currentCategory, items: itemData, page: page });
});


exports.update_item = asyncHandler(async (req, res, next) => {

});


exports.delete_item = asyncHandler(async (req, res, next) => {

});


exports.render_add_form = asyncHandler(async (req, res, next) => {
    const page = "new-item"
    categoryData = await Category.find({}).exec();
    res.render('layout', { title: 'New Item', page: page, categories: categoryData });
});


exports.render_edit_form = asyncHandler(async (req, res, next) => {
    const IDToEdit = req.body.categoryID;
    const page = "edit-item"
    categoryData = await Category.find({}).exec();
    res.render('layout', { title: 'Edit Item', page: page, categories: categoryData, IDToEdit: IDToEdit });
});

