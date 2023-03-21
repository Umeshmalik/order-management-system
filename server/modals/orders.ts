import { Schema, model, PaginateModel, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface IOrder extends Document {
    orderId: string,
    vendorName: string,
    pickUpDate: Date,
    status: "shipped" | "cancelled" | "pending"
}

const OrderSchema = new Schema({
    orderId: {
        type: String,
        null: false
    },
    vendorName: {
        type: String,
        null: false
    },
    pickUpDate: {
        type: Date,
        null: false
    },
    status: {
        type: String,
        enum: ["shipped", "cancelled", "pending"],
        null: false
    }
},{
    timestamps: true
})

OrderSchema.index({ orderId: 1, vendorName: 1, pickUpDate: 1, status: 1 });
OrderSchema.plugin(paginate);

export default model<IOrder, PaginateModel<IOrder>>('orders', OrderSchema);