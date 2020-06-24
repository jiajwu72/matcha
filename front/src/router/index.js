//import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/common/Home'
// import Header from '@/components/commun/Header'
// import Product from '@/views/customer/Product'
// import ListProducts from '@/views/customer/ListProducts'
// import Profile from '@/views/pro/Profile'
// import Orders from '@/views/pro/Orders'

// const user={
//   _id:"sdjkhf",
//   addressId:"_jhbfbqs",
//   loyaltyPoint:10,
//   email:"sqkhd@gmail.com",
//   firstName:"lulu",
//   lastName:"wang",
//   phoneNumber:"0767118278"
// }
//
// const address=[
//   {
//     postalCode:77100,
//     address:"12 rue de champs",
//     city:"Meaux"
//   },
//   {
//     postalCode:60330,
//     address:"14 rue de champagne",
//     city:"le plessis belleville"
//   }
// ]

export default new Router({
  routes:[
    {
      path:'/',
      name:'Home',
      component:Home,
    },
    // {
    //   path:'/user',
    //   name:'User',
    //   component:User,
    // },

  ],
  mode:'history',
})
