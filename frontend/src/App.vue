<template>
  <div id="app">
    <b-container>
      <AlertBox class="alert-box" v-if="shouldShowAlert" :status="status" :alertMessage="alertMessage" :resetAlert="resetAlert"/>
      <AddModule :addModule="addModule" :showAlert="showAlert" />
      <ModuleTable :modules="modules" :deleteModule="deleteModule" :showAlert="showAlert"/>
      <p class="author">Neo Kai Jun | CS3219 Task B | Coded with VueJs</p>
    </b-container>
  </div>
</template>

<script>
import AddModule from "./components/AddModule.vue";
import ModuleTable from "./components/ModuleTable.vue";
import AlertBox from "./components/AlertBox";
import ModuleDataService from "./services/ModuleDataService";

export default {
  name: "App",
  components: {
    AlertBox,
    AddModule,
    ModuleTable,
  },
  data() {
    return {
      modules: [],
      status: '',
      alertMessage: '',
      shouldShowAlert: false
    };
  },
  mounted: function () {
    ModuleDataService.getAll()
      .then((response) => {
        this.modules = response.data.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    addModule(module) {
      this.modules.push(module);
    },
    deleteModule(index) {
      this.modules.splice(index, 1);
    },
    showAlert(status, alertMessage) {
      this.status = status;
      this.alertMessage = alertMessage;
      this.shouldShowAlert = true;
    },
    resetAlert() {
			this.shouldShowAlert = false
		},
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.author {
  font-size: 0.8rem;
}

.alert-box {
  position: absolute;
  top: 20%;
}
</style>