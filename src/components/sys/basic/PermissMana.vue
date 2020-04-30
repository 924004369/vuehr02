<template>
    <div>
        <div>
            <el-input placeholder="请输入英文名称..." size="small" style="width: 20%" v-model="role.name">
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input placeholder="请输入角色中文名称..." style="width: 20%;margin-left: 6px;margin-right: 6px" size="small"
                      v-model="role.nameZh" @keydown.enter.native="addRole"></el-input>
            <el-button icon="el-icon-plus" type="primary" size="small" @click="addRole">添加角色</el-button>
        </div>

        <div class="permissManaMain">
            <el-collapse v-model="activeName" accordion @change="change">
                <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可访问的资源</span>
                            <el-button style="float: right; padding: 3px 0;color: rgba(244,13,17,0.98)"
                                       icon="el-icon-delete" type="text" @click="deleteRoleByRid(r)"></el-button>
                        </div>
                        <div>
                            <el-tree show-checkbox
                                     node-key="id"
                                     ref="tree"
                                     :key="index"
                                     :default-checked-keys="selectedMenus"
                                     :data="allMenus"
                                     :props="defaultProps"></el-tree>
                            <div style="display: flex;justify-content: flex-end">
                                <el-button size="mini" @click="cancelUpdate">取消修改</el-button>
                                <el-button size="mini" type="primary" @click="doUpdate(r.id,index)">确认修改</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-collapse-item>

            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PermissMana",
        data() {
            return {
                role: {
                    name: '',
                    nameZh: ''
                },
                roles: [],
                allMenus: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                selectedMenus: [],
                activeName: -1,//哪个都不展开
            }
        },
        methods: {
            initRoles() {
                this.getRequest("/system/basic/permiss/").then(resp => {
                    if (resp) {
                        this.roles = resp
                    }
                })
            },
            getAllMenus() {
                this.getRequest("/system/basic/permiss/menus").then(resp => {
                    if (resp) {
                        this.allMenus = resp;
                    }
                })
            },
            initSelectedMenus(rid) {
                this.getRequest("/system/basic/permiss/mid/" + rid).then(resp => {
                    if (resp) {
                        this.selectedMenus = resp
                    }
                })
            },
            change(rid) {
                if (rid) {
                    this.getAllMenus();
                    this.initSelectedMenus(rid)
                }
            },
            //修改权限
            doUpdate(rid, index) {
                let tree = this.$refs.tree[index];
                let selectedKeys = tree.getCheckedKeys(true);
                let url = '/system/basic/permiss/?rid=' + rid;
                selectedKeys.forEach(key => {
                    url += '&mids=' + key;
                })
                this.putRequest(url).then(resp => {
                    if (resp) {
                        this.activeName=-1;
                    }
                })
            },
            cancelUpdate() {
                this.activeName = -1
            },

            //添加角色
            addRole(){
                if (this.role.name&&this.role.nameZh) {
                    this.postRequest("system/basic/permiss/role",this.role).then(resp=>{
                        if (resp){
                            this.role.nameZh='',
                                this.role.name='';
                            this.initRoles();
                        }
                    })
                }else{
                    this.$message.error("数据不能为空")
                }
            },

            //删除角色
            deleteRoleByRid(r){
                this.$confirm('确定删除这个角色吗?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/permiss/role/"+r.id).then(resp=>{
                        if (resp){
                            this.initRoles()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            }

        },
        mounted() {
            this.initRoles()
        }
    }
</script>

<style scoped>
    .permissManaMain {
        margin-top: 10px;
        width: 50%
    }
</style>