<template>
  <div>
    <div>
      <p class="text-2xl font-semibold">{{ shopPersoName }}</p>
      <!-- Modal ajout produit -->
      <ProductModal />
      <!-- Show the products -->
      <div>
        <div
          class="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1"
          v-if="personalShopProducts"
        >
          <div
            v-for="(item, i) in personalShopProducts"
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
                {{ item.name }}
              </h1>
              <p
                v-if="item.description"
                class="mt-1 text-sm text-gray-600 dark:text-gray-400"
              >
                {{ item.description }}
              </p>
            </div>
            <img
              width="300px"
              class="object-cover w-full h-48"
              :src="`https://api-moshop.molengeek.pro${item.cover_path}`"
              alt="product"
            />

            <div
              class="flex items-center justify-between px-4 py-2 bg-gray-900"
            >
              <h1 class="text-lg font-bold text-white">${{ item.price }}</h1>
              
              <!-- Delete product -->
              <button @click="deleteProduct(item.id)">
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
              <!-- Edit product Open edit modal-->
              <button @click="toggleEditModal(item.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
          </div>
            <EditModal :toggleEditModal="toggleEditModal" :showEditModal="showEditModal"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductModal from "../components/ModalAddPersonalProducts.vue";
// import { mapMutations } from "vuex";
import EditModal from '../components/ModalEditProduct.vue'

export default {
  name: "PersonalShop",
  components: {
    ProductModal, EditModal
  },
  data() {
    return {
        showEditModal: false,
      shopPersoName: "",
      personalShopProducts: "",
    };
  },
  methods: {
    //   ...mapMutations(['toggleEditModal']),
    toggleEditModal(value){
        //Envoie du prodID au state quand on clique sur le bouton Edit
        console.log("product ID: ",value);
        this.$store.commit("updateProdID", value);

      this.showEditModal = !this.showEditModal;
    },
    //Monter les produits
    personalShop() {
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
          this.shopPersoName = response.data.data.name;
          this.personalShopProducts = response.data.data.products;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    //Supprimer le produit
    deleteProduct(id) {
      console.log("id du Produit", id);
      axios
        .delete(`https://api-moshop.molengeek.pro/api/v1/product/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("elément supprimé " + response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  mounted() {
    this.personalShop();
  },
};
</script>

<style></style>
