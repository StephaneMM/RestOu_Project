const express = require("express");
const router = new express.Router();
const RestaurantModel = require("./../models/Restaurant");

const ReviewModel = require("./../models/Review");
const UserModel = require("./../models/User");
const bcrypt = require("bcryptjs");

router.get("/signin", (req, res, next) => {
  res.render("auth/signin.hbs");
});

router.get("/signup", (req, res, next) => {

    res.render("auth/signup.hbs");
});

router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    const foundUser = await UserModel.findOne({ email: email});
    console.log(foundUser);
    if(!foundUser) {
        req.flash("error", "Invalid credentials");
        res.redirect("/auth/signin");
    } else {
        const isSamePassword = bcrypt.compareSync(password, foundUser.password);

        if(!isSamePassword) {
            req.flash("error", "Invalid credentials");
            res.redirect("/auth/signin");
        } else {
            const userObject = foundUser.toObject();
            delete userObject.password;
            req.session.currentUser = userObject;
            req.flash("success", "Successfully logged in ....");
            res.redirect("/restaurants");
        }
    }

});

router.post("/signup", async (req, res, next) => {

    try {

      const newUser = { ...req.body };

      const foundUser = await UserModel.findOne({ email: newUser.email });


      if (foundUser) {
        req.flash("warning", "Email already registered");
        res.redirect("/auth/signup");

      } else {

        const hashedPassword = bcrypt.hashSync(newUser.password, 10); //

        newUser.password = hashedPassword; //setting hashedpassword as the new password
        await UserModel.create(newUser); // creating a user inside de user database with encrypted password instead of the regular one
        req.flash("success", "Congrats ! You are now registered !");
        res.redirect("/restaurants");
      }
    } catch (err) {

      let errorMessage = "";
      for (field in err.errors) {

        errorMessage += err.errors[field].message + "\n";
      }

      req.flash("error", errorMessage);
      res.redirect("/auth/signup");
    }
  });


router.get("/signout", (req, res, next) => {
    req.session.destroy(function (err) {
        res.redirect("/auth/signin");
    });
});

module.exports = router;