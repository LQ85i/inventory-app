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
        category: category,
        owner: req.user._id,
        expiresAfter: new Date()
    });
    res.redirect("/categories");
});

exports.render_item = asyncHandler(async (req, res, next) => {
    const page = "items"
    res.render('layout', { title: 'Items', currentCategory: currentCategory, items: itemData, page: page });
});


exports.update_item = asyncHandler(async (req, res, next) => {
    const itemID = req.body.itemID;
    const newName = req.body.itemName;
    const newDescription = req.body.itemDescription;
    const newPrice = req.body.itemPrice;
    const newStock = req.body.itemStock;
    const newURL = req.body.itemURL;
    const newCategory = req.body.itemCategory;
    await Item.findOneAndUpdate({owner: req.user._id, _id: itemID, }, {
        $set: {
            name: newName,
            description: newDescription,
            price: newPrice,
            stock: newStock,
            URL: newURL,
            category: newCategory,
            owner: req.user._id,
            expiresAfter: new Date()
        }
    });
    res.redirect("/categories");
});


exports.delete_item = asyncHandler(async (req, res, next) => {
    const itemID = req.body.itemID;
    await Item.deleteOne({owner: req.user._id, _id: itemID });
    res.redirect("/categories");
});


exports.render_add_form = asyncHandler(async (req, res, next) => {
    const page = "new-item"
    categoryData = await Category.find({owner: req.user._id}).exec();
    res.render('layout', { title: 'New Item', page: page, categories: categoryData });
});


exports.render_edit_form = asyncHandler(async (req, res, next) => {
    const IDToEdit = req.body.itemID;
    const page = "edit-item"
    const item = await Item.findOne({ _id: IDToEdit })
    const category = await Category.findOne({ owner: req.user._id, _id: item.category });
    categoryData = await Category.find({owner: req.user._id}).exec();
    res.render('layout', { title: 'Edit Item', page: page, categories: categoryData, IDToEdit: IDToEdit, item: item, category: category });
});

