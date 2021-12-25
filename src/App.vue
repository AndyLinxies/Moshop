<template>
  <div id="app">
    <div class="pb-16">
      <!-- Nav -->

      <nav class="bg-white shadow dark:bg-gray-800">
        <div class="container px-6 py-4 mx-auto">
          <div class="md:flex md:items-center md:justify-between">
            <div class="flex items-center justify-between">
              <div class="text-xl font-semibold text-gray-700">
                <router-link
                  to="/"
                  class="text-2xl font-bold text-green-800 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                  href="#"
                  >MoShop</router-link
                >
              </div>

              <!-- Mobile menu button -->
              <div class="flex md:hidden">
                <button
                  type="button"
                  class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                    <path
                      fill-rule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
            <div class="flex-1 md:flex md:items-center md:justify-between">
              <div
                class="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8"
              >
                <router-link
                  to="/personalShop"
                  class="flex px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  <span>Personal Shop</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    /></svg
                ></router-link>
              </div>

              <div class="flex items-center mt-4 md:mt-0">
                <router-link
                  to="/panier"
                  class="hidden mx-4 text-gray-600 transition-colors duration-200 transform md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                  aria-label="show notifications"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </router-link>
                <!-- commandeq -->
                <router-link
                  to="/commande"
                  class="mr-2 rounded-full flex items-center px-1 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-yellow-600 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </router-link>

                <router-link
                  to="/user"
                  class="flex items-center focus:outline-none"
                  aria-label="toggle profile dropdown"
                >
                  <div
                    class="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full"
                  >
                    <img
                      src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                      class="object-cover w-full h-full"
                      alt="avatar"
                    />
                  </div>

                  <h3
                    class="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden"
                  >
                    Khatab wedaa
                  </h3>
                </router-link>
                <!-- <router-view></router-view> -->
                <!-- Login & Register -->
                <div class="flex items-center py-2 -mx-1 md:mx-0">
                  <router-link
                    to="/login"
                    class="rounded-full block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-green-500 hover:bg-blue-600 md:mx-2 md:w-auto"
                  >
                    <span @click="handleLoginClick"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        /></svg
                    ></span>
                  </router-link>
                  <!-- Deconnection -->

                  <button
                    @click="logOut"
                    class="ml-2 p-1 rounded-full font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 hover:bg-orange-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                  <!-- Register -->
                  <router-link
                    to="/register"
                    class="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 md:mx-0 md:w-auto"
                  >
                    <span @click="handleRegisterClick">Register</span>
                  </router-link>
                  <router-link
                    to="/AllShops"
                    class=" block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-yellow-500 rounded-md hover:bg-yellow-600 md:mx-0 md:w-auto"
                  >
                    <span>All Shops</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

//provisoire

export default {
  name: "App",
  components: {},
  data() {
    return {
      // componentKey: 0
    };
  },
  methods: {
    ...mapMutations(["handleLoginClick", "handleRegisterClick", "logOut"]),

    // forceRerender() {
    //   this.componentKey += 1
    // }
},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
