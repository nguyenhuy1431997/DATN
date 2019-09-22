import * as types from './../component/constants/actiontypes';
// var randomstring = require("randomstring");
var initialState=[
    // {
    //     id:1,
    //     name:'Iphone 6 plus',
    //     image:'https://shopdunk.com/wp-content/uploads/2016/11/iphone-6s-plus-vang-1.png',
    //     description:'Sản phẩm do apple sản xuất',
    //     price:500,
    //     inventory:10
    // },
    // {
    //     id:2,
    //     name:'Samsung galaxy s7',
    //     image:'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTSGZ47cV2a0Ce4NaXhuiae-VutnOyMrygLgDw1QIJoI1qSD07Tg3oEhE0oQd61i14xIIBP4BieOe8VZtx839bknpTlE440vgH0-G-RQYsAQDEIK8Z3kSSClg&usqp=CAc',
    //     description:'Sản phẩm do samsung sản xuất',
    //     price:400,
    //     inventory:10
    // },
    // {
    //     id:3,
    //     name:'Oppo F1s',
    //     image:'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcShXYJSK096mC0xEqxQAlzOqJoBFZLqTkUXDQ9jy-fE1Yyi5B6ud6H6PuACTJVzmzmGPW5xIulMZaU3by6salnhPac_5fHbZOOxKILGR-RIh1ip-yKmYWToWA&usqp=CAc',
    //     description:'Sản phẩm do China sản xuất',
    //     price:350,
    //     inventory:10
    // },
    // {
    //     id:4,
    //     name:'Vivo Y91',
    //     image:'https://cdn.tgdd.vn/Products/Images/42/196142/vivo-y91-400x460.png',
    //     description:'Sản phẩm do China sản xuất',
    //     price:300,
    //     inventory:10
    // },
    // {
    //     id:5,
    //     name:'Xiaomi A2 lite',
    //     image:'https://www.mobiledokan.co/wp-content/uploads/2018/10/xiaomi-mi-a2-lite-redmi-6-pro.jpg',
    //     description:'Sản phẩm do China sản xuất',
    //     price:250,
    //     inventory:10
    // },
    // {
    //     id:6,
    //     name:'Asus zenfone 5',
    //     image:'https://images-na.ssl-images-amazon.com/images/I/61bdGte6x3L._SX425_.jpg',
    //     description:'Sản phẩm do China sản xuất',
    //     price:350,
    //     inventory:10
    // }
];

const Products=(state=initialState,action)=>{
    switch(action.type){
        case types.STATE_PRODUCT:
            state=action.value;
            return [...state];
        default: return [...state];
    }
}

export default Products;