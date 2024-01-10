const Item = require("../models/item");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

let categoryData = []
let itemData = []

exports.render_categories = asyncHandler(async (req, res, next) => {
    categoryData = await Category.find({}).exec();
    itemData = await Item.find({}).exec();
    res.render('layout', { title: 'Categories', categories: categoryData, items: itemData});
});

exports.render_items = asyncHandler(async (req, res, next) => {
    itemData = await Item.find({}).exec();
    const categoryId = req.params.objectId;
    const currentCategory = await Category.findById(categoryId).exec();
    res.render('layout', { title: 'Items', currentCategory: currentCategory, items: itemData});
});
