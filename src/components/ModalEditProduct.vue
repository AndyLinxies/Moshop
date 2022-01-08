<template>
  <div>
    <div
      v-if="showEditModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"
          >
            <h3 class="text-3xl font-semibold">Edit Product {{prodID}}</h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              v-on:click="toggleEditModal()"
            >
              <span
                class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
              >
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <form @submit.prevent="editProduct">
              <div>
                <label
                  class="text-gray-700 dark:text-gray-200"
                  for="emailAddress"
                  >Product name</label
                >
                <input
                  v-model="personalProduct.name"
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label
                  class="text-gray-700 dark:text-gray-200"
                  for="emailAddress"
                  >Product description</label
                >
                <input
                  v-model="personalProduct.description"
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label
                  class="text-gray-700 dark:text-gray-200"
                  for="emailAddress"
                  >Product price</label
                >
                <input
                  v-model="personalProduct.price"
                  type="number"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <button
                class="mt-2 border border-solid rounded border-blue-500 text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                v-on:click="editProductText()"
              >
                Save Product Text Changes
              </button>
              <hr class="mt-2" />
              <hr class="mt-2" />

              <div>
                <label
                  class="text-gray-700 dark:text-gray-200"
                  for="emailAddress"
                  >Product Picture</label
                >
                <input
                  @change="uploadFile"
                  ref="file"
                  type="file"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>

              <button
                class="mt-2 border border-solid rounded border-green-500 text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                v-on:click="editProductPicture()"
              >
                Save Product Picture Changes
              </button>

              <hr class="mt-2" />
            </form>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"
          >
            <button
              class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="toggleEditModal()"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showEditModal"
      class="opacity-25 fixed inset-0 z-40 bg-black"
    ></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import axios from "axios";

export default {
  name: "EditModal",
  props: {
    toggleEditModal: Function,
    showEditModal: Boolean
  },
  data() {
    return {
        
    
    };
  },
  mounted() {
      console.log(this.prodID);
  },
  methods: {
    // ...mapMutations(["toggleEditModal"]),
    //open or close editModal
    
    //Similaure à UserEditModal
    editProductText() {
      let productTexts = {
        name: this.personalProduct.name,
        description: this.personalProduct.description,
        price: +this.personalProduct.price,
      };

      //Call axios pour le Edit des textes du produit
      axios
        .put(
          `https://api-moshop.molengeek.pro/api/v1/product/${this.prodID}`,
          productTexts,
          {
            headers: {
              Authorization: "Bearer " + this.connectionToken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$store.dispatch("personalShop");
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    uploadFile() {
      this.Images = this.$refs.file.files[0];
    },

    //Edit product Picture
    //Objet necessaire pour les textes et FormData necessaire pour les photos
    editProductPicture() {
      let formData = new FormData();
      formData.append("cover", this.Images);
      axios
        .put(
          `https://api-moshop.molengeek.pro/api/v1/product/${this.prodID}/picture`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + this.connectionToken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          // this.successMessage=response.data.message
          this.$store.dispatch("addToCartRequest");
        })
        .catch((error) => {
          console.log(error.response);
          // this.errorMessage=error.response.data.error.messages.errors
        });
    },
  },
  computed: {
    ...mapState([ "connectionToken","prodID"]),
    ...mapFields(["personalProduct"]),
  },
};
</script>
