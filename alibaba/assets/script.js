import getter from "./values.js";

Vue.createApp({
  data() {
    return {
      searchValue: "",
      searchResult: [],
      selectedItems: [],
      highlightedItemIndex: 0,
    };
  },
  created() {
    window.addEventListener("keydown", this.customEventListener);
    window.addEventListener("click", this.customEventListener);
  },
  beforeUnmount() {
    window.addEventListener("keydown", this.customEventListener);
    window.addEventListener("click", this.customEventListener);
  },
  methods: {
    search: function (e) {
      if (e.keyCode === 13) {
        this.addSelectedEment();
      } else if (e.keyCode === 38) {
        this.highlightedItemIndex = Math.max(0, this.highlightedItemIndex - 1);
      } else if (e.keyCode === 27) {
        return;
      } else if (e.keyCode === 40) {
        this.highlightedItemIndex = Math.min(
          this.searchResult.length - 1,
          this.highlightedItemIndex + 1
        );
      } else {
        const items = getter(this.searchValue);
        this.searchResult = items.filter(
          (el) => !this.selectedItems.includes(Vue.reactive(el))
        );
        if (this.searchResult.length === 1) {
          this.addSelectedEment();
        }
      }
    },
    addSelectedEment: function () {
      const item = this.searchResult[this.highlightedItemIndex];
      if (item) {
        this.clickSearchItem(this.searchResult[this.highlightedItemIndex]);
      }
    },
    clickSearchItem: function (item) {
      this.selectedItems.push(item);
      this.searchValue = "";
      this.searchResult = [];
    },
    removeSearchItem: function (item) {
      this.selectedItems = this.selectedItems.filter((el) => el.id !== item.id);
    },
    customEventListener: function (e) {
      if (
        (e.key == "Escape" && this.searchResult.length) ||
        this.$refs.customInput !== e.target
      ) {
        this.searchResult = [];
      }
    },
  },
}).mount("#app");
