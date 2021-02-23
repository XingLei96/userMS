<template>
<div class="box">
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="email">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="nickname">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="avatar">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="accessRights">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="admin" name="type"></el-checkbox>
        <el-checkbox label="reseller" name="type"></el-checkbox>
        <el-checkbox label="developer" name="type"></el-checkbox>
        <el-checkbox label="user" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="status">
      <el-radio-group v-model="form.resource">
        <el-radio label="Normal"></el-radio>
        <el-radio label="Ban"></el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- <el-form-item label="活动形式">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item> -->
    <el-form-item>
      <el-button type="primary" @click="onSubmit">更新</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>

</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },

  components: {},
  mounted() {
    console.log(this.$route.query.datas);
    this.datas = this.$route.query.datas;
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style scoped>
.box {
  padding: 20px;
}
</style>