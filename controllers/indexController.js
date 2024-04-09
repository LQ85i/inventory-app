const asyncHandler = require("express-async-handler");

exports.render_index = asyncHandler(async (req, res, next) => {
    const page = "index"
    res.render('index', { title: 'Inventory Management App', page: page});
});
exports.render_landing = asyncHandler(async (req, res, next) => {
    const page = "sign-in"
    res.render('landing', { title: 'Inventory Management App', page: page});
});

exports.render_create_account = asyncHandler(async (req, res, next) => {
    const page = "create-account"
    res.render('landing', { title: 'Inventory Management App', page: page});
});

exports.sign_in = asyncHandler(async (req, res, next) => {
    res.redirect("/categories");

});

exports.create_account = asyncHandler(async (req, res, next) => {
    res.redirect("/categories");
});
