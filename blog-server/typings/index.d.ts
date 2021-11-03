import 'egg';

declare module 'egg' {
    // Application 类型扩展
    interface Application {
        jwt:any;
        mysql: any;
    }
}