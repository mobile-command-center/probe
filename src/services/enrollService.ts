import { DynamoDB } from 'aws-sdk';
import EnrollmentDTO from '../model/EnrollmentDTO';
import { EnrollmentConnection, createEnrollmentInput, readEnrollmentInput, updateEnrollmentInput, deleteEnrollmentInput, getEnrollmentInput } from '../interfaces/EnrollmentInterface';
import EnrollmentBuilder from '../model/enrollmentBuilder';

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

class EnrollService {
    private static _instance: EnrollService;

    public static getInstance(): EnrollService {
        if(!this._instance) {
            this._instance = new EnrollService();
        }

        return this._instance;
    }

    public get(input: getEnrollmentInput): Promise<EnrollmentDTO> {
        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-enrollment`,
            Key: { 'EL_ID': input.EL_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    console.log(data);
                    resolve(data.Item as EnrollmentDTO);
                }
            });
        });
    }

    public read(input: readEnrollmentInput): Promise<EnrollmentConnection> {
        if(!input.before && !input.after) {
            return this.readFromPagination(input, null);
        }

        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-enrollment`,
            Key: { 'EL_ID': input.after || input.before }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    throw err;
                } else {
                    if(data.Item) {
                        this.readFromPagination(input, data.Item as EnrollmentDTO)
                            .then((result: EnrollmentConnection) => {
                                resolve(result);
                            });
                    } else {
                        const result = {
                            edges: [],
                            pageInfo: {
                                endCursor: null,
                                startCursor: null,
                            },
                            totalCount: 0
                        }
                        resolve(result);
                    }
                }
            });
        });
    }

    private readFromPagination(input: readEnrollmentInput, enrollmentDTO?: EnrollmentDTO): Promise<EnrollmentConnection>  {
        const params: QueryInput = {
            TableName: `${process.env.STAGE}-enrollment`,
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

        if(enrollmentDTO) {
            params.ExclusiveStartKey =  { 'EL_ID': enrollmentDTO.EL_ID, 'SORT': 0 };
        }

        return new Promise((resolve, reject) => {
            docClient.query(params, (err, data: QueryOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    if(data.ScannedCount < 1) {
                        const result = {
                            edges: [],
                            pageInfo: {
                                endCursor: null,
                                startCursor: null,
                            },
                            totalCount: 0
                        }
                        resolve(result);
                        return;
                    }

                    const result = {
                        edges: (input.first ? data.Items.reverse() : data.Items) as EnrollmentDTO[],
                        pageInfo: {
                            endCursor: data.ScannedCount ? data.Items[0].EL_ID : null,
                            startCursor: data.LastEvaluatedKey ? data.LastEvaluatedKey.EL_ID : data.ScannedCount ? data.Items[data.ScannedCount - 1].EL_ID : null,
                        },
                        totalCount: data.ScannedCount
                    };
                    return resolve(result);
                }
            });
        });
    }

    public create(input: createEnrollmentInput): Promise<EnrollmentDTO> {
        return new Promise((resolve, reject) => {
            this.read({ last: 1 } as readEnrollmentInput)
                .then(({pageInfo: {endCursor}}) => {
                    const enrollmentDTO = new EnrollmentBuilder()
                        .setEL_ID(endCursor++)
                        .setByCreateInput(input)
                        .build();
                   
                    const payload: PutItemInput = {
                        TableName: `${process.env.STAGE}-enrollment`,
                        Item: {
                            ...enrollmentDTO.getItem(),
                            'SORT': 0,  //날짜 정렬을 위한 GSI용
                        }
                    }
        
                    docClient.put(payload, (err, data: PutItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(enrollmentDTO);
                        }
                    });
                });
        });
    }

    public update(input: updateEnrollmentInput): Promise<EnrollmentDTO> {
        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-enrollment`,
            Key: { 'EL_ID': input.EL_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    const enrollmentDTO = new EnrollmentBuilder(data.Item as EnrollmentDTO)
                    .setByUpdateInput(input)
                    .build();

                    const payload: UpdateItemInput = {
                        TableName: `${process.env.STAGE}-enrollment`,
                        Key: {
                          'EL_ID' : enrollmentDTO.EL_ID
                        },
                        ExpressionAttributeNames: enrollmentDTO.getExpressionAttributeNames(),
                        UpdateExpression: enrollmentDTO.getUpdateExpression(),
                        ExpressionAttributeValues: enrollmentDTO.getExpressionAttributeValues()
                    }
    
                    docClient.update(payload, (err, data: UpdateItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(enrollmentDTO);
                        }
                    });
                }
            });
        });
    }

    public delete(input: deleteEnrollmentInput): Promise<EnrollmentDTO> {
        const params: GetItemInput | DeleteItemInput = {
            TableName: `${process.env.STAGE}-enrollment`,
            Key: { 'EL_ID': input.EL_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    const enrollmentDTO = data.Item as EnrollmentDTO;

                    docClient.delete(params, (err, data: DeleteItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(enrollmentDTO);
                        }
                    })
                }
            });
        });
    }
}

export default EnrollService;