const express = require("express");
const multer = require("multer");
const uploadCloud = require("../Utils/Cloudinary");
const { body, validationResult } = require("express-validator");
const User = require("../Models/User");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
    "/apply",
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "resume", maxCount: 1 },
    ]),
    [
        body("fullName").trim().notEmpty().withMessage("Full name is required"),
        body("branch").trim().notEmpty().withMessage("Branch is required"),
        body("mobileNo")
            .trim()
            .notEmpty()
            .isMobilePhone()
            .isLength({ min: 10, max: 10 })
            .withMessage("Mobile number is required"),
        body("email").trim().isEmail().withMessage("Invalid email address"),
        body("favoriteQuote")
            .trim()
            .notEmpty()
            .withMessage("Favorite quote is required"),
        body("whyJoinClub")
            .trim()
            .notEmpty()
            .withMessage("Reason for joining Club A is required")
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(403).json({ errors: errors });
            }

            const al = await User.find({$or:[
                {email: req.body.email},    
                {mobileNo: req.body.mobileNo}
            ]})

            if(al[0]){
                return res.status(400).json({ error: "Already applied" });
            }

            if (!req.files.photo) {
                return res.status(400).json({ error: "No image provided" });
            }
            if (!req.files.resume) {
                return res.status(400).json({ error: "No resume provided" });
            }


            const imageUpload = await uploadCloud(req.files.photo[0].buffer);

            const resumeUpload = await uploadCloud(req.files.resume[0].buffer);

            const {
                fullName,
                branch,
                mobileNo,
                email,
                favoriteQuote,
                whyJoinClub,
            } = req.body;

            const resume = resumeUpload.link;
            const photo = imageUpload.link;

            const user = new User({
                fullName,
                branch,
                mobileNo,
                email,
                favoriteQuote,
                whyJoinClub,
                resume,
                photo,
            });
            await user.save();
            res.send({
                success: true,
                message: "Application submitted successfully",
            
            });
        } catch (error) {
            console.error("internal server error", error);
            res.status(500).json({
                error: "Ensure that photo and resume file size is less than 1MB",
                success: false,
            });
        }
    }
);

module.exports = router;
