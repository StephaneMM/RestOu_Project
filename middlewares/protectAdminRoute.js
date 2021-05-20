module.exports = function protectAdminRoute(req, res, next) {
    if (req.session.currentUser && req.session.currentUser.isAdmin === true )
      next(); // si connecté & admin on continue
    else res.redirect("/auth/signin"); // sinon redirect >> signin page
  };