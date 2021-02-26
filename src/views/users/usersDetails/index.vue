<template>
  <div class="box">
    <div class="inbox">
      <h3>{{$t('UsersDetails.title')}}</h3>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
      >
        <el-form-item :label="$t('UsersDetails.email')" label-width="100px">
          <el-input clearable v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('UsersDetails.nickname')" label-width="100px">
          <el-input clearable v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item :label="$t('UsersDetails.oldPassword')" label-width="100px">
          <el-input clearable v-model="form.old_password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('UsersDetails.newPassword')" label-width="100px">
          <el-input clearable v-model="form.new_password"></el-input>
        </el-form-item>
        <!-- <el-form-item label="avatar" label-width="100px">
          <el-input clearable v-model="form.avatar"></el-input>
        </el-form-item> -->
        <el-form-item :label="$t('UsersDetails.accessRights')" label-width="100px">
          <el-checkbox-group v-model="form.access_rights">
            <el-checkbox label="admin" name="type"></el-checkbox>
            <el-checkbox label="reseller" name="type"></el-checkbox>
            <el-checkbox label="developer" name="type"></el-checkbox>
            <el-checkbox label="user" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item :label="$t('UsersDetails.status')" label-width="100px">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">Normal</el-radio>
            <el-radio :label="0">Ban</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label-width="100px">
          <el-button @click="Cancel">{{$t('UsersDetails.cancel')}}</el-button>
          <el-button type="primary" @click="Update" @keyup.enter="Update">{{$t('UsersDetails.update')}}</el-button>
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
        status: "",
        old_password: "",
        new_password: "",
      },
    };
  },

  components: {},
  mounted() {
    this.datas = this.$route.query.query.datas;
    this.id = this.$route.query.query.id;
    this.form = this.datas;
    this.form.id = this.id;
  },

  methods: {
    // 更新
    Update() {
      console.log("submit!");
      console.log(this.id);
      console.log(this.form);
      updateUser(this.id, this.form).then((res) => {
        if (res.code == 1000) {
          console.log(res);
          this.$message({
            type: "success",
            message: this.form.email + this.$t('UsersDetailsMethods.updateSucceeded'),
          });
          this.$router.push({ path: "/admin/Users" });
        }
      });
    },

    // 取消更新
    Cancel() {
      // this.$router.push({ path: "/Users" });

      this.$confirm(this.$t('UsersDetailsMethods.confirmL'), this.$t('UsersDetailsMethods.confirmR'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('UsersDetailsMethods.preservation'),
          cancelButtonText: this.$t('UsersDetailsMethods.modification'),
           closeOnClickModal: false
        })
          .then(() => {
            this.Update()
          })
          .catch(action => {
            this.$router.push({ path: "/admin/Users" });
          });

    }
  },
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
  margin: 100px auto 0;
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