<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">Welcome ! {{ names }}</div> -->
    <div class="dashboard-text">Welcome ! {{ email }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import local from "../../utils/local";

export default {
  data() {
    return {
      email: ""
    };
  },
  name: "Home",
  computed: {
    ...mapGetters(["name"])
  },
  mounted() {
    this.email = local.get("email");
    console.log(this.email)
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
