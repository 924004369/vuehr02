<template>
    <div>
        <div style="display: flex;justify-content: center">
            <el-input size="mini" prefix-icon="el-icon-search" placeholder="默认展示部分用户，可以通过用户名搜索更多用户..." v-model="keywords"
                      style="width: 35%"></el-input>
            <el-button type="primary" size="mini" icon="el-icon-search" style="margin-left: 4px" @click="search">搜索</el-button>
        </div>

        <div class="hr-container">
            <el-card class="hr-card" v-for="(hr,index) in hrs" :key="index">
                <div slot="header" class="clearfix">
                    <span>{{hr.name}}</span>
                    <el-button type="text" icon="el-icon-delete"
                               style="float: right;padding: 3px 0;color: red" @click="deletehr(hr)"></el-button>
                </div>

                <div>
                    <div style="display: flex;justify-content: center">
                        <img :src="hr.userface" :alt="hr.name" :title="hr.name" class="userface-img">
                    </div>
                    <div class="userinfo-container">
                        <div>
                            <div>用户名：{{hr.name}}</div>
                            <div>手机号码：{{hr.phone}}</div>
                            <div>电话号码：{{hr.telephone}}</div>
                            <div>地址：{{hr.address}}</div>
                            <div>用户状态：
                                <el-switch
                                        v-model="hr.enabled"
                                        active-text="启用"
                                        inactive-text="禁用"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                        @change="updateHr(hr)">
                                </el-switch>
                            </div>
                            <div>用户角色：
                                <el-tag type="success" style="margin-right: 2px" v-for="(item,index) in hr.roles">
                                    {{item.nameZh}}
                                </el-tag>
                                <el-popover
                                        @show="showPop(hr)"
                                        @hide="hidePop(hr)"
                                        placement="right"
                                        title="角色列表"
                                        width="200"
                                        trigger="click">
                                    <el-select v-model="selectedRoles" multiple placeholder="请选择">
                                        <el-option
                                                v-for="(r,index) in allRoles"
                                                :key="index"
                                                :label="r.nameZh"
                                                :value="r.id">
                                        </el-option>
                                    </el-select>
                                    <el-button slot="reference" type="text" icon="el-icon-more"></el-button>
                                </el-popover>
                            </div>
                            <div>备注：{{hr.remark}}</div>
                        </div>
                    </div>
                </div>


            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SysHr",
        data() {
            return {
                keywords: '',
                hrs: [],
                allRoles: [],
                selectedRoles: []
            }
        },
        methods: {
            search(){
               this.initHr()
            },
            hidePop(hr) {
                let roles = hr.roles;
                let flag = false;
                if (roles.length != this.selectedRoles.length) {
                    flag = true
                }
                if (flag) {
                    let url = '/system/hr/role?hrId=' + hr.id;
                    this.selectedRoles.forEach(sr => {
                        url += '&rids=' + sr;
                    })
                    console.log("url的值为：" + url)
                    this.putRequest(url).then(resp => {
                        if (resp) {
                            this.initHr();
                        } else {
                            this.$message.error(resp)
                        }
                    })
                }


            },
            showPop(hr) {
                this.initRoles()
                let roles = hr.roles;
                this.selectedRoles = [];
                roles.forEach(role => {
                    this.selectedRoles.push(role.id)
                })
            },
            initHr() {
                this.getRequest("/system/hr/?keywords="+this.keywords).then(resp => {
                    if (resp) {
                        this.hrs = resp
                    }
                })
            },
            initRoles() {
                this.getRequest("/system/hr/roles").then(resp => {
                    if (resp) {
                        this.allRoles = resp
                    }
                })
            },
            updateHr(hr) {
                delete hr.roles;
                this.putRequest("/system/hr/", hr).then(resp => {
                    if (resp) {
                        this.initHr();
                    }
                })
            },
            deletehr(hr){
                console.log("id的值为："+hr.id)
                this.$confirm('确定删除【'+hr.name+'】吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/hr/"+hr.id).then(resp=>{
                        if (resp){
                            this.initHr()
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
            this.initHr()
        }
    }
</script>

<style>
    .userinfo-container div {
        font-size: 12px;
        color: black;
    }

    .userinfo-container {
        margin-top: 20px;
    }

    .hr-container {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .hr-card {
        width: 30%;
        margin-bottom: 20px;
    }

    .userface-img {
        width: 72px;
        height: 72px;
        border-radius: 72px;
    }
</style>