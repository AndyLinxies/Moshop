<template>
  <div>
      <!-- messages -->
      <div v-if="loginSuccess" class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex items-center justify-center w-12 bg-emerald-500">
            <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"/>
            </svg>
        </div>
        
        <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
                <span class="font-semibold text-emerald-500 dark:text-emerald-400">Success</span>
                <p class="text-sm text-gray-600 dark:text-gray-200">{{loginSuccess}}</p>
            </div>
        </div>
    </div>
        
      <!-- error -->
      <!-- <div v-if="loginErr.messages.errors" >
      <div
      v-for="error,i in loginErr.messages.errors" :key="i"
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
      </div> -->
      <!-- Second error -->
      <div v-if="ResploginErr" >
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
                <p class="text-sm text-gray-600 dark:text-gray-200 text-center">{{ResploginErr}}</p>
            </div>
        </div>
    </div>
      </div>
      <!-- messages -->

    <section
      class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
    >
      <h2
        class="text-lg font-semibold text-gray-700 capitalize dark:text-white"
      >
        Login
      </h2>

      <form @submit.prevent="login">
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
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
import axios from "axios";
import { mapFields } from "vuex-map-fields";


export default {
  name: "Login",
  data() {
    return {
      formData: new FormData(),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
      },
        loginErr:"",
        loginSuccess:"",
        ResploginErr:""
    };
  },
  methods: {
    login() {
      //remplacé par le @submit.prevent
      // e.preventDefault();
      console.log("Save login");
      this.formData.append("email", this.email);
      this.formData.append("password", this.password);

      axios
        .post(
          "https://api-moshop.molengeek.pro/api/v1/login",
          this.formData,
          this.headers
        )
        .then((response) => {
          console.log(response.data.data.token);
          console.log(response.data);
        this.loginSuccess=response.data.message;
        //update la valeur du connectionToken du state
        localStorage.setItem('token',response.data.data.token)
        // this.$store.commit("updateConnectionToken", localStorage.getItem('token') );

        })
        .catch((error) => {
          console.log(error.response);
        this.loginErr=error.response.data.error
        this.ResploginErr=error.response.data.error.responseText

        });
    },
  },

  computed:{
    ...mapFields([ "email", "password"]),

  }
};
</script>
<style></style>
