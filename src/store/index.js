import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields';
import axios from "axios";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items:[],
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    picture:'',
    connectionToken: localStorage.getItem('token'),
    userID: localStorage.getItem('userID'),
    userInfo:{},
    showModal: false,
    showProductModal:false,
    personalProduct:{
    },
    prodID:"",
    cartInfo:{},
    orderID:"",
    showModalCommandDetail:false,
    orderItems:[]
  },
  mutations: {
    updateField,
    getProducts(state,res){
      state.items=res.products
    },

    handleLoginClick(){
    
    console.log('login clicked');
    },

    handleRegisterClick(){
    
    console.log('Register clicked');
    },

    // updateConnectionToken(state){
    //   state.connectionToken=localStorage.getItem('token')
    // },

    updateUserInfo(state,res){
      state.userInfo=res
      console.log(state.userInfo);
      
    },

    //modal
    toggleModal: function(state){
      state.showModal = !state.showModal;
    },

    //log out
    logOut(state){
      console.log("log out clicked");
      state.connectionToken=""
      localStorage.removeItem('token')
      localStorage.removeItem('userID')
    },

    ShowaddProductModal(state){
      state.showProductModal=!state.showProductModal
    },

    updateProdID(state,value){
      state.prodID=value
    },
    
    updateOrderItems(state,detailArr){
      state.orderItems=detailArr;
    }
  },
  actions: {
    //Add item to cart
    addToCartRequest({state} ){
    
      axios
      .post(
        "https://api-moshop.molengeek.pro/api/v1/cart",
        state.cartInfo,
        {headers: {
          "Authorization": "Bearer " + localStorage.getItem('token'),
        }}
      )
      .then((response) => {
        console.log(response);

      })
      .catch((error) => {
        console.log(error.response);
      //   this.errorMessage = error.response.data.error.messages.errors;
      })
    },
    
    //Order details
    getOrderDetail({commit,state}) {
      axios
        .get(`https://api-moshop.molengeek.pro/api/v1/order/${state.orderID}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          // state.orderItems=response.data.data
          commit("updateOrderItems", response.data.data.order_items);

        })
        .catch((error) => {
          console.log(error.response);
        });
    },

  },
  getters: {
    getField,
  }
})
