<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center pb-5">
        <h1>Contact form</h1>
      </div>
      <v-card class="pa-4" width="300">
        <v-layout column>
          <v-text-field label="Email" v-model="email" />
          <v-text-field label="Message" v-model="message" />
          <v-btn outlined @click="sendEmail">Send email</v-btn>
        </v-layout>
      </v-card>
    </v-flex>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    email: "",
    message: "",
    snackbar: false,
    snackbarMessage: ""
  }),
  methods: {
    sendEmail() {
      this.$axios
        .$post("api/send-email", {
          email: this.email,
          message: this.message
        })
        .then(() => {
          this.snackbarMessage = "It worked! your email has been sent";
          this.snackbar = true;
        })
        .catch(() => {
          this.snackbarMessage = "BE messed up";
          this.snackbar = true;
        });
    }
  }
};
</script>
