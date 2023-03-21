import { Request, Response} from "express";
import { v4 as uuidv4 } from 'uuid';

import Order, { IOrder } from "../../modals/orders";

const createOrder = async (req: Request, res: Response) => {
    try {
        const {vendorName, pickUpDate} = req.body;
        const orderId = uuidv4().split("-").slice(0, 3).join("-");
        return await Order.create({
            orderId,
            vendorName,
            pickUpDate,
            status: "pending"
        }).then((order: IOrder) => {
            return res.status(201).json({
                message: "Order Created",
                orderId: order.orderId
            })
        }).catch((err: Error) => {
            throw err;
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

const list = async (req: Request, res: Response) => {
    try {
        const { page = 0, limit = 10, sort = 'createdAt', key = "", value = "" } = req.query;
        let filter = key ? { [key as string]: {
            "$regex": value
        } } : {}
        
        const options = {
            page: parseInt(page as string) || 1,
            limit: parseInt(limit as string) || 10,
            sort,
            select: "orderId vendorName pickUpDate status -_id"
        };

        await Order.paginate(filter, options, (err, data) => {
            if(err) { res.status(500).json(err); return; };
            res.status(200).json(data);
        })
    } catch (error) {
        return res.status(500).json(error);
    }
} 

export default {
    createOrder,
    list
}