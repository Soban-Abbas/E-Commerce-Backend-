const paymentModel=require("../models/payment.model")
exports.payCod = async(placeOrderId, placeOrder_total_amount, payment_status, payment_method, transactionId,client)=>{
    try {
    const payment=  await paymentModel.pay(placeOrderId,placeOrder_total_amount,payment_status,payment_method,transactionId,client) 
    return payment
        
    } catch (error) {
        throw error
    }
}