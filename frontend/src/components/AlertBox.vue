<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="status"
      @dismissed="dismissAlert()"
      @dismiss-count-down="countDownChanged"
    >
      {{ alertMessage }}
    </b-alert>
  </div>
</template>

<script>
export default {
  props: {
    status: String,
    alertMessage: String,
    resetAlert: Function,
  },
  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    dismissAlert() {
      this.dismissCountDown = 0;
      this.resetAlert();
    },
  },
  mounted() {
    this.dismissCountDown = this.dismissSecs;
  },
};
</script>
