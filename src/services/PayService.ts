import { DynamoDB } from 'aws-sdk';
import PaymentDTO from '../model/PaymentDTO';
import { PaymentConnection, createPaymentInput, readPaymentInput, updatePaymentInput, deletePaymentInput } from '../interfaces/PaymentInterface';
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

    public read(limit: number, input?:readPaymentInput): Promise<PaymentConnection> {
        if(!input) {
            return this.readFromPagination(limit);
        }

        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-payment`,
            Key: { 'PYMT_ID': input.PYMT_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    throw err;
                } else {
                    if(data.Item) {
                        this.readFromPagination(limit, data.Item as PaymentDTO)
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

    private readFromPagination(limit: number, paymentDTO?: PaymentDTO): Promise<PaymentConnection>  {
        const params: QueryInput = {
            TableName: `${process.env.STAGE}-payment`,
            IndexName: 'SortDateGSI',
            ScanIndexForward: false,
            KeyConditionExpression: '#sort = :sort',
            ExpressionAttributeNames: {
                '#sort': 'SORT',
            },
            ExpressionAttributeValues: {
                ":sort": 0,
            },
            Limit: limit
        }

        if(paymentDTO) {
            params.ExclusiveStartKey =  { 'PYMT_ID': paymentDTO.PYMT_ID, 'DATE': paymentDTO.DATE, 'SORT': 0 };
        }

        return new Promise((resolve, reject) => {
            docClient.query(params, (err, data: QueryOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    const result = {
                        edges: data.Items as PaymentDTO[],
                        pageInfo: {
                            endCursor: data.LastEvaluatedKey ? data.LastEvaluatedKey.PYMT_ID : null,
                            startCursor: data.Items.length > 0 ? data.Items[0].PYMT_ID : null,
                            hasNextPage: !!data.LastEvaluatedKey,
                            hasPreviousPage: false // @TODO 이부분도 작업이 필요함
                        },
                        totalCount: data.Count
                    }
    
                    resolve(result);
                }
            });
        });
    }

    public create(input: createPaymentInput): Promise<PaymentDTO> {
       const paymentDTO = new PaymentBuilder()
        .setByCreateInput(input)
        .build();
       
        const payload: PutItemInput = {
            TableName: `${process.env.STAGE}-payment`,
            Item: {
                ...paymentDTO.getItem(),
                'SORT': 0,  //날짜 정렬을 위한 GSI용
            }
        }

        return new Promise((resolve, reject) => {
            docClient.put(payload, (err, data: PutItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    resolve(paymentDTO);
                }
            })
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