const {pool}=require('../config/pool');
const users =require('../migration/001_create_users');
const categories=require("../migration/002_create_categories");
const products=require("../migration/003_create_products");
const product_categories=require("../migration/004_create_product_categories");
const inventory=require('../migration/005_create_inventory');
const wishlists=require("../migration/006_create_wishlists");
const carts=require("../migration/007_create_carts");
const cart_items=require('../migration/008_create_cart_items')
const coupons=require('../migration/009_create_coupons')
const orders=require("../migration/010_create_orders");
const order_items=require('../migration/011_create_order_items')
const reviews=require('../migration/012_create_reviews');
const payments=require("../migration/013_create_payments")

async function createMigration(pool){
    try {
        console.log("helo")
        await pool.query(`create table if not exists migration (
             id serial primary key,
            name character varying(200) unique   not null ,
            executed_at timestamp default current_timestamp
            )
           `)
    } catch (error) {
        console.log(error)
    }
}
createMigration(pool)

const migrations=[{
    name:'001_create_users',
    migration:users
},
    {
        name: '002_create_categories',
        migration: categories
    },
    {
        name: '003_create_porducts',
        migration: products
    },
    {
        name: '004_create_product_categories',
         migration: product_categories
    },
    {
        name: '005_create_inventory',
        migration: inventory
    },
    {
        name: '006_create_wishlists',
        migration: wishlists
    },
    {
        name: '007_create_carts',
        migration: carts
    },
    {
        name: '008_create_cart_items',
        migration: cart_items
    },
    {
        name: '009_create_coupons',
        migration: coupons
    },
    {
        name: '0010_create_order',
        migration: orders

    },
    {
        name: '0011_create_order_items',
        migration: order_items
    },
    {
        name: '0012_create_reviews',
        migration: reviews
    },
    {
        name: '0013_create_payments',
        migration: payments
    },

]



async function runQueries(pool){
    const client = await pool.connect()
try {
    await pool.query('begin');

    const results= await client.query('select name from migration');

    const nameOfRunQueries=new Set(results.rows.map(r=>r.name))


    for (const item of migrations) {
        if(nameOfRunQueries.has(item.name)){
            continue
        }
        await item.migration.up(client)

        await client.query('insert into migration (name) values ($1) returning *',[item.name])
    }


    console.log("database is ready ")
    await client.query('commit')


} catch (error) {
    client.query('rollback')
    console.log(error)
}finally{
    client.release()
}
}


runQueries(pool);