<style lang="less" scoped>
.fullscreen{
    height: 100vh;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    img{
        width: 100%
    }
    .ivu-row-flex{
        height: 100%;
    }
}
</style>
<template>
    <div class="fullscreen">
        <Row type="flex" justify="center" align="middle">
            <Col span="2">
                <p>
                    <img src="../images/logo.png" alt="">
                </p>
                <p>
                    <Button type="primary" @click="visiable=!visiable" long>Try Now</Button>
                </p>
            </Col>
        </Row>
        <Modal v-model="visiable"
        :title="title">
        <p>{{$t('i18n_support')}}:vue-i18n</p>
        <p>{{$t('ui_support')}}:iView</p>
        <p>{{$t('data_bind_support')}}:vue</p>
        </Modal>
    </div>
</template >
<script>
export default {
    data:function(){
        return {
            hello:"Hello World",
            visiable:false,
            title:"I18N Support"
        }
    },
    methods:{
    }
}
</script>