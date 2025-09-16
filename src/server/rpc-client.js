const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// 加载用户服务的.proto定义
const userProtoPath = './src/server/user-service.proto';
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