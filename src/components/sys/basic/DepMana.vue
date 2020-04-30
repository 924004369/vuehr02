<template>
    <div style="width: 35%">
        <el-input
                placeholder="请输入部门信息进行搜索..."
                v-model="filterText"
                size="mini"
        prefix-icon="el-icon-search">
        </el-input>

        <el-tree
                class="filter-tree"
                :data="tree"
                :expand-on-click-node="false"
                :props="defaultProps"
                :filter-node-method="filterNode"
                ref="tree">
            <span class="custom-tree-node" style="display: flex;justify-content: space-between;width: 100%" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
                  type="primary"
                  size="mini"
                  class="depButton"
                  @click="() => showAddDepView(data)"
          >
            添加部门
          </el-button>
          <el-button
                  type="danger"
                  size="mini"
                  class="depButton"
                  @click="() => deleteDep( data)">
            删除部门
          </el-button>
        </span>
      </span>
        </el-tree>


        <el-dialog
                title="添加部门"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <div>
                    <el-tag type="success">上级部门</el-tag>
                    <span style="margin-left: 4px">{{pname}}</span>
                </div>
                <div style="margin-top: 8px">
                    <el-tag type="info">部门名称</el-tag>
                    <el-input v-model="dep.name" size="mini" style="width:70%;margin-left: 4px" placeholder="请输入部门名称..."></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDept">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "DepMana",
        data(){
            return{
                filterText:'',
                tree:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                dialogVisible:false,
                dep:{
                    name:'',
                    parentId:-1
                },
                pname:'',
            }
        },
        methods:{
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            initTree(){
                this.getRequest("/system/basic/depart/").then(resp=>{
                    if (resp){
                        this.tree=resp
                    }
                })
            },
            showAddDepView(data){
                this.pname=data.name;
                this.dep.parentId=data.id;
                this.dialogVisible = true
            },
            deleteDep(data){
                this.$confirm('是否删除【'+data.name+'】?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/depart/"+data.id).then(resp=>{
                        if (resp){
                            this.initTree()
                        }else {
                            this.$message.error(resp.msg())
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addDept(){
                this.postRequest("/system/basic/depart/",this.dep).then(resp=>{
                    if (resp){
                        this.dialogVisible=false;
                        this.dep.name=''
                        this.initTree()
                    }
                })
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        mounted() {
            this.initTree();
        }
    }
</script>

<style scoped>
 .depButton{
     padding: 2px;
 }
</style>