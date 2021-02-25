<template>
  <div class="box">
    <!-- <router-link style="display: none" :to="{path:'/user/usersDetails'}" @click="goUsersDetails">222</router-link> -->
    <el-table
      highlight-current-row
      :data="userDatas"
      style="width: 100%; height: 96%"
    >
      <el-table-column
        type="index"
        fixed="left"
        label="#"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column prop="ctime" :label="$t('usersList.createTime')" width="220" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.ctime | time }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('usersList.accessRights')" align="center">
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
        :label="$t('usersList.email')"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="nickname"
        label="nickname"
        align="center"
      ></el-table-column>
      <el-table-column prop="status" :label="$t('usersList.status')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status | status }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="avatar"
        label="avatar"
        align="center"
      ></el-table-column> -->
      <el-table-column :label="$t('usersList.operation')" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >{{$t('usersList.edit')}}</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >{{$t('usersList.delete')}}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right"
      @current-change="handleCurrentChange"
      background
      :current-page="current.page"
      layout="total, prev, pager, next, jumper"
      :total="current.total_count"
    >
    </el-pagination>
  </div>
</template>

<script>
import { userList, getUser, deleteUser } from "@/api/users";

export default {
  components: {},
  data() {
    return {
      userDatas: [],
      tagFlag: "",
      currentPage4: 4,
      current: {
        total_count: 0, // 总数
        page: 1, // 第几页
        size: 10, // 每页多少条
        total_page: 0 // 一共几页
      }
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      if (val == 1) {
        this.current.page = 1;
      } else {
        this.current.page = parseInt(val) * 1;
      }
      this.getUsersList();
    },

    // 获取列表
    getUsersList() {
      var data = this.current;
      console.log(data);
      userList(data).then(res => {
        if (res.code == 1000) {
          console.log(res);

          this.current.total_count = res.payload.total_count;
          this.current.page = res.payload.page;
          this.current.size = res.payload.size;
          this.current.total_page = res.payload.total_page;

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
          this.$router.push({ path: "/UsersDetails", query: { query } });
        }
      });
    },

    // 删除
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm(this.$t('usersMethods.confirmL') + row.email + this.$t('usersMethods.confirmR'), this.$t('usersMethods.confirmN'),
        {
          confirmButtonText: this.$t('usersMethods.confirm'),
          cancelButtonText: this.$t('usersMethods.cancel'),
          type: "warning"
        }
      )
        .then(() => {
          deleteUser(row.id).then(res => {
            if (res.code == 1000) {
              this.$message({
                type: "success",
                message: row.email + this.$t('usersMethods.successfully')
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t('usersMethods.canceled')
          });
        });
    }
  }
};
</script>

<style scoped>
.box {
  padding: 20px;
  height: calc(100vh - 50px);
  box-sizing: border-box;
  /* background: skyblue; */
}
.el-icon-time {
  padding-right: 20px;
}
</style>