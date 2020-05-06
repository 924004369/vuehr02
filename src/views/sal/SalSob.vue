<template>
    <div>
        <div style="display: flex;justify-content: space-between">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="dialogVisible=true">添加套账</el-button>
            <el-button type="success" icon="el-icon-refresh" size="mini"></el-button>
        </div>

        <div style="margin-top: 5px">
            <el-table
                    size="mini"
                    :data="salary"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="账套名称"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="basicsalary"
                        label="基本工资"
                        align="center"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="trafficsalary"
                        label="交通补助"
                        align="center"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="lunchsalary"
                        label="午餐补助"
                        align="center"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="bonus"
                        label="奖金"
                        align="center"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="createdate"
                        label="启用时间"
                        align="center"
                        width="90">
                </el-table-column>

                <el-table-column
                        prop="date"
                        label="养老金"
                        align="center"
                        width="150">
                    <el-table-column
                            prop="pensionper"
                            label="比率"
                            align="center"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="pensionbase"
                            label="基数"
                            align="center"
                            width="80">
                    </el-table-column>
                </el-table-column>

                <el-table-column
                        prop="date"
                        label="医疗保险"
                        align="center"
                        width="150">
                    <el-table-column
                            prop="medicalper"
                            label="比率"
                            align="center"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="medicalbase"
                            label="基数"
                            align="center"
                            width="80">
                    </el-table-column>
                </el-table-column>

                <el-table-column
                        prop="date"
                        label="公积金"
                        align="center"
                        width="150">
                    <el-table-column
                            prop="accumulationfundper"
                            label="比率"
                            align="center"
                            width="90">
                    </el-table-column>
                    <el-table-column
                            prop="accumulationfundbase"
                            label="基数"
                            align="center"
                            width="90">
                    </el-table-column>
                </el-table-column>

                <el-table-column
                        prop="date"
                        label="操作"
                        align="center"
                        width="150">
                    <template>
                        <el-button size="mini" type="primary">编辑</el-button>
                        <el-button size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog
                    title="添加工资账套"
                    :visible.sync="dialogVisible"
                    width="30%">
                <div style="display: flex ;justify-content: space-around;align-items: center">
                    <div style="height: 300px;">
                        <el-steps direction="vertical" :active="active">
                            <el-step :title="item" v-for="(item,index) in salaryItemName" :key="index"></el-step>
                        </el-steps>
                        <el-button style="margin-top: 12px;" size="mini" @click="pre" v-show="flag">{{active==10?
                            '取消':'上一步'}}
                        </el-button>
                        <el-button style="margin-top: 12px;" size="mini" @click="next">{{active==10 ? '完成':'下一步'}}
                        </el-button>
                    </div>

                    <div>
                        <el-input v-model="salaryItem[title]" size="mini" v-for="(value,title,index) in salaryItem"
                                  :key="index"
                                  :placeholder="'请输入'+salaryItemName[index]+'...'" v-show="active==index"></el-input>
                    </div>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SalSob",
        data() {
            return {
                salary: [],
                dialogVisible: false,
                active: 0,
                salaryItemName: [
                    '基本工资',
                    '交通补助',
                    '午餐补助',
                    '奖金',
                    '养老金比率',
                    '养老金基数',
                    '医疗金比率',
                    '医疗金基数',
                    '公积金比率',
                    '公积金基数',
                    '账套名称'
                ],
                salaryItem: {
                    basicsalary: 0,
                    trafficsalary: 0,
                    lunchsalary: 0,
                    bonus: 0,
                    pensionper: 0,
                    pensionbase: 0,
                    medicalper: 0,
                    medicalbase: 0,
                    accumulationfundper: 0,
                    accumulationfundbase: 0,
                    name: ''
                },
                flag: false
            }
        },
        methods: {
            initTable() {
                this.getRequest("/sal/").then(resp => {
                    if (resp) {
                        this.salary = resp
                    }
                })
            },
            next() {

                if (this.active == 10) {
                    this.postRequest("/sal/", this.salaryItem).then(resp => {
                        if (resp) {
                            this.initTable()
                        }
                    })
                    return;
                }
                this.active++;
                if (this.active > 10) {
                    this.flag = true
                }
            },
            pre() {
                if (this.active == 0) {
                    return;
                } else if (this.active == 10) {
                    this.dialogVisible = false;
                    this.active = 1;
                    this.flag = false
                }
                this.active--;
                if (this.active == 0) {
                    this.flag = false
                    return;
                }
            }
        },
        mounted() {
            this.initTable();
        }
    }
</script>

<style scoped>

</style>