const routers=[
    {
        path: '/',
        meta:{
            title:'Hello World'
        },
        component:(resolve)=>require(['./views/index.vue'],resolve)
    }
];
export default routers;