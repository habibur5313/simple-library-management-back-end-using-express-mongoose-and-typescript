import mongoose from 'mongoose';
import app from './app';

let server;

const PORT = 5000;

async function main() {
    try {
        // connect server to mongoose using mongoDB
        await mongoose.connect('mongodb+srv://libraryManagement:libraryManagement@cluster0.8yejb.mongodb.net/libraryManagementDB?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected to MongoDB Using Mongoose!!");
        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main()