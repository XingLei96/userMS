<template>
  <div class="box">
    <!-- <router-link style="display: none" :to="{path:'/user/usersDetails'}" @click="goUsersDetails">222</router-link> -->
    <el-table :data="userDatas" style="width: 100%" max-height="250">
      <el-table-column
        type="index"
        fixed="left"
        label="#"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column prop="ctime" label="ctime" width="220" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.ctime | time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="accessRights" align="center">
        <template slot-scope="scope">
          <el-tag
            v-for="v in scope.row.access_rights"
            :key="v"
            :type="
              v == 'admin'
                ? (tagFlag = 'danger')
                : v == 'reseller'
                ? (tagFlag = 'warning')
                : v == 'developer'
                ? (tagFlag = '')
                : v == 'user'
                ? (tagFlag = 'info')
                : ''
            "
            >{{ v }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="email"
        label="email"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="nickname"
        label="nickname"
        align="center"
      ></el-table-column>
      <el-table-column prop="status" label="status" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status | status }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="avatar"
        label="avatar"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { userList, getUser, deleteUser } from "@/api/users";
import { parseTime } from "@/utils/index";

export default {
  components: {},
  data() {
    return {
      userDatas: [],
      tagFlag: ""
    };
  },
  computed: {},
  created() {},
  filters: {
    time: function(val) {
      if (val == null || val == undefined) {
        return "";
      }
      var date1 = new Date(val).toJSON();
      var date = new Date(+new Date(date1) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");

      return date;
    },

    // 可选，Number，0-禁用，封号，1-可用，解封， 只有admin权限可以修改
    status(val) {
      if (val == 0) {
        return "Ban";
      }
      if (val == 1) {
        return "Normal";
      }
    }
  },
  mounted() {
    this.getUsersList();
  },
  methods: {
    // 获取列表
    getUsersList() {
      var data = {
        page: 1,
        size: 10
      };
      userList(data).then(res => {
        if (res.code == 1000) {
          this.userDatas = res.payload.users;
          console.log(this.userDatas);
        }
      });
    },

    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
      console.log(row.id);
      getUser(row.id).then(res => {
        if (res.code == 1000) {
          console.log(res);
          var query = {
            datas: res.payload,
            id: row.id
          };
          this.$router.push({ path: "/user/usersDetails", query: { query } });
        }
      });
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作会永久删除用户" + row.email + ", 是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser(row.id).then(res => {
            if (res.code == 1000) {
              this.$message({
                type: "success",
                message: row.email + "已删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.box {
  padding: 20px;
}
.el-icon-time {
  padding-right: 20px;
}
</style>