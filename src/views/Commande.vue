<template>
  <div>
    <p class="font-semibold text-2xl">Vos commandes</p>
    <div v-if="commandArr" class="grid grid-cols-2 gap-3 mt-6">
    <div 
    v-for="command,i in commandArr" :key="i"
    class="max-w-md px-8 py-4 mx-auto mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div class="flex justify-center -mt-16 md:justify-end">
            <img class="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src="@/assets/cart.jpg">
        </div>

        <h2 class="mt-2 text-2xl font-semibold text-gray-800 dark:text-white md:mt-0 md:text-3xl">Total: ${{command.price}}</h2>

        <p class="mt-2 text-gray-600 dark:text-gray-200">
            <span class="font-semibold">Commande du:</span> {{command.created_at}}
        </p>
        
        <div class="flex justify-end mt-4">
            <button 
            @click="getOrderID(command.id)"
            class="text-xl font-medium text-blue-500 dark:text-blue-300">Voir</button>
        </div>
    </div>
    <ModalCommandDetails />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapFields } from "vuex-map-fields";
import ModalCommandDetails from '../views/ModalCommandDetails.vue'

export default {
  name: "Commande",
  components:{
      ModalCommandDetails
  },
  data() {
      return {
          commandArr:[],
          orderItems:[]
      }
  },
  computed: {
      ...mapFields(['orderID','showModalCommandDetail'])
  },

  mounted() {
      this.getCommands()
  },

  methods: {
      //Recuperer l'id de la commande sur laquelle on a cliqué et mettre a voir la variable orderID du state
        getOrderID(value){
            console.log(value);
            this.orderID=value
            this.showModalCommandDetail=true
            this.$store.dispatch("getOrderDetail");

        },
      //
    getCommands() {
      axios
        .get(
          `https://api-moshop.molengeek.pro/api/v1/orders`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.commandArr=response.data.data
        
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>

<style></style>
