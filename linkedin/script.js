var vue = new Vue({
  el: "#main-part",
  data: {
    formData: {
      type: "influencer",
      linkedin: "",
      website: "",
      email: "",
      phone: "",
    },
    isFormValid: false,
    formSubmited: false,
  },
  methods: {
    checkFormValidation: function () {
      if (
        this.formData.email &&
        this.formData.phone &&
        (this.formData.linkedin || this.formData.website)
      ) {
        this.isFormValid = true;
      } else {
        this.isFormValid = false;
      }
    },
    submitForm: function () {
      this.isFormValid = false;
      var that = this;
      axios
        .post("https://cors-anywhere.herokuapp.com/http://linkedin.youping.ir/index.php", this.formData)
        .then(function () {
          that.formSubmited = true;
        })
        .catch(function () {
          that.isFormValid = true;
        });
    },
  },
});
