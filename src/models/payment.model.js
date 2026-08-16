exports.pay = async (placeOrderId, placeOrder_total_amount, payment_status, payment_method, transactionId, client) => {
    try {

        const payment = await client.query(`insert into payments (order_id,amount,status,payment_method, transaction_id) values($1,$2,$3,$4,$5) returning * `, [placeOrderId, placeOrder_total_amount, payment_status, payment_method, transactionId]);
        
if(payment.rowCount>0){
    return payment.rows[0]
}
    throw new Error("payment failed")

    } catch (error) {
        if (error.code ==='23505'){
            error.message="Order alredy placed",
            error.status=409;
        }
        console.log(error)
        throw error
    }
}