import { DynamoDB } from 'aws-sdk';
import ApplicationDTO from '../model/ApplicationDTO';
import ApplicationBuilder from '../model/ApplicationBuilder';
import { ApplicationConnection, getApplicationInput, createApplicationInput, readApplicationInput, deleteApplicationInput, updateApplicationInput } from '../interfaces/ApplicationInterface';

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

class ApplicationService {
    private static _instance: ApplicationService;

    public static getInstance(): ApplicationService {
        if(!this._instance) {
            this._instance = new ApplicationService();
        }

        return this._instance;
    }

    public get(input: getApplicationInput): Promise<ApplicationDTO> {
        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-application`,
            Key: { 'APL_ID': input.APL_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    console.log(data);
                    resolve(data.Item as ApplicationDTO);
                }
            });
        });
    }


    public read(limit: number, input?:readApplicationInput): Promise<ApplicationConnection> {
        if(!input) {
            return this.readFromPagination(limit);
        }

        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-application`,
            Key: { 'APL_ID': input.APL_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    throw err;
                } else {
                    if(data.Item) {
                        this.readFromPagination(limit, data.Item as ApplicationDTO)
                            .then((result: ApplicationConnection) => {
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

    private readFromPagination(limit: number, applicationDTO?: ApplicationDTO): Promise<ApplicationConnection>  {
        const params: QueryInput = {
            TableName: `${process.env.STAGE}-application`,
            IndexName: 'SortDateGSI',
            ScanIndexForward: true,
            KeyConditionExpression: '#sort = :sort',
            ExpressionAttributeNames: {
                '#sort': 'SORT',
            },
            ExpressionAttributeValues: {
                ":sort": 0,
            },
            Limit: limit
        }

        if(applicationDTO) {
            params.ExclusiveStartKey =  { 'APL_ID': applicationDTO.APL_ID, 'DATE': applicationDTO.DATE, 'SORT': 0 };
        }

        console.log(params);

        return new Promise((resolve, reject) => {
            docClient.query(params, (err, data: QueryOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    console.log(data);
                    const result = {
                        edges: data.Items as ApplicationDTO[],
                        pageInfo: {
                            endCursor: data.LastEvaluatedKey ? data.LastEvaluatedKey.APL_ID : null,
                            startCursor: applicationDTO ? applicationDTO.APL_ID : null,
                            hasNextPage: !!data.LastEvaluatedKey,
                            hasPreviousPage: !!applicationDTO
                        },
                        totalCount: data.Count
                    }
    
                    resolve(result);
                }
            });
        });
    }

    public create(input: createApplicationInput): Promise<ApplicationDTO> {
       const applicationDTO = new ApplicationBuilder()
        .setByCreateInput(input)
        .build();
       
        const payload: PutItemInput = {
            TableName: `${process.env.STAGE}-application`,
            Item: {
                ...applicationDTO.getItem(),
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
                    resolve(applicationDTO);
                }
            })
        });
    }

    public update(input: updateApplicationInput): Promise<ApplicationDTO> {
        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-application`,
            Key: { 'APL_ID': input.APL_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    const applicationDTO = new ApplicationBuilder(data.Item as ApplicationDTO)
                    .setByUpdateInput(input)
                    .build();

                    const payload: UpdateItemInput = {
                        TableName: `${process.env.STAGE}-application`,
                        Key: {
                          'APL_ID' : applicationDTO.APL_ID
                        },
                        ExpressionAttributeNames: applicationDTO.getExpressionAttributeNames(),
                        UpdateExpression: applicationDTO.getUpdateExpression(),
                        ExpressionAttributeValues: applicationDTO.getExpressionAttributeValues()
                    }
    
                    docClient.update(payload, (err, data: UpdateItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(applicationDTO);
                        }
                    });
                }
            });
        });
    }

    public delete(input: deleteApplicationInput): Promise<ApplicationDTO> {
        const params: GetItemInput | DeleteItemInput = {
            TableName: `${process.env.STAGE}-application`,
            Key: { 'APL_ID': input.APL_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    const applicationDTO = data.Item as ApplicationDTO;

                    docClient.delete(params, (err, data: DeleteItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(applicationDTO);
                        }
                    })
                }
            });
        });
    }
}

export default ApplicationService;