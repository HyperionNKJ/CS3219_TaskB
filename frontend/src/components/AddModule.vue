<template>
  <div>
    <b-form inline @submit.prevent="handleSubmit">
      <div>
        <label class="sr-only" for="module-name">Name</label>
        <b-input
          id="module-name"
          class="mb-2 mr-sm-3 mb-sm-0"
          placeholder="Module"
          v-model="formData.name"
        ></b-input>

        <label class="sr-only" for="module-code">Username</label>
        <b-input
          id="module-code"
          class="mb-2 mr-sm-3 mb-sm-0"
          placeholder="Module Code"
          v-model="formData.code"
        ></b-input>

        <label class="sr-only" for="module-mc">Username</label>
        <b-input
          id="module-mc"
          class="mb-2 mr-sm-3 mb-sm-0"
          placeholder="# of MCs"
          v-model="formData.mc"
        ></b-input>

        <label class="sr-only" for="module-grade">Username</label>
        <b-input
          id="module-grade"
          class="mb-2 mr-sm-3 mb-sm-0"
          placeholder="Grade obtained"
          v-model="formData.grade"
        ></b-input>

        <b-button type="submit" variant="outline-primary">
          <b-icon icon="plus" font-scale="1.1"></b-icon> Add module</b-button
        >
      </div>
    </b-form>
  </div>
</template>

<script>
import ModuleDataService from "../services/ModuleDataService";

export default {
  props: {
		addModule: Function,
		showAlert: Function
  },
  data() {
    return {
      formData: {
        name: "",
        code: "",
        mc: "",
        grade: "",
      },
    };
  },
  methods: {
    resetForm() {
      this.formData = {
        name: "",
        code: "",
        mc: "",
        grade: "",
      };
		},
    handleSubmit() {
      ModuleDataService.create(this.formData)
        .then((res) => {
          if (res.data.status === "success") {
						this.showAlert('success', "Module added!")
            this.addModule(res.data.data);
          } else {
						this.showAlert('danger', "Something went wrong. Please refresh and try again")
          }
        })
        .then(() => {
          this.resetForm();
        });
    },
  },
};
</script>


<style scoped>
#module-name {
  width: 30%;
}

#module-code,
#module-mc,
#module-grade {
  width: 15%;
}
</style>