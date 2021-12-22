<template>
  <div>
    <div class="cardUser" v-if="connectionToken && userID">
      <div
        class="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
      >
        <img class="object-cover w-full h-56" :src="`https://api-moshop.molengeek.pro${infos.picture_path}`" alt="avatar">
        
        <div class="flex justify-between text-xs">
            <p>Created at: {{infos.created_at}}</p>
            <p>Updated at: {{infos.updated_at}}</p>
        </div>
        <div class="py-5 text-center">
          <p class="block text-gray-800 dark:text-white"><span>Firstname:</span> {{infos.firstname}}</p>
          <p class="block   text-gray-800 dark:text-white"><span>Lastname:</span> {{infos.lastname}}</p>
          <!-- <p class="block text-xl  text-gray-800 dark:text-white">{{infos.email}}</p> -->

          <div class="mt-3">
            <button
            v-on:click="toggleModal()"
              href="#"
              class="ml-2 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md dark:bg-gray-800 hover:bg-green-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700"
              >Edit</button
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else>
        <p class="text-center text-3xl font-semibold">Veuillez vous connecter</p>
    </div>
    <UserEdit />
  </div>
</template>

<script>
import axios from "axios";
import { mapState,mapMutations } from "vuex";
import UserEdit from '../components/UserEditModal.vue'

export default {
  name: "Profile",
  components: {
      UserEdit
  },
data() {
    return {
        infos:""
    }
},
  mounted() {
    this.userInfos();
    //   console.log(this.connectionToken);
  },
  methods: {
      ...mapMutations(['toggleModal']),
    userInfos() {
      axios
        .get("https://api-moshop.molengeek.pro/api/v1/user", {
          headers: {
            "Authorization": "Bearer " + this.connectionToken,
          },
        })
        .then((response) => {
        //   console.log(response.data.data.profile.picture_path);
        console.log(response.data.data.profile.id)
        localStorage.setItem('userID',response.data.data.profile.id)
          this.$store.commit("updateUserInfo",this.infos)
          this.infos=response.data.data.profile;
        // localStorage.setItem('picture_path',response.data.data.profile.picture_path)

      // localStorage.remove('nom')

        });
    },
  },
  computed: {
    ...mapState(["connectionToken","userID"]),
  },
};
</script>

<style></style>
