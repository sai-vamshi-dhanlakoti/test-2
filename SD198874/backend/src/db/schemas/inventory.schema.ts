import { Schema, model } from 'mongoose';

const InventorySchema = new Schema({
    name: String,
    quantity: Number,
    image: String
}, {
    timestamps: true
});
export default model('inventories', InventorySchema);


