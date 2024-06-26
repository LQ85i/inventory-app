const Item = require("../models/item");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

let categoryData = []
let itemData = []

const authError = (next) => {
  const customError = new Error("You must be signed in to view this page");
  customError.code = "401"
  return () => next(customError);
}

exports.add_category = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    authError(next)();
  } else {
    const name = req.body.categoryName;
    const description = req.body.categoryDescription;
    const URL = req.body.categoryURL;
    await Category.create({
      name: name,
      description: description,
      URL: URL,
      owner: req.user._id,
      expiresAfter: new Date()
    });
    res.redirect("/categories");
  }
});

exports.render_categories = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    authError(next)();
  } else {
    try {
      categoryData = await Category.find({ owner: req.user._id }).exec();
      itemData = await Item.find({ owner: req.user._id }).exec();
      const page = "categories"
      res.render('layout', { title: 'Categories', categories: categoryData, items: itemData, page: page });
    } catch (err) {
      return next(err);
    }
  }
});

exports.update_category = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    authError(next)();
  } else {
    const categoryID = req.body.categoryID;
    const newName = req.body.categoryName;
    const newDescription = req.body.categoryDescription;
    const newURL = req.body.categoryURL;
    await Category.findOneAndUpdate({ _id: categoryID, }, {
      $set: {
        name: newName,
        description: newDescription,
        URL: newURL,
        owner: req.user._id,
        expiresAfter: new Date()
      }
    });
    res.redirect("/categories");
  }
});

exports.delete_category = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    authError(next)();
  } else {
    const categoryID = req.body.categoryID;
    await Category.deleteOne({ _id: categoryID });
    res.redirect("/categories");
  }
});

exports.render_add_form = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    authError(next)();
  } else {
    const page = "new-category"
    res.render('layout', { title: 'New Category', page: page });
  }
});


exports.render_edit_form = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    authError(next)();
  } else {
    const categoryID = req.body.categoryID;
    const page = "edit-category"
    const category = await Category.findOne({ _id: categoryID }).exec();
    res.render('layout', { title: 'Edit Category', category: category, page: page, categoryID: categoryID });
  }
});

exports.render_items = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    authError(next)();
  } else {
    itemData = await Item.find({ owner: req.user._id }).exec();
    const categoryID = req.params.objectId;
    const currentCategory = await Category.findOne({ _id: categoryID }).exec();
    const page = "items"
    res.render('layout', { title: 'Items', currentCategory: currentCategory, items: itemData, page: page });
  }
});