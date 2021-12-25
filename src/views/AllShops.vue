<template>
    <div>
        <p class="font-semibold text-2xl text-green-500">All shops</p>
        <div v-if="allShopsArr" class="grid grid-cols-4 gap-3 mt-6">
    <div 
    v-for="shop,i in allShopsArr" :key="i"
    class="max-w-md px-8 py-4 mx-auto mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div class="flex justify-center -mt-16 md:justify-end">
            <img class="object-cover w-20 h-20 border-2 border-green-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src="@/assets/shop.jpg">
        </div>

        <h2 class="mt-2 text-2xl font-semibold text-gray-800 dark:text-white md:mt-0 md:text-2xl">{{shop.name}}</h2>

        <p class="mt-2 text-gray-600 dark:text-gray-200">
            <span class="font-semibold">Créé le: </span> {{shop.created_at}}
        </p>
        
        <div class="flex justify-end mt-4">
            <router-link
            :to="{
                name: 'AllShopsDetails',
                params: {
                id: +shop.id
}
            }"
            class="text-xl font-medium text-blue-500 dark:text-blue-300">Voir</router-link>
        </div>
        <router-view :key="$route.path"></router-view>
    </div>
    </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name:"AllShops",
    data() {
        return {
            allShopsArr:[]
        }
    },
    mounted() {
        this.getAllShops()
    },
    methods: {
        getAllShops(){
            axios
        .get(
          `https://api-moshop.molengeek.pro/api/v1/shops`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data.data);
          this.allShopsArr=response.data.data
        
        })
        .catch((error) => {
          console.log(error.response);
        });
        }
    }
}
</script>
<style>
    
</style>