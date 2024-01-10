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
    const categoryId = req.params.objectId;
    const currentCategory = await Category.findById(categoryId).exec();
    const page = "items"
    res.render('layout', { title: 'Items', currentCategory: currentCategory, items: itemData, page: page});
});
