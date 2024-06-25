import { model, Schema } from "mongoose";

const LoungeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A lounge requires a title!'],
        minLength: [3, "Lounge name must be 3 or more characters!"],
        maxLength: [255, "Lounge name must not exceed 255 characters!"],
        unique: [true, 'That name is already taken']
    },
    description: {
        type: String,
        required: [true, 'Please give your lounge a description!'],
        minLength: [3, 'Description must be greater than 3 characters!']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A lounge must have an owner']
    },
    admins: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }]
}, { timestamps: true })

const Lounge = model('Lounge', LoungeSchema);
export default Lounge