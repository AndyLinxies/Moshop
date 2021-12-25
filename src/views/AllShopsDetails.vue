<template>
  <div>
      <!-- Err mess -->
       <div v-if="shoWErrMessage" >
      <div
      class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex items-center justify-center w-12 bg-red-500">
            <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"/>
            </svg>
        </div>
        
        <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
                <span class="font-semibold text-red-500 dark:text-red-400">Error</span>
                <p class="text-sm text-gray-600 dark:text-gray-200 text-center">Veuillez Selectioner la quantité</p>
            </div>
        </div>
      </div>
    </div>
      <!-- Err mess -->
      <p class="text-2xl font-semibold">
          {{ShopName}}
      </p>
       <div
      class="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-5"
      v-if="ShopProducts"
    >
      <div
        v-for="(item, i) in ShopProducts"
        :key="i"
        class="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 mb-10"
      >
        <div class="px-4 py-2">
          <h1
            class="text-2xl font-bold text-gray-800 uppercase dark:text-white"
          >
            {{ item.name }}
          </h1>
          <p
            v-if="item.description"
            class="mt-1 text-sm text-gray-600 dark:text-gray-400"
          >
            {{ item.description.substring(0, 80) + "..." }}
          </p>
        </div>
        <img
          width="300px"
          class="object-cover w-full h-48"
          :src="`https://api-moshop.molengeek.pro${item.cover_path}`"
          alt="product"
        />

        <div class="flex items-center justify-between px-4 py-2 bg-green-900">
          <h1 class="text-lg font-bold text-white">
            ${{ item.price }}
          </h1>

        <button
          @click="addToCart(item.id)"
            class="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-200 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
          >
            Add to cart
          </button>
          <input v-model="cartInfo.quantity" min="1" class="rounded-xl w-8" type="number">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapFields } from "vuex-map-fields";

export default {
  name: "AllShopsDetails",
  data() {
      return {
          ShopName:"",
          ShopProducts:[],
            shoWErrMessage:false

      }
  },
  props: {
    id: {
      type: Number && String,
      required: true,
    },
  },
  mounted() {
      this.getShopDetails();
  },
  methods: {
      getShopDetails(){
           axios
        .get(
          `https://api-moshop.molengeek.pro/api/v1/shop/${this.id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data.data); 
          this.ShopName= response.data.data.name       
          this.ShopProducts= response.data.data.products      
        })
        .catch((error) => {
          console.log(error.response);
        });
      },
      addToCart(otherProdID){
            //Si on selectionne la quantité la requette se fait, sinon message d'alerte erreur
            if (this.cartInfo.quantity) {
                //On recupere l'id de l'item sur lequel on a cliqué
                console.log(otherProdID,this.cartInfo);
                this.cartInfo.product=otherProdID
                //On lance la fonction du action
                this.$store.dispatch("addToCartRequest");
                this.shoWErrMessage=false
                
            }else{
                this.shoWErrMessage=true
            }
      }
  },
  computed: {
        ...mapFields(["cartInfo"]),

      }
      
};
</script>

<style></style>
