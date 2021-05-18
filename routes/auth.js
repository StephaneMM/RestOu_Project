const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const RestaurantModel = require("./../models/Restaurant");
const ReviewModel = require("./../models/Review");
const UserModel = require("./../models/User");

router.get("/signin", (req, res, next) => {
    res.render("auth/signin.hbs");
});

router.get("signup", (req, res, next) => {
    res.render("auth/signup.hbs");
});

router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    const foundUser = await UserModel.findOne({ email: email});
    console.log(foundUser);
    if(!foundUser) {
        req.flash("error", "Invalid credentials");
        res.redirect("/auth/sigin");
    } else {
        const isSamePassword = bcrypt.compareSync(password, foundUser.password);
        console.log(isSamePassword);
        if(!isSamePassword) {
            req.flash("error", "Invalid credentials");
            res.redirect("/auth/signin");
        } else {
            const userObject = foundUser.toObject();
            delete userObject.password;
            req.session.currentUser = userObject;
            req.flash("success", "Successfully logged in ....");
            res.redirect("/");
        }
    }

});

router.post("/signup", async (req, res, next) => {
    try {
      console.log(req.body);
      const newUser = { ...req.body };
      const foundUser = await UsersModel.findOne({ email: newUser.email });
      if (foundUser) {
        req.flash("warning", "Email already registered");
        res.redirect("/auth/signup");
      } else {
        const hashedPassword = bcrypt.hashSync(newUser.password, 10); //
        // console.log(newUser.password, hashedPassword);
        newUser.password = hashedPassword; //setting hashedpassword as the new password
        await UsersModel.create(newUser); // creating a user inside de user database with encrypted password instead of the regular one
        req.flash("success", "Congrats ! You are now registered !");
        res.redirect("/");
      }
    } catch (err) {
      let errorMessage = "";
      for (field in err.errors) {
        console.log(field);
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