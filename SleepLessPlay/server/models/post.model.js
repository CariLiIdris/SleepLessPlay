import { model, Schema } from "mongoose";

const PostSchema = new Schema({
    lounge: {
        type: Schema.Types.ObjectId,
        ref: 'Lounge',
        required: [true, 'A post must belong to a lounge!']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A post must have an author']
    },
    content: {
        type: String,
        required: [true, 'A post must have content'],
        minLength: [1, 'A post must be 1 or more characters']
    }
}, { timestamps: true })

const Post = model('Post', PostSchema);
export default Post;