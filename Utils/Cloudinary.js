const cloudinary = require("cloudinary");
require("dotenv").config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

const uploadCloud = async (buffer) => {
    try {
        const result = await new Promise((resolve) => {
            cloudinary.v2.uploader
                .upload_stream({
                    folder:"wlug_MB2",
                    resource_type:"auto"
                },(error, uploadResult) => {
                    if(error){
                        console.log(error);
                        console.log("error in cloudinary upload")
                    }
                    return resolve(uploadResult);
                })
                .end(buffer);
        });
        console.log(result)
        return { success: true, link: result.secure_url };
    } catch (error) {
        console.log("error in cloudinary upload")
        console.log(error);
        return { success: false, link: "" };
    }
};



module.exports = uploadCloud;
