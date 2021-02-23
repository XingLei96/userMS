<template>
  <div>
    <el-table :data="userDatas" style="width: 100%" max-height="250">
      <el-table-column prop="ctime" label="ctime" width="120">
      </el-table-column>
      <el-table-column prop="access_rights" label="accessRights" width="120">
      </el-table-column>
      <el-table-column prop="avatar" label="avatar" width="120">
      </el-table-column>
      <el-table-column prop="email" label="email" width="300">
      </el-table-column>
      <el-table-column prop="nickname" label="nickname" width="120">
      </el-table-column>
      <el-table-column prop="status" label="status" width="120">
      </el-table-column>
      <el-table-column label="操作">
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
import { userList, getUser } from "@/api/users";

export default {
  name: "",
  components: {},
  data() {
    return {
      userDatas: []
    };
  },
  computed: {},
  created() {},
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
      // console.log(data);
      userList(data).then(res => {
        console.log(res);
        if (res.code == 1000) {
          this.userDatas = res.payload.users;
          console.log(this.userDatas);
        }
      });
    },

    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
      console.log(row.id)
      getUser(row.id).then(res => {
        if (res.code == 1000) {
          console.log(res);
        }
      });
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>