<template>
  <div id="module-table">
    <h1>Modules</h1>
    <b-table
      sticky-header="450px" striped hover :items="modules" :fields="fields">
      <template v-slot:cell(delete)="data">
        <b-button @click="deleteMod(data.index)" variant="outline-danger"
          ><b-icon icon="trash" font-scale="1.1" variant="danger"></b-icon>
          Delete
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import ModuleDataService from "../services/ModuleDataService";

export default {
  props: {
    modules: Array,
	deleteModule: Function,
    showAlert: Function,
  },
  data() {
    return {
      fields: [
        { key: "name", label: "Module" },
        { key: "code", label: "Code" },
        { key: "mc", label: "MC" },
        { key: "grade", label: "Grade" },
        { key: "create_date", label: "Date added" },
        "Delete",
      ],
    };
  },
  methods: {
    deleteMod(index) {
      ModuleDataService.delete(this.modules[index]._id).then((res) => {
        if (res.data.status === "success") {
          this.showAlert("warning", "Module deleted!");
          this.deleteModule(index);
        } else {
          this.showAlert("danger", "Something went wrong. Please refresh and try again");
        }
      });
    },
  },
};
</script>

<style scoped>
#module-table {
  padding-top: 50px;
}
</style>