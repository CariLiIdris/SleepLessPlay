import { model, Schema } from 'mongoose'

export const GameSchema = new Schema({
  name: {
    type: String,
    requied: [true, 'A game needs a name'],
    trim: true
  },
  url: {
    type: String,
    requied: [true, 'Please provide a URL for your game'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please give your game a description!'],
    trim: true,
  },
  dev: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A game must have a dev']
  }
}, { timestamps: true });

const Game = model('Game', GameSchema);
export default Game