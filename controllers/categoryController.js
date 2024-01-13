const Item = require("../models/item");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

let categoryData = []
let itemData = []

exports.render_categories = asyncHandler(async (req, res, next) => {
    categoryData = await Category.find({}).exec();
    itemData = await Item.find({}).exec();
    const page = "categories"
    res.render('layout', { title: 'Categories', categories: categoryData, items: itemData, page: page});
});

exports.render_items = asyncHandler(async (req, res, next) => {
    itemData = await Item.find({}).exec();
    const categoryID = req.params.objectId;
    const currentCategory = await Category.findById(categoryID).exec();
    const page = "items"
    res.render('layout', { title: 'Items', currentCategory: currentCategory, items: itemData, page: page});
});

exports.render_new_category = asyncHandler(async (req, res, next) => {
    const page = "new-category"
    res.render('layout', { title: 'New Category', page: page});
});

exports.render_new_item = asyncHandler(async (req, res, next) => {
    const page = "new-item"
    categoryData = await Category.find({}).exec();
    res.render('layout', { title: 'New Item', page: page, categories: categoryData});
});

exports.add_category = asyncHandler(async (req, res, next) => {
    const name = req.body.categoryName;
    const description = req.body.categoryDescription;
    const URL = req.body.categoryURL;
    await Category.create({ name: name, description: description, URL: URL });
    res.redirect("/categories");
});
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