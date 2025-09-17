const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
// 加载用户服务的.proto定义
// 使用path.resolve确保在不同环境下都能正确找到.proto文件
const userProtoPath = path.resolve(__dirname, 'user-service.proto');
const packageDefinition = protoLoader.loadSync(userProtoPath);
const userService = grpc.loadPackageDefinition(packageDefinition).UserService;
// 创建RPC客户端
const rpcClient = new userService(
    '8.130.87.194:3000',  // 远程RPC服务地址
    grpc.credentials.createInsecure()
);
// 封装获取用户信息的RPC调用
exports.getUserInfo = (userId) => {
    return new Promise((resolve, reject) => {
        rpcClient.GetUserInfo({ user_id: userId }, (err, response) => {
            if (err) reject(err);
            else resolve(response);  // 返回RPC获取的用户数据
        });
    });
};