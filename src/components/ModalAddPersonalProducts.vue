<template>
  <div>
    <button
      class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      v-on:click="ShowaddProductModal()"
    >
      Add a product
    </button>
    <div
      v-if="showProductModal"
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
            <h3 class="text-3xl font-semibold">Add a product</h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              v-on:click="ShowaddProductModal()"
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
            <form @submit.prevent="addProduct">
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
                  >Product Picture</label
                >
                <input
                  @change="uploadFile"
                  ref="file"
                  type="file"
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
            </form>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"
          >
            <button
              class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="ShowaddProductModal()"
            >
              Close
            </button>
            <button
              class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="addProduct"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showProductModal"
      class="opacity-25 fixed inset-0 z-40 bg-black"
    ></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { mapFields } from "vuex-map-fields";
import axios from "axios";

export default {
  name: "ProductModal",

  

  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    ...mapMutations(["ShowaddProductModal"]),
    uploadFile() {
      this.Images = this.$refs.file.files[0];
    },
    addProduct() {
      let formData = new FormData();
      formData.append("name", this.personalProduct.name);
      formData.append("description", this.personalProduct.description);
      formData.append("price", +this.personalProduct.price);
      formData.append("cover", this.Images);

      //  
      //
      //requete pour rajout
      axios
        .post(
          "https://api-moshop.molengeek.pro/api/v1/product",
          formData,
          {headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": "Bearer " + this.connectionToken,
          }}
        )
        .then((response) => {
          console.log(response);
        //   this.successMessage = response.data.message;

        //Relancer la requete pour le personal shop afin de ne pas devoir recharger la page pour voir le nouvel élément ajouté
        this.$store.dispatch("personalShop");

        })
        .catch((error) => {
          console.log(error.response);
        //   this.errorMessage = error.response.data.error.messages.errors;
        })
        ;
    },
  },
  computed: {
    ...mapState(["showProductModal","connectionToken"]),
    ...mapFields(["personalProduct"]),
  },
};
</script>
