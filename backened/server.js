import app from "./app.js"
import cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // we have setup a cloudinary in server.js by giving all details
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})

app.listen(process.env.PORT, () =>{
    console.log(`Server listening on port ${process.env.PORT}`); // THIS WAS USE TO CHECK WHETHER THE PATH GIVEN IN APP.JS OF CONFIG IS CORRECT OR NOT AND IT IS IN WORKING 
});