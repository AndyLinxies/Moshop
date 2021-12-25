<template>
  <div>
    <div v-if="alertSuccessShow" class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mb-10">
        <div class="flex items-center justify-center w-12  bg-green-500">
            <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-green-900"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        </div>
        
        <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
                <span class="font-semibold text-emerald-500 dark:text-emerald-400">Success</span>
                <p class="text-sm text-gray-600 dark:text-gray-200">Le panier a été Bien validé</p>
            </div>
        </div>
    </div>
        
    <p class="text-2xl font-semibold mb-10">Votre Panier</p>
    <!-- Passer commande -->
    <div>
      
    </div>
    <div
      class="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1"
      v-if="cartProductArr"
    >
      <div
        v-for="(item, i) in cartProductArr"
        :key="i"
        class="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 mb-10"
      >
        <!-- <div class="flex justify-between text-xs">
            <p>{{item.created_at}}</p>
            <p>{{item.updated_at}}</p>
        </div> -->
        <div class="px-4 py-2">
          <h1
            class="text-2xl font-bold text-gray-800 uppercase dark:text-white"
          >
            {{ item.product.name }}
          </h1>
          <p
            v-if="item.product.description"
            class="mt-1 text-sm text-gray-600 dark:text-gray-400"
          >
            {{ item.product.description.substring(0, 80) + "..." }}
          </p>
        </div>
        <img
          width="300px"
          class="object-cover w-full h-48"
          :src="`https://api-moshop.molengeek.pro${item.product.cover_path}`"
          alt="product"
        />

        <div class="flex items-center justify-between px-4 py-2 bg-green-900">
          <h1 class="text-lg font-bold text-white">
            ${{ item.product.price }}
          </h1>

          <!-- Delete product for cart-->
          <!-- Pas de requete suppression du panier au niveau du serveur -->
          
        </div>
      </div>
    </div>
    <!-- Valider la commade -->
    <div  class="w-full flex justify-end mb-10 pr-28">
      <button @click="commandPostReq"
        class="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-green-900"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="mx-1">Valider la Commade</span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Panier",
  data() {
    return {
      cartProductArr: [],
      alertSuccessShow:false
    };
  },

  mounted() {
    this.getCartProducts();
  },
  methods: {
    getCartProducts() {
      axios
        .get("https://api-moshop.molengeek.pro/api/v1/cart", {
          headers: {
            Authorization: "Bearer " + this.connectionToken,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          this.cartProductArr = response.data.data;
        });
    },

    //delete product from cart
    deleteProductFromCart(id) {
      console.log("Product id in cart", id);
      //Pas de requete au niveau du serveur pour supprimer du panier
      // axios
      // .delete(`https://api-moshop.molengeek.pro/api/v1/cart/${id}`, {
      //   headers: {
      //     Authorization: "Bearer " + localStorage.getItem("token"),
      //   },
      // })
      // .then((response) => {
      //   console.log("elément retiré du panier " + response.data);
      // })
      // .catch((error) => {
      //   console.log(error.response);
      // });
    },
    commandPostReq() {
      console.log("post req");
      //Toujours envoyer qqch dans une requete post, si rien mettre un objet vide
      axios
      .post(`https://api-moshop.molengeek.pro/api/v1/buy`,{}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log( response.data);
        this.alertSuccessShow=true
      })
      .catch((error) => {
        console.log(error.response);
      });
    },
  },
  computed: {
    ...mapState(["connectionToken"]),
  },
};
</script>

<style></style>
