<template>
  <div class="avReg">
      <!-- success -->

    <div v-if="successMessage" class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex items-center justify-center w-12 bg-emerald-500">
            <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"/>
            </svg>
        </div>
        
        <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
                <span class="font-semibold text-emerald-500 dark:text-emerald-400">Success</span>
                <p class="text-sm text-gray-600 dark:text-gray-200">{{successMessage}}</p>
            </div>
        </div>
    </div>
        
      <!-- error -->
      <div v-if="errorMessage!=''" >
      <div
      v-for="error,i in errorMessage" :key="i"
      class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex items-center justify-center w-12 bg-red-500">
            <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"/>
            </svg>
        </div>
        
        <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
                <span class="font-semibold text-red-500 dark:text-red-400">Error</span>
                <p class="text-sm text-gray-600 dark:text-gray-200 text-center">{{error.message}}</p>
            </div>
        </div>
    </div>
      </div>
    <section
      class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 absolute register"
    >
      <h2
        class="text-lg font-semibold text-gray-700 capitalize dark:text-white"
      >
        Register
      </h2>

      <form @submit.prevent="handleRegister" enctype="multipart/form-data">
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700 dark:text-gray-200" for="emailAddress"
              >First name</label
            >
            <input
              v-model="firstName"
              type="text"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label class="text-gray-700 dark:text-gray-200" for="emailAddress"
              >Last name</label
            >
            <input
              v-model="lastName"
              type="text"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label class="text-gray-700 dark:text-gray-200" for="emailAddress"
              >Email Address</label
            >
            <input
              v-model="email"
              type="email"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label class="text-gray-700 dark:text-gray-200" for="emailAddress"
              >Picture</label
            >
            <input
              @change="uploadFile" ref="file"
              type="file"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label class="text-gray-700 dark:text-gray-200" for="password"
              >Password</label
            >
            <input
              v-model="password"
              id="password"
              type="password"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button
            type="submit"
            class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'multipart/form-data'
      },
      formData: new FormData(),
      errorMessage:"",
      successMessage:""
    };
  },
  methods: {
    uploadFile() {
        this.Images = this.$refs.file.files[0];
      },
    handleRegister() {
      //remplacé par le @submit.prevent
      // e.preventDefault();
      console.log("save Register");
        this.formData.append("firstname", this.firstName);
        this.formData.append("lastname", this.lastName);
        this.formData.append("email", this.email);
        this.formData.append("password", this.password);
        this.formData.append("picture", this.Images);

        axios
          .post(
            "https://api-moshop.molengeek.pro/api/v1/register",
            this.formData,
            this.headers
          )
          .then((response) => {
            console.log(response);
            this.successMessage=response.data.message
          })
          .catch((error) => {
            console.log(error.response.data.error.messages.errors);
            this.errorMessage=error.response.data.error.messages.errors
          });
    },
  },
  computed: {
    ...mapFields(["firstName", "lastName", "email", "password", "picture"]),
  },
};
</script>
<style>
.html {
  /* position: relative; */
}
.avReg {
  background-color: gray;
  width: 100%;
  height: 100%;
}
.register {
  margin-left: 30%;
}
</style>
