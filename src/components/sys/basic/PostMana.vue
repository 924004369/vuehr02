<template>
    <div>
        <div>
            <el-input
                    size="small"
                    class="addPosInput"
                    placeholder="添加职位..."
                    prefix-icon="el-icon-plus"
                    v-model="pos.name"
                    @keydown.enter.native="addPosition">
            </el-input>

            <el-button size="small" type="primary" icon="el-icon-plus" @click="addPosition()">添加</el-button>
        </div>

        <div class="posManMain">
            <el-table
                    :data="positions"
                    border
                    stripe
                    @selection-change="handleSelectionChange"
                    size="mini"
                    style="width: 70%">
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
                        label="职位名称"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        prop="enabled"
                        label="是否启用">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
                        <el-tag type="danger" v-else>未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showEditView(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button @click="deleteManage" type="danger" size="small" style="margin-top: 4px"
                       :disabled="multipleSelection.length==0">批量删除
            </el-button>
        </div>

        <el-dialog
                title="修改职位"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <div>
                    <el-tag>职位名称</el-tag>
                    <el-input class="updatePosInput" size="small" v-model="updatePos.name"></el-input>
                </div>

                <div style="margin-top: 2px">
                    <el-tag>是否启用</el-tag>
                    <el-switch
                            v-model="updatePos.enabled"
                            active-text="启用"
                    inactive-text="禁用">
                    </el-switch>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "PostMana",
        data() {
            return {
                pos: {
                    name: ''
                },
                positions: [],
                dialogVisible: false,
                updatePos: {
                    name: '',
                    enabled:false
                },
                multipleSelection: [],
            }
        },
        mounted() {
            this.initPosition();
        },
        methods: {
            initPosition() {
                this.getRequest("/system/basic/pos/").then(resp => {
                    if (resp) {
                        this.positions = resp;
                    }
                })
            },
            showEditView(index, data) {
                Object.assign(this.updatePos, data)
                this.dialogVisible = true;

            },
            handleDelete(index, data) {
                this.$confirm('此操作将永久删除【' + data.name + '】职位，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/pos/" + data.id).then(resp => {
                        if (resp) {
                            this.initPosition();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addPosition() {
                if (this.pos.name) {
                    this.postRequest("/system/basic/pos/", this.pos).then(resp => {
                        if (resp) {
                            this.initPosition()
                            this.pos.name = ''
                        } else {
                            this.$message.error("添加失败")
                        }
                    })
                } else {
                    this.$message.error("职位名称不能为空")
                }
            },
            doUpdate() {
                this.putRequest("/system/basic/pos/", this.updatePos).then(resp => {
                    if (resp) {
                        this.initPosition();
                        this.dialogVisible = false;
                        this.updatePos.name = ''
                    } else {
                        this.$message.error("")
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            deleteManage() {
                this.$confirm('此操作将永久删除【' + this.multipleSelection.length + '】条记录，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    })
                    this.deleteRequest("/system/basic/pos/" + ids,).then(resp => {
                        if (resp) {
                            this.initPosition();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            }
        },

    }
</script>

<style scoped>
    .addPosInput {
        width: 300px;
        margin-right: 4px
    }

    .posManMain {
        margin-top: 10px;
    }

    .updatePosInput {
        width: 200px;
        margin-left: 4px;
    }
</style>