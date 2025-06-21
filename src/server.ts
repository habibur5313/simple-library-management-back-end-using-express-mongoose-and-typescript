import mongoose from 'mongoose';
import app from './app';
require("dotenv").config();

let server;
const PORT = 5000;


async function main() {
    try {
        // connect server to mongoose using mongoDB
        await mongoose.connect(`${process.env.DB_mongodbURI}`);
        console.log("Connected to MongoDB Using Mongoose!!");
        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main()