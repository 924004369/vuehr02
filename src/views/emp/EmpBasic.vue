<template>
    <div>
        <div >
            <div style="display: flex; justify-content: space-between">
                <div>
                    <el-input prefix-icon="el-icon-search" size="mini" style="width: 300px"
                              placeholder="通过员工名搜索员工，记得回车"
                              @keydown.enter.native="initEmp"
                              v-model="name"></el-input>
                    <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 4px" @click="initEmp">
                        搜索
                    </el-button>
                    <el-button type="primary" size="mini"><i class="fa fa-angle-double-down" aria-hidden="true"></i>高级搜索
                    </el-button>
                </div>

                <div>
                    <el-button style="margin-right: 2px" type="success" size="mini" icon="el-icon-download" @click="exportData">导出数据</el-button>

                    <el-upload style="display: inline-flex"
                               action="/emp/basic/import"
                               :show-file-list="false"
                               :on-success="onsuccess">
                        <el-button type="success" icon="el-icon-upload2" size="mini">导入数据
                        </el-button>
                    </el-upload>


                    <el-button style="margin-left: 2px" type="primary" size="mini" icon="el-icon-plus" @click="getMaxWorkId"> 添加员工
                    </el-button>

                </div>
            </div>
            <!--<div style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 5px 0px;margin: 10px 0px;">-->

            <!--</div>-->
        </div>

        <div style="margin-top: 4px">

            <el-table
                    v-loading="loading"
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                    :data="emps"
                    stripe
                    height="450"
                    border
                    size="mini"
                    style="width: 90%">
                <el-table-column
                        fixed
                        type="selection"
                        width="30">
                </el-table-column>
                <el-table-column
                        align="center"
                        fixed
                        prop="name"
                        label="姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="workid"
                        label="工号"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="gender"
                        label="性别"
                        width="80">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="birthday"
                        label="出生日期"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="idCard"
                        label="身份证号码"
                        width="250">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="wedlock"
                        label="婚姻状况"
                        width="80">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="nation.name"
                        label="民族"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="nativeplace"
                        label="籍贯"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="address"
                        label="联系地址"
                        width="220">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="politicsStatus.name"
                        label="政治面貌"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="email"
                        label="电子邮件"
                        width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="phone"
                        label="电话"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="department.name"
                        label="部门"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="jobLevel.name"
                        label="职称等级"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="position.name"
                        label="职位"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="engageform"
                        label="聘用形式"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="tiptopdegree"
                        label="最高学历"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="specialty"
                        label="专业"
                        width="140">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="school"
                        label="毕业院校"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="begindate"
                        label="入职日期"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="workstate"
                        label="是否在职"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="合同年限"
                        width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.contractterm}}</span>年
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="conversiontime"
                        label="转正日期"
                        width="120">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="begincontract"
                        label="合同起始日期"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="endcontract"
                        label="合同结束日期"
                        width="120">
                </el-table-column>

                <el-table-column
                        align="center"
                        fixed="right"
                        label="操作"
                        width="220">
                    <template slot-scope="scope">
                        <el-button style="padding: 5px" size="mini" type="primary" @click="editEmp(scope.row)">编辑
                        </el-button>
                        <el-button style="padding: 5px" size="mini" @click="handleClick(scope.row)" type="primary">
                            查看高级资料
                        </el-button>
                        <el-button style="padding: 5px" size="mini" type="danger" @click="deleteEmpById(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="mini" :disabled="this.multipleSelection.length==0" @click="doDeleteMany">
                批量删除
            </el-button>

            <div style="display: flex;flex-direction: row-reverse">
                <el-pagination
                        background
                        layout="sizes, prev, pager, next, jumper"
                        :total="total"
                        @size-change="sizeChange"
                        @current-change="currentChange">
                </el-pagination>
            </div>

            <el-dialog style=""
                       title="添加员工"
                       :visible.sync="dialogVisible"
                       width="80%"
                       height="40%">
                <div>

                    <el-form :rules="rules" ref="addemp" :model="form" label-width="110px"
                             style="display: flex;justify-content: space-between">
                        <div>
                            <el-form-item label="姓名:" prop="name">
                                <el-input v-model="form.name" prefix-icon="el-icon-edit" placeholder="请输入员工姓名"
                                          size="mini" style="width: 140px"></el-input>
                            </el-form-item>
                            <el-form-item label="民族:" prop="nationid">
                                <el-select size="mini" style="width: 140px" v-model="form.nationid "
                                           placeholder="请选择民族">
                                    <el-option
                                            v-for="item in nations"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="职位:" prop="joblevelid">
                                <el-select size="mini" style="width: 140px" v-model="form.joblevelid"
                                           placeholder="请选择职位">
                                    <el-option
                                            v-for="item in jobLevels"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="工号:">
                                <el-input disabled v-model="form.workid" size="mini" style="width: 140px"></el-input>
                            </el-form-item>
                            <el-form-item label="入职日期:" prop="begindate">
                                <el-date-picker

                                        size="mini"
                                        style="width: 140px"
                                        v-model="form.begindate"
                                        type="date"
                                        placeholder="入职日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="身份证号码:" prop="idCard">
                                <el-input prefix-icon="el-icon-edit" placeholder="请输入员工身份证号码..." v-model="form.idCard"
                                          size="mini" style="width: 140px"></el-input>
                            </el-form-item>
                        </div>

                        <div>
                            <el-form-item label="性别:" prop="gender">
                                <el-radio v-model="form.gender" label="男">男</el-radio>
                                <el-radio v-model="form.gender" label="女">女</el-radio>
                            </el-form-item>
                            <el-form-item label="籍贯:" prop="nativeplace">
                                <el-input v-model="form.nativeplace" placeholder="籍贯..." size="mini"
                                          style="width: 140px"></el-input>
                            </el-form-item>
                            <el-form-item label="职称:" prop="posid">
                                <el-select size="mini" style="width: 140px" v-model="form.posid" placeholder="请选择职称">
                                    <el-option
                                            v-for="item in positions"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="学历:" prop="tiptopdegree">
                                <el-select size="mini" style="width: 140px" v-model="form.tiptopdegree"
                                           placeholder="请选择学历">
                                    <el-option
                                            v-for="item in degrees"
                                            :key="item.value"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="转正日期:" prop="conversiontime">
                                <el-date-picker
                                        size="mini"
                                        style="width: 140px"
                                        v-model="form.conversiontime"
                                        type="date"
                                        placeholder="转正日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="聘用方式:" prop="engageform">
                                <el-radio v-model="form.engageform" label="劳动合同">劳动合同</el-radio>
                                <el-radio v-model="form.engageform" label="劳务合同">劳务合同</el-radio>
                            </el-form-item>
                        </div>

                        <div>
                            <el-form-item label="出生日期:" prop="birthday">
                                <el-date-picker
                                        size="mini"
                                        style="width: 140px"
                                        v-model="form.birthday"
                                        type="date"
                                        placeholder="出生日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="电子邮箱:" prop="email">
                                <el-input v-model="form.email" prefix-icon="el-icon-sunny" size="mini"
                                          placeholder="电子邮箱..." style="width: 140px"></el-input>
                            </el-form-item>
                            <el-form-item label="所属部门:" prop="departmentid">
                                <el-select size="mini" style="width: 140px" v-model="form.departmentid"
                                           placeholder="请选择部门">
                                    <el-option
                                            v-for="item in departments"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="毕业院校:" prop="school">
                                <el-input v-model="form.school" size="mini" prefix-icon="el-icon-edit"
                                          placeholder="所属院校名称..." style="width: 140px"></el-input>
                            </el-form-item>
                            <el-form-item label="合同起始日期:" prop="begincontract">
                                <el-date-picker
                                        size="mini"
                                        style="width: 140px"
                                        v-model="form.begincontract"
                                        type="date"
                                        placeholder="合同起始日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="婚姻状况:" prop="wedlock">
                                <el-radio v-model="form.wedlock" label="已婚">已婚</el-radio>
                                <el-radio v-model="form.wedlock" label="未婚">未婚</el-radio>
                                <el-radio v-model="form.wedlock" label="离异">离异</el-radio>
                            </el-form-item>
                        </div>

                        <div>
                            <el-form-item label="政治面貌:" prop="politicid">
                                <el-select size="mini" style="width: 140px" v-model="form.politicid"
                                           placeholder="请选择政治面貌">
                                    <el-option
                                            v-for="item in politicsStatuss"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="联系地址:" prop="address">
                                <el-input v-model="form.address" prefix-icon="el-icon-edit" size="mini"
                                          placeholder="联系地址..." style="width: 140px"></el-input>
                            </el-form-item>

                            <el-form-item label="电话号码:" prop="phone">
                                <el-input v-model="form.phone" prefix-icon="el-icon-phone" size="mini"
                                          placeholder="电话号码..." style="width: 140px"></el-input>
                            </el-form-item>

                            <el-form-item label="专业名称:" prop="specialty">
                                <el-input v-model="form.specialty" prefix-icon="el-icon-edit" size="mini"
                                          placeholder="专业名称..." style="width: 140px"></el-input>
                            </el-form-item>

                            <el-form-item label="合同终止日期:" prop="endcontract">
                                <el-date-picker
                                        size="mini"
                                        style="width: 140px"
                                        v-model="form.endcontract"
                                        type="date"
                                        placeholder="合同终止日期">
                                </el-date-picker>
                            </el-form-item>


                        </div>
                    </el-form>

                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addEmp()">确 定</el-button>
                  </span>
            </el-dialog>


            <el-dialog style=""
                       title="编辑员工"
                       :visible.sync="dialogVisible1"
                       width="80%"
                       height="40%">
                <div>

                    <el-form :rules="rules" ref="addemp" :model="emp" label-width="110px"
                             style="display: flex;justify-content: space-between">
                        <div>
                            <el-form-item label="姓名:" prop="name">
                                <el-input v-model="emp.name" prefix-icon="el-icon-edit" placeholder="请输入员工姓名"
                                          size="mini" style="width: 140px"></el-input>
                            </el-form-item>
                            <el-form-item label="民族:" prop="nationid">
                                <el-select size="mini" style="width: 140px" v-model="emp.nationid "
                                           placeholder="请选择民族">
                                    <el-option
                                            v-for="item in nations"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="职位:" prop="joblevelid">
                                <el-select size="mini" style="width: 140px" v-model="emp.joblevelid"
                                           placeholder="请选择职位">
                                    <el-option
                                            v-for="item in jobLevels"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="工号:">
                                <el-input disabled v-model="emp.workid" size="mini" style="width: 140px"></el-input>
                            </el-form-item>
                            <el-form-item label="入职日期:" prop="begindate">
                                <el-date-picker

                                        size="mini"
                                        style="width: 140px"
                                        v-model="emp.begindate"
                                        type="date"
                                        placeholder="入职日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="身份证号码:" prop="idCard">
                                <el-input prefix-icon="el-icon-edit" placeholder="请输入员工身份证号码..." v-model="emp.idCard"
                                          size="mini" style="width: 140px"></el-input>
                            </el-form-item>
                        </div>

                        <div>
                            <el-form-item label="性别:" prop="gender">
                                <el-radio v-model="emp.gender" label="男">男</el-radio>
                                <el-radio v-model="emp.gender" label="女">女</el-radio>
                            </el-form-item>
                            <el-form-item label="籍贯:" prop="nativeplace">
                                <el-input v-model="emp.nativeplace" placeholder="籍贯..." size="mini"
                                          style="width: 140px"></el-input>
                            </el-form-item>
                            <el-form-item label="职称:" prop="posid">
                                <el-select size="mini" style="width: 140px" v-model="emp.posid" placeholder="请选择职称">
                                    <el-option
                                            v-for="item in positions"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="学历:" prop="tiptopdegree">
                                <el-select size="mini" style="width: 140px" v-model="emp.tiptopdegree"
                                           placeholder="请选择学历">
                                    <el-option
                                            v-for="item in degrees"
                                            :key="item.value"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="转正日期:" prop="conversiontime">
                                <el-date-picker
                                        size="mini"
                                        style="width: 140px"
                                        v-model="emp.conversiontime"
                                        type="date"
                                        placeholder="转正日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="聘用方式:" prop="engageform">
                                <el-radio v-model="emp.engageform" label="劳动合同">劳动合同</el-radio>
                                <el-radio v-model="emp.engageform" label="劳务合同">劳务合同</el-radio>
                            </el-form-item>
                        </div>

                        <div>
                            <el-form-item label="出生日期:" prop="birthday">
                                <el-date-picker
                                        size="mini"
                                        style="width: 140px"
                                        v-model="emp.birthday"
                                        type="date"
                                        placeholder="出生日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="电子邮箱:" prop="email">
                                <el-input v-model="emp.email" prefix-icon="el-icon-sunny" size="mini"
                                          placeholder="电子邮箱..." style="width: 140px"></el-input>
                            </el-form-item>
                            <el-form-item label="所属部门:" prop="departmentid">
                                <el-select size="mini" style="width: 140px" v-model="emp.departmentid"
                                           placeholder="请选择部门">
                                    <el-option
                                            v-for="item in departments"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="毕业院校:" prop="school">
                                <el-input v-model="emp.school" size="mini" prefix-icon="el-icon-edit"
                                          placeholder="所属院校名称..." style="width: 140px"></el-input>
                            </el-form-item>
                            <el-form-item label="合同起始日期:" prop="begincontract">
                                <el-date-picker
                                        size="mini"
                                        style="width: 140px"
                                        v-model="emp.begincontract"
                                        type="date"
                                        placeholder="合同起始日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="婚姻状况:" prop="wedlock">
                                <el-radio v-model="emp.wedlock" label="已婚">已婚</el-radio>
                                <el-radio v-model="emp.wedlock" label="未婚">未婚</el-radio>
                                <el-radio v-model="emp.wedlock" label="离异">离异</el-radio>
                            </el-form-item>
                        </div>

                        <div>
                            <el-form-item label="政治面貌:" prop="politicid">
                                <el-select size="mini" style="width: 140px" v-model="emp.politicid"
                                           placeholder="请选择政治面貌">
                                    <el-option
                                            v-for="item in politicsStatuss"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="联系地址:" prop="address">
                                <el-input v-model="emp.address" prefix-icon="el-icon-edit" size="mini"
                                          placeholder="联系地址..." style="width: 140px"></el-input>
                            </el-form-item>

                            <el-form-item label="电话号码:" prop="phone">
                                <el-input v-model="emp.phone" prefix-icon="el-icon-phone" size="mini"
                                          placeholder="电话号码..." style="width: 140px"></el-input>
                            </el-form-item>

                            <el-form-item label="专业名称:" prop="specialty">
                                <el-input v-model="emp.specialty" prefix-icon="el-icon-edit" size="mini"
                                          placeholder="专业名称..." style="width: 140px"></el-input>
                            </el-form-item>

                            <el-form-item label="合同终止日期:" prop="endcontract">
                                <el-date-picker
                                        size="mini"
                                        style="width: 140px"
                                        v-model="emp.endcontract"
                                        type="date"
                                        placeholder="合同终止日期">
                                </el-date-picker>
                            </el-form-item>


                        </div>
                    </el-form>

                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="doEdit()">确 定</el-button>
                  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EmpBasic",
        data() {
            return {
                multipleSelection: [],
                form: {
                    name: '',
                    gender: '',
                    birthday: '',
                    idCard: '',
                    wedlock: '',
                    nationid: '',
                    nativeplace: '',
                    politicid: '',
                    email: '',
                    phone: '',
                    address: '',
                    departmentid: '',
                    joblevelid: '',
                    posid: '',
                    engageform: '',
                    tiptopdegree: '',
                    specialty: '',
                    school: '',
                    begindate: '',
                    workstate: '',
                    workid: '',
                    contractterm: '',
                    conversiontime: '',
                    notworkdate: null,
                    begincontract: '',
                    endcontract: '',
                    workage: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入名字', trigger: 'blur'}
                    ],
                    gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
                    birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
                    idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur'}, {
                        pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                        message: '身份证格式不正确',
                        trigger: 'blur'
                    }],
                    wedlock: [{required: true, message: '请输入婚姻状况', trigger: 'change'}],
                    nativeplace: [{required: true, message: '请输入户籍', trigger: 'change'}],
                    politicid: [{required: true, message: '请输入政治面貌', trigger: 'change'}],
                    email: [{required: true, message: '请输入邮箱', trigger: 'blur'}, {
                        type: 'email',
                        message: '邮箱格式不正确',
                        trigger: 'blur'
                    }],
                    phone: [{required: true, message: '请输入手机号码', trigger: 'blur'},
                        {
                            pattern:/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
                            message:'手机号码格式不正确',
                            trigger:"blur"
                        }],
                    address: [{required: true, message: '请输入所在地址', trigger: 'blur'}],
                    departmentid: [{required: true, message: '请输入部门', trigger: 'change'}],
                    joblevelid: [{required: true, message: '请输入职位', trigger: 'change'}],
                    posid: [{required: true, message: '请输入职称', trigger: 'change'}],
                    engageform: [{required: true, message: '请输入聘用类型', trigger: 'change'}],
                    tiptopdegree: [{required: true, message: '请输入学历', trigger: 'change'}],
                    specialty: [{required: true, message: '请输入专业', trigger: 'blur'}],
                    school: [{required: true, message: '请输入毕业院校', trigger: 'blur'}],
                    begindate: [{required: true, message: '请输入入职日期', trigger: 'blur'}],
                    workstate: [{required: true, message: '请输入是否在职', trigger: 'blur'}],
                    workid: [{required: true, message: '请输入工号', trigger: 'blur'}],
                    contractterm: [{required: true, message: '请输入工作年限', trigger: 'blur'}],
                    conversiontime: [{required: true, message: '请输入转正日期', trigger: 'blur'}],
                    notworkdate: [{required: true, message: '请输入离职日期', trigger: 'blur'}],
                    begincontract: [{required: true, message: '请输入合同起始日期', trigger: 'blur'}],
                    endcontract: [{required: true, message: '请输入终止日期', trigger: 'blur'}],
                    nationid: [{required: true, message: '请选择民族', trigger: 'change'}],
                },
                dialogVisible: false,
                dialogVisible1: false,
                name: '',
                emps: [],
                loading: false,
                total: '',
                page: 1,
                size: 10,
                nations: [],
                jobLevels: [],
                politicsStatuss: [],
                positions: [],
                departments: [],
                degrees: ['博士', '硕士', '本科', '大专', '高中', '初中', '小学', '其他'],
                emp: {
                    name: '',
                    gender: '',
                    birthday: '',
                    idCard: '',
                    wedlock: '',
                    nationid: '',
                    nativeplace: '',
                    politicid: '',
                    email: '',
                    phone: '',
                    address: '',
                    departmentid: '',
                    joblevelid: '',
                    posid: '',
                    engageform: '',
                    tiptopdegree: '',
                    specialty: '',
                    school: '',
                    begindate: '',
                    workstate: '',
                    workid: '',
                    contractterm: '',
                    conversiontime: '',
                    notworkdate: null,
                    begincontract: '',
                    endcontract: '',
                    workage: '',
                }
            }
        },
        methods: {
            initEmp() {
                this.loading = true
                this.getRequest("/emp/basic/?page=" + this.page + "&size=" + this.size + "&keywords=" + this.name).then(resp => {
                    this.loading = false
                    if (resp) {
                        this.emps = resp.data;
                        this.total = resp.total
                    }
                })
            },
            handleClick() {

            },
            currentChange(currentPage) {
                this.page = currentPage;
                this.initEmp()
            },
            sizeChange(currentSize) {
                this.size = currentSize;
                this.initEmp()
            },
            deleteEmpById(row) {
                this.$confirm('确定要删除【' + row.name + '】吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/emp/basic/" + row.id).then(resp => {
                        if (resp) {
                            this.initEmp();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            initNation() {
                this.getRequest("/emp/basic/nation").then(resp => {
                    if (resp) {
                        this.nations = resp
                    }
                })
            },
            initJobLevel() {
                this.getRequest("/emp/basic/jobLevel").then(resp => {
                    if (resp) {
                        this.jobLevels = resp
                    }
                })
            },
            initPoliticsStatuss() {
                this.getRequest("/emp/basic/politics").then(resp => {
                    if (resp) {
                        this.politicsStatuss = resp;
                    }
                })
            },
            initPos() {
                this.getRequest("/emp/basic/position").then(resp => {
                    if (resp) {
                        this.positions = resp;
                    }
                })
            },
            initDep() {
                this.getRequest("/emp/basic/dep").then(resp => {
                    if (resp) {
                        this.departments = resp
                    }
                })
            },
            getMaxWorkId() {
                this.dialogVisible = true
                this.getRequest("/emp/basic/workid").then(resp => {
                    if (resp) {
                        this.form.workid = resp;
                    }
                })
            },
            addEmp() {
                this.$refs['addemp'].validate(valid => {
                    if (valid) {
                        this.postRequest("/emp/basic/", this.form).then(resp => {
                            if (resp) {
                                this.dialogVisible = false;
                                this.initEmp()
                            }
                        })
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            doDeleteMany() {
                this.$confirm('此操作将永久删除【' + this.multipleSelection.length + '】条数据，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += "ids=" + item.id + '&'
                    })
                    this.deleteRequest("/emp/basic/delMany" + ids).then(resp => {
                        if (resp) {
                            this.initEmp();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            editEmp(row) {
                this.dialogVisible1 = true;
                this.emp = row
                console.log(this.emp)
            },
            doEdit() {
                this.$refs['addemp'].validate(valid => {
                    if (valid) {
                        this.putRequest("/emp/basic/updateEmp", this.emp).then(resp => {
                            if (resp) {
                                this.dialogVisible1 = false
                                this.initEmp()
                            }
                        })
                    }
                })
            },
            onsuccess(){
              this.initEmp();
              this.$message({
                  message:'上传成功',
                  type:'success'
              })
            },
            exportData(){
                window.open('/emp/basic/export','_parent');
            }

        },
        mounted() {
            this.initEmp();
            this.initNation();
            this.initJobLevel();
            this.initPoliticsStatuss();
            this.initPos();
            this.initDep();
        }
    }
</script>

<style scoped>

</style>