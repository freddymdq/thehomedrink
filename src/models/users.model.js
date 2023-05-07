import mongoose from "mongoose";

const collectionUsers = 'Users'

const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    dni: {
        type: Number,
        require: true
    }
    
})

const usersModel = mongoose.model(collectionUsers, schema)
export default usersModel