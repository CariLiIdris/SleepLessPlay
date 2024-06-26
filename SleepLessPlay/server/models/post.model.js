import { model, Schema } from "mongoose";

const PostSchema = new Schema({
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'A post must have an author']
        },
        username: {
            type: String,
            required: [true, 'Author username is required']
        }
    },
    lounge: {
        type: Schema.Types.ObjectId,
        ref: 'Lounge',
        required: [true, 'A post must belong to a lounge!']
    },
    content: {
        type: String,
        required: [true, 'A post must have content!'],
        minLength: [1, 'A post must be 1 or more characters!']
    }
}, { timestamps: true })

const Post = model('Post', PostSchema);
export default Post;