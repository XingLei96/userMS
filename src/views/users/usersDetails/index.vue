<template>
  <div class="box">
    <div class="inbox">
      <h3>Edit</h3>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="email" label-width="100px">
          <el-input clearable v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="nickname" label-width="100px">
          <el-input clearable v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="avatar" label-width="100px">
          <el-input clearable v-model="form.avatar"></el-input>
        </el-form-item>
        <el-form-item label="accessRights" label-width="100px">
          <el-checkbox-group v-model="form.access_rights">
            <el-checkbox label="admin" name="type"></el-checkbox>
            <el-checkbox label="reseller" name="type"></el-checkbox>
            <el-checkbox label="developer" name="type"></el-checkbox>
            <el-checkbox label="user" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="status" label-width="100px">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">Normal</el-radio>
            <el-radio :label="0">Ban</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label-width="100px">
          <el-button type="primary" @click="onSubmit">Update</el-button>
          <el-button>cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { updateUser } from "@/api/users";
export default {
  data() {
    return {
      datas: "",
      id: "",
      form: {
        id: "",
        email: "",
        nickname: "",
        avatar: "",
        access_rights: [],
        status: ""
      }
    };
  },

  components: {},
  mounted() {
    this.datas = this.$route.query.query.datas;
    this.id = this.$route.query.query.id;
    this.form = this.datas;
    this.form.id = this.id
    console.log(this.form);
  },

  methods: {
    onSubmit() {
      console.log("submit!");
      console.log(this.form);
      var data = {
        params: {
          id: this.id
        },
        body: {
          email: this.datas.email,
          nickname: this.datas.nickname,
          email: this.datas.email,
          email: this.datas.email,
        }
      }
      updateUser(this.form).then(res => {
        if (res.code == 1000) {
          console.log(res);
        }
      });
    }
  }
};
</script>
<style scoped>
.box {
  padding: 20px;
  box-sizing: border-box;
}
.inbox {
  border-radius: 20px;
  padding: 40px;
  width: 600px;
  height: 500px;
  /* margin: 150px auto 0; */
  margin: 0 auto 0;
  border-left: 1px solid rgba(204, 204, 204, 0.356);
  border-right: 1px solid rgba(204, 204, 204, 0.356);
  box-shadow: 0 15px 35px 0 rgba(60, 66, 87, 0.08),
    0 5px 15px 0 rgba(0, 0, 0, 0.12);
}
h3 {
  text-align: center;
  position: relative;
  top: -20px;
  left: 0;
}
</style>