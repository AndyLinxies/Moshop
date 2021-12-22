<template>
  <div>
    <!-- <button class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" >
      Open large modal
    </button> -->
    <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              Edit User Informations
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
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
            <button class=" border border-solid rounded border-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm text-blue-500 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="saveEdit">
              Save Text Changes
            </button>
        </div>

        <div class="border border-t-1">
            <label class="text-gray-700 dark:text-gray-200" 
              >Picture</label
            >
            <input
              @change="uploadFile" ref="file"
              type="file"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            <button class="border mt-2 border-solid rounded border-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm text-blue-500 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="savePicEdit">
              Save Picture Changes
            </button>
          </div>
        
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
              Close
            </button>
            
          </div>
      </form>
          </div>
          <!--footer-->
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import axios from "axios";
import { mapFields } from "vuex-map-fields";


export default {
  name: "UserEdit",
  
  data() {
    return {
      formData: new FormData,
      userID: localStorage.getItem('userID'),
    }
  },
  mounted() {
      console.log('user Informations',this.userID);
  },
  methods: {
    ...mapMutations(['toggleModal']),
    saveEdit(){
        // this.formData.append("id", this.userID);
        let userData = {
            firstname: this.firstName,
            lastname: this.lastName,
        }
        // this.formData.append("picture", this.Images);
        axios
          .put(
            "https://api-moshop.molengeek.pro/api/v1/user",
            userData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            
          )
          .then((response) => {
            console.log(response);
            // this.successMessage=response.data.message
          })
          .catch((error) => {
            console.log(error.response);
            // this.errorMessage=error.response.data.error.messages.errors
          });

    },
    uploadFile(){
        this.Images = this.$refs.file.files[0];
    },
    savePicEdit(){
        this.formData.append("picture", this.Images);

        axios
          .put(
            "https://api-moshop.molengeek.pro/api/v1/user/picture",
            this.formData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            
          )
          .then((response) => {
            console.log(response);
            // this.successMessage=response.data.message
          })
          .catch((error) => {
            console.log(error.response);
            // this.errorMessage=error.response.data.error.messages.errors
          });
    },
    
  },
  computed: {
      ...mapState(["showModal"]),
      ...mapFields(["firstName", "lastName",])
     
  
  }
}
</script>