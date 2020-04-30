<template>
    <div>
        <div>
            <div>
                <el-input size="small" v-model="jl.name" prefix-icon="el-icon-plus" style="width: 300px;"
                          placeholder="添加职称..."></el-input>

                <el-select v-model="jl.titleLevel" placeholder="职称等级" size="small" style="margin-left: 4px">
                    <el-option
                            v-for="item in titleLevels"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
                <el-button type="primary" size="small" icon="el-icon-plus" style="margin-left: 4px"
                           @click="addJobLevel()">添加
                </el-button>
            </div>

            <div style="margin-top: 4px">
                <el-table
                        :data="jobLevel"
                        @selection-change="handleSelectionChange"
                        border
                        size="mini"
                        style="width: 90%">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="id"
                            label="编号"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="职称名称"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="titleLevel"
                            label="职称级别"
                            width="180">
                    </el-table-column>

                    <el-table-column
                            prop="createDate"
                            label="创建时间"
                            width="180">
                    </el-table-column>

                    <el-table-column
                            prop="enabled"
                            label="是否启用"
                            width="180">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.enabled==1" type="success">已启用</el-tag>
                            <el-tag v-else type="danger">未启用</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" type="primary" @click="EditJobLevel(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button size="small" type="danger" @click="deleteJobLevel(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="danger" style="margin-top: 4px" :disabled="this.multipleSelection.length==0"
                           size="small" @click="deleteMany">批量删除
                </el-button>
            </div>
        </div>
        <el-dialog
                title="修改职称"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <table>
                    <tr>
                        <td>
                            <el-tag>职称名称</el-tag>
                        </td>
                        <td>
                            <el-input size="small" v-model="updateJl.name"></el-input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <el-tag>职称级别</el-tag>
                        </td>
                        <td>
                            <el-select v-model="updateJl.titleLevel" placeholder="职称等级" size="small"
                                       style="margin-left: 4px">
                                <el-option
                                        v-for="item in titleLevels"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <el-tag>是否启用</el-tag>
                        </td>
                        <td>
                            <el-switch
                                    v-model="updateJl.enabled"
                                    active-text="启用"
                                    inactive-text="禁用">
                            </el-switch>
                        </td>
                    </tr>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="sureUpdate">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "JobLevelMana",
        data() {
            return {
                jl: {
                    name: '',
                    titleLevel: ''
                },
                titleLevels: [
                    '正高级',
                    '副高级',
                    '中级',
                    '初级',
                    '原级'
                ],
                jobLevel: [],
                dialogVisible: false,
                form: {
                    name: ''
                },
                updateJl: {
                    name: '',
                    titleLevel: '',
                    enabled: false
                },
                multipleSelection: [],
            }
        },
        methods: {
            initJobLevel() {
                this.getRequest("/system/basic/jl/").then(resp => {
                    if (resp) {
                        this.jobLevel = resp;
                    }
                })
            },
            //添加职称
            addJobLevel() {
                if (this.jl.name) {
                    if (this.jl.titleLevel) {
                        this.postRequest("/system/basic/jl/", this.jl).then(resp => {
                            if (resp) {
                                this.initJobLevel();
                                this.jl.name = '';
                                this.jl.titleLevel = ''
                            }
                        })
                    } else {
                        this.$message.error("职称等级不能为空")
                    }
                } else {
                    this.$message.error("职称名称不能为空")
                }

            },
            //删除职称
            deleteJobLevel(index, data) {
                this.$confirm('此操作将职称名称为：' + data.name + ', 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/jl/" + data.id).then(resp => {
                        if (resp) {
                            this.initJobLevel();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //修改职称
            EditJobLevel(index, data) {
                this.dialogVisible = true;
                Object.assign(this.updateJl, data)
            },
            sureUpdate() {
                this.putRequest("/system/basic/jl/", this.updateJl).then(resp => {
                    if (resp) {
                        this.initJobLevel();
                        this.dialogVisible = false
                    } else {
                        this.dialogVisible = false
                    }
                })
            },
            deleteMany() {
                this.$confirm('此操作将永久删除【' + this.multipleSelection.length + '】条记录，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    })
                    this.deleteRequest("/system/basic/jl/" + ids,).then(resp => {
                        if (resp) {
                            this.initJobLevel();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
        mounted() {
            this.initJobLevel();
        }
    }
</script>

<style scoped>

</style>