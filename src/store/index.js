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
    orderItems:[],
    //pershop
    showEditModal: false,
    shopPersoName: "",
    personalShopProducts: "",
    cartProductArr: [],

    //user infos
    infos:"",

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
    },

    //persShop
    updatePersShop(state,items){
      state.shopPersoName = items.name;
      state.personalShopProducts = items.products;
    },


  },
  actions: {
    //User Infos
    userInfos({commit,state}) {
      axios
        .get("https://api-moshop.molengeek.pro/api/v1/user", {
          headers: {
            "Authorization": "Bearer " + state.connectionToken,
          },
        })
        .then((response) => {
        //   console.log(response.data.data.profile.picture_path);
        console.log(response.data.data.profile.id)
        localStorage.setItem('userID',response.data.data.profile.id)
          commit("updateUserInfo",state.infos)
          state.infos=response.data.data.profile;
        // localStorage.setItem('picture_path',response.data.data.profile.picture_path)

      // localStorage.remove('nom')

        });
    },

    //Panier
    getCartProducts({state}) {
      axios
        .get("https://api-moshop.molengeek.pro/api/v1/cart", {
          headers: {
            Authorization: "Bearer " + state.connectionToken,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          state.cartProductArr = response.data.data;
        });
    },

    //Add a product to personal shop
    personalShop({commit}) {
      axios
        .get("https://api-moshop.molengeek.pro/api/v1/shop", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          console.log(response.data.data.name);
          console.log(response.data.data.products[0].cover_path);
          // this.shopPersoName = response.data.data.name;
          // this.personalShopProducts = response.data.data.products;
          commit("updatePersShop", response.data.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

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
