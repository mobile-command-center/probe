import { DynamoDB } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const docClient = new DynamoDB.DocumentClient();

class HelloService {
    private static _instance: HelloService;

    public static getInstance(): HelloService {
        if(!this._instance) {
            this._instance = new HelloService();
        }

        return this._instance;
    }

    public hello(): Promise<string> {  
        const payload = {
            TableName: `${process.env.STAGE}-hello`,
            Item: {
                "id": uuid()
            }
        }

        return new Promise((resolve, reject) => {
            docClient.put(payload, (err, data) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    resolve('success');
                }
            })
        });
    }
}

export default HelloService;