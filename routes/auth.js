const express = require("express");
const router = new express.Router();
const RestaurantModel = require("./../models/Restaurant");

const ReviewModel = require("./../models/Review");
const UserModel = require("./../models/User");
const bcrypt = require("bcrypt");

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
  console.log("SIGNUP")
    try {
      console.log(req.body);
      const newUser = { ...req.body };
      console.log("newUSER", newUser)
      console.log("newUSEREMAIL", newUser.email)
      const foundUser = await UserModel.findOne({ email: newUser.email });

      console.log("HERE")
      if (foundUser) {
        req.flash("warning", "Email already registered");
        res.redirect("/auth/signup");
        console.log("FOUNDUSER")
      } else {
        console.log("SUCCESS1")
        const hashedPassword = bcrypt.hashSync(newUser.password, 10); //
        console.log("==========")
        console.log(newUser.password, hashedPassword);
        newUser.password = hashedPassword; //setting hashedpassword as the new password
        await UserModel.create(newUser); // creating a user inside de user database with encrypted password instead of the regular one
        req.flash("success", "Congrats ! You are now registered !");
        res.redirect("/");
      }
    } catch (err) {
      console.log("ERROR")
      let errorMessage = "";
      for (field in err.errors) {
        console.log(field);
        errorMessage += err.errors[field].message + "\n";
      }
      console.log("ERRORERRORERROR")
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