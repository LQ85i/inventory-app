const Item = require("../models/item");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

let categoryData = []
let itemData = []


exports.add_category = asyncHandler(async (req, res, next) => {
    const name = req.body.categoryName;
    const description = req.body.categoryDescription;
    const URL = req.body.categoryURL;
    await Category.create({
        name: name,
        description: description,
        URL: URL,
        expiresAfter: new Date()
    });
    res.redirect("/categories");
});

exports.render_categories = asyncHandler(async (req, res, next) => {
    categoryData = await Category.find({}).exec();
    itemData = await Item.find({}).exec();
    const page = "categories"
    res.render('layout', { title: 'Categories', categories: categoryData, items: itemData, page: page});
});

exports.update_category = asyncHandler(async (req, res, next) => {
    const categoryID = req.body.categoryID;
    const newName = req.body.categoryName;
    const newDescription = req.body.categoryDescription;
    const newURL = req.body.categoryURL;
    await Category.findOneAndUpdate({ _id: categoryID, }, {
        $set: {
            name: newName,
            description: newDescription,
            URL: newURL,
            expiresAfter: new Date()
        }
    });
    res.redirect("/categories");
});

exports.delete_category = asyncHandler(async (req, res, next) => {
    const categoryID = req.body.categoryID;
    await Category.deleteOne({ _id: categoryID });
    res.redirect("/categories");
});

exports.render_add_form = asyncHandler(async (req, res, next) => {
    const page = "new-category"
    res.render('layout', { title: 'New Category', page: page });
});


exports.render_edit_form = asyncHandler(async (req, res, next) => {
    const categoryID = req.body.categoryID;
    const page = "edit-category"
    const category = await Category.findById(categoryID).exec();
    res.render('layout', { title: 'Edit Category', category: category, page: page, categoryID: categoryID });
});

exports.render_items = asyncHandler(async (req, res, next) => {
    itemData = await Item.find({}).exec();
    const categoryID = req.params.objectId;
    const currentCategory = await Category.findById(categoryID).exec();
    const page = "items"
    res.render('layout', { title: 'Items', currentCategory: currentCategory, items: itemData, page: page });
});