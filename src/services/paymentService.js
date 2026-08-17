const { pool } = require("../config/pool");
const paymentModel = require("../models/payment.model");
const inventoryService=require("./inventoryService")
const { generateTransactionId } = require("../util/generateTransactionId");
const orderService = require("../services/orderService");
const cartService = require("../services/cartService");
const orderModel = require("../models/orders.model");
const customerService = require("./CustomerService")
const couponService = require("./couponService");

exports.payCod = async (placeOrderId, placeOrder_total_amount, payment_status, payment_method, transactionId, client) => {
    try {
        const payment = await paymentModel.pay(placeOrderId, placeOrder_total_amount, payment_status, payment_method, transactionId, client)
        return payment

    } catch (error) {
        throw error
    }
}


exports.payOnline = async (userId, orderId, paymentMethod) => {
    const client = await pool.connect();
    try {
        await client.query('begin')
        const number = ((Math.random() * 100).toFixed(2))
        if (number < 25) {
            const error = new Error("Service unavaiable");
            error.status = 503;
            throw error
        }

        const payment_status = "success";
        const payment_method = paymentMethod;

        const TransactionId = generateTransactionId();

        const getOrderDetails = await orderService.getOrderDetails(orderId);

        const pay = await paymentModel.pay(orderId, getOrderDetails.total_amount, payment_status, paymentMethod, TransactionId, client);

    
        const cartItems = await cartService.getCartItems(userId)



        


        const sellingProducts = cartItems.filter(item => {
            if (item.inStock) {
                return {
                    ...item
                }
            }
        })

        const sellingInfo = sellingProducts.map(p => {
            return {
                id: p.id,
                name: p.name,
quantity:p.quantity
            }
        })


        const clearCart = await cartService.clearCart(userId, sellingProducts, client)
        console.log("hello")
        if(getOrderDetails.coupon_id!==null){
            const increaseCouponCount = await couponService.IncreaseCouponUse(getOrderDetails.coupon_id, client);
        }
        
        const orderStatus = 'paid'
        console.log("hello")
        const updateOrderStatus = await orderModel.updateOrderStatus(userId, orderStatus, client);



        const customer = await customerService.getUserById(userId);

        await inventoryService.updateProductsQuantity(sellingInfo,client);
        await client.query('commit');

        return {
            name: customer.name,
            products:sellingInfo,
            orderStatus: updateOrderStatus,
            amount: getOrderDetails.total_amount,
            address: getOrderDetails.shipping_address,
            phone_number: getOrderDetails.phone_number,
            OrderPlace: getOrderDetails.created_at,
            paymentStatus: pay.payment_status,
            paymentMethod: pay.payment_method

        }
    } catch (error) {
        await client.query('rollback')
        throw error
    } finally {
        await client.release()
    }
}