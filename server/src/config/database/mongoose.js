import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

(async () => {
    let uri = process.env.MONGO_URI;

    const isMemoryDatabase = process.env.MONGO_MEMORY || false;
    if (isMemoryDatabase) {
        const instance = await MongoMemoryServer.create();
        uri = instance.getUri();
    }

    uri += process.env.MONGO_DATABASE;
    
    await mongoose.connect(uri);
})();
