<template>
  <div>
    <p class="text-2xl font-semibold mb-10">Votre Panier</p>
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

            <div
              class="flex items-center justify-between px-4 py-2 bg-green-900"
            >
              <h1 class="text-lg font-bold text-white">${{ item.product.price }}</h1>
              
              <!-- Delete product for cart-->
              <button @click="deleteProductFromCart(item.product.id)"  >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-500 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState} from 'vuex'

export default {
  name: "Panier",
  data() {
      return {
          cartProductArr:[]
      }
  },

mounted() {
    this.getCartProducts()
},
  methods: {
    getCartProducts() {
      axios
        .get("https://api-moshop.molengeek.pro/api/v1/cart",{
            headers: {
              Authorization: "Bearer " + this.connectionToken,
            },
          })
        .then((response) => {
          console.log(response.data.data);
          this.cartProductArr=response.data.data
        });
    },

    //delete product from cart
    deleteProductFromCart(id){
        console.log("Product id in cart",id);
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
    }
  },
  computed: {
      ...mapState(["connectionToken"])
  },
};
</script>

<style></style>
