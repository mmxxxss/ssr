const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const userProtoPath = path.resolve(__dirname, 'user-service.proto');
const packageDefinition = protoLoader.loadSync(userProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const userService = grpc.loadPackageDefinition(packageDefinition).UserService;

const rpcClient = new userService(
    '8.130.87.194:3000',
    grpc.credentials.createInsecure()
);

exports.getUserInfo = (userId) => {
    return new Promise((resolve, reject) => {
        if (!userId) {
            return reject(new Error('用户ID不能为空'));
        }

        rpcClient.GetUserInfo({ user_id: parseInt(userId) }, (err, response) => {
            if (err) {
                // 提供更详细的错误信息
                return reject(new Error(`gRPC调用失败: ${err.message} (代码: ${err.code})`));
            }
            resolve(response);
        });
    });
};