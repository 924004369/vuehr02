<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="部门管理" name="first"><DepMana></DepMana></el-tab-pane>
            <el-tab-pane label="职位管理" name="second"><PostMana></PostMana></el-tab-pane>
            <el-tab-pane label="职称管理" name="third"><JobLevelMana></JobLevelMana></el-tab-pane>
            <el-tab-pane label="奖惩规则" name="fourth"><BcMana></BcMana></el-tab-pane>
            <el-tab-pane label="权限组" name="fifth"><PermissMana></PermissMana></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import DepMana from '../../components/sys/basic/DepMana'
    import BcMana from '../../components/sys/basic/BcMana'
    import JobLevelMana from '../../components/sys/basic/JobLevelMana'
    import PermissMana from '../../components/sys/basic/PermissMana'
    import PostMana from '../../components/sys/basic/PostMana'
    export default {
        name: "SysBasic",
        data(){
            return{
                activeName:'second'
            }
        },
        components:{
            DepMana,
            BcMana,
            JobLevelMana,
            PermissMana,
            PostMana
        }
    }
</script>

<style scoped>

</style>