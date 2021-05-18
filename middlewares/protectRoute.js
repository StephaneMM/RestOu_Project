module.exports = function protectRoute(req, res, next) {
    if (req.session.currentUser) next(); // si connecté on continue
    else res.redirect("/auth/signin"); // sinon redirect >> signin page
} 