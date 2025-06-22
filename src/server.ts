import mongoose from 'mongoose';
import app from './app';
require("dotenv").config();

let server;
const PORT = 5000;


async function main() {
    try {
        // connect server to mongoose using mongoDB
        await mongoose.connect(`mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.8yejb.mongodb.net/libraryManagementDB?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Connected to MongoDB Using Mongoose!!");
        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (error) {
        return {message : error}
    }
}

main()