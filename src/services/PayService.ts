import { DynamoDB } from 'aws-sdk';
import PaymentDTO from '../model/PaymentDTO';
import { PaymentConnection, createPaymentInput, readPaymentInput, updatePaymentInput, deletePaymentInput, getPaymentInput } from '../interfaces/PaymentInterface';
import PaymentBuilder from '../model/PaymentBuilder';

type UpdateItemInput = DynamoDB.DocumentClient.UpdateItemInput;
type DeleteItemInput = DynamoDB.DocumentClient.DeleteItemInput;
type PutItemInput = DynamoDB.DocumentClient.PutItemInput;
type QueryInput = DynamoDB.DocumentClient.QueryInput;
type GetItemInput = DynamoDB.DocumentClient.GetItemInput;

type UpdateItemOutput = DynamoDB.DocumentClient.UpdateItemOutput;
type DeleteItemOutput = DynamoDB.DocumentClient.DeleteItemOutput;
type PutItemOutput = DynamoDB.DocumentClient.PutItemOutput;
type QueryOutput = DynamoDB.DocumentClient.QueryOutput;
type GetItemOutput = DynamoDB.DocumentClient.GetItemOutput;

const docClient = new DynamoDB.DocumentClient();

// DocumentClinet 사용 예제
// https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html

class PayService {
    private static _instance: PayService;

    public static getInstance(): PayService {
        if(!this._instance) {
            this._instance = new PayService();
        }

        return this._instance;
    }

    public get(input: getPaymentInput): Promise<PaymentDTO> {
        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-payment`,
            Key: { 'PYMT_ID': input.PYMT_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    console.log(data);
                    resolve(data.Item as PaymentDTO);
                }
            });
        });
    }

    public read(input: readPaymentInput): Promise<PaymentConnection> {
        if(!input.before && !input.after) {
            return this.readFromPagination(input, null);
        }

        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-payment`,
            Key: { 'PYMT_ID': input.after || input.before }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    throw err;
                } else {
                    if(data.Item) {
                        this.readFromPagination(input, data.Item as PaymentDTO)
                            .then((result: PaymentConnection) => {
                                resolve(result);
                            });
                    } else {
                        const result = {
                            edges: [],
                            pageInfo: {
                                endCursor: null,
                                startCursor: null,
                                hasNextPage: false,
                                hasPreviousPage: false
                            },
                            totalCount: 0
                        }
                        resolve(result);
                    }
                }
            });
        });
    }

    private readFromPagination(input: readPaymentInput, paymentDTO?: PaymentDTO): Promise<PaymentConnection>  {
        const params: QueryInput = {
            TableName: `${process.env.STAGE}-payment`,
            IndexName: 'SortIDGSI',
            ScanIndexForward: !!input.first || !input.last,
            KeyConditionExpression: '#sort = :sort',
            ExpressionAttributeNames: {
                '#sort': 'SORT',
            },
            ExpressionAttributeValues: {
                ":sort": 0,
            },
            Limit: input.first || input.last
        }

        if(paymentDTO) {
            params.ExclusiveStartKey =  { 'PYMT_ID': paymentDTO.PYMT_ID, 'SORT': 0 };
        }

        return new Promise((resolve, reject) => {
            docClient.query(params, (err, data: QueryOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    if(input.first) {
                        const result = {
                            edges: data.Items as PaymentDTO[],
                            pageInfo: {
                                endCursor: data.LastEvaluatedKey ? data.LastEvaluatedKey.PYMT_ID : data.ScannedCount ? data.Items[data.ScannedCount - 1].PYMT_ID : null,
                                startCursor: data.ScannedCount ? data.Items[0].PYMT_ID : null,
                                hasNextPage: (data.ScannedCount === input.first),
                                hasPreviousPage: !!paymentDTO
                            },
                            totalCount: data.ScannedCount
                        };
                        return resolve(result);
                    }

                    if(input.last) {
                        const result = {
                            edges: data.Items as PaymentDTO[],
                            pageInfo: {
                                endCursor: data.ScannedCount ? data.Items[0].PYMT_ID : null,
                                startCursor: data.LastEvaluatedKey ? data.LastEvaluatedKey.PYMT_ID : data.ScannedCount ? data.Items[data.ScannedCount - 1].PYMT_ID : null,
                                hasNextPage: (data.ScannedCount === input.last),
                                hasPreviousPage: !!paymentDTO
                            },
                            totalCount: data.ScannedCount
                        };
                        return resolve(result);
                    }
                }
            });
        });
    }

    public create(input: createPaymentInput): Promise<PaymentDTO> {
        return new Promise((resolve, reject) => {
            this.read({ last: 1 } as readPaymentInput)
                .then(({pageInfo: {endCursor}}) => {
                    const paymentDTO = new PaymentBuilder()
                        .setPYMT_ID(endCursor++)
                        .setByCreateInput(input)
                        .build();
                    
                     const payload: PutItemInput = {
                         TableName: `${process.env.STAGE}-payment`,
                         Item: {
                             ...paymentDTO.getItem(),
                             'SORT': 0,  //날짜 정렬을 위한 GSI용
                         }
                     }
        
                    docClient.put(payload, (err, data: PutItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(paymentDTO);
                        }
                    });
                });
        });
    }

    public update(input: updatePaymentInput): Promise<PaymentDTO> {
        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-payment`,
            Key: { 'PYMT_ID': input.PYMT_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    const paymentDTO = new PaymentBuilder(data.Item as PaymentDTO)
                    .setByUpdateInput(input)
                    .build();

                    const payload: UpdateItemInput = {
                        TableName: `${process.env.STAGE}-payment`,
                        Key: {
                          'PYMT_ID' : paymentDTO.PYMT_ID
                        },
                        ExpressionAttributeNames: paymentDTO.getExpressionAttributeNames(),
                        UpdateExpression: paymentDTO.getUpdateExpression(),
                        ExpressionAttributeValues: paymentDTO.getExpressionAttributeValues()
                    }
    
                    docClient.update(payload, (err, data: UpdateItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(paymentDTO);
                        }
                    });
                }
            });
        });
    }

    public delete(input: deletePaymentInput): Promise<PaymentDTO> {
        const params: GetItemInput | DeleteItemInput = {
            TableName: `${process.env.STAGE}-payment`,
            Key: { 'PYMT_ID': input.PYMT_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    const paymentDTO = data.Item as PaymentDTO;

                    docClient.delete(params, (err, data: DeleteItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(paymentDTO);
                        }
                    })
                }
            });
        });
    }
}

export default PayService;