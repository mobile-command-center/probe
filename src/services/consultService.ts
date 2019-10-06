import { DynamoDB } from 'aws-sdk';
import ConsultationDTO from '../model/ConsultationDTO';
import ConsultantationBuilder from '../model/ConsultationBuilder';
import { ConsultationConnection, createConsultationInput, readConsultationInput, deleteConsultationInput, updateConsultationInput, getConsultationInput } from '../interfaces/ConsultationInterface';

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

class ConsultService {
    private static _instance: ConsultService;

    public static getInstance(): ConsultService {
        if(!this._instance) {
            this._instance = new ConsultService();
        }

        return this._instance;
    }

    public get(input: getConsultationInput): Promise<ConsultationDTO> {
        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-consultation`,
            Key: { 'CONST_ID': input.CONST_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    console.log(data);
                    resolve(data.Item as ConsultationDTO);
                }
            });
        });
    }

    public read(input: readConsultationInput): Promise<ConsultationConnection> {
        if(!input.before && !input.after) {
            return this.readFromPagination(input, null);
        }

        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-consultation`,
            Key: { 'CONST_ID': input.after || input.before }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    throw err;
                } else {
                    if(data.Item) {
                        this.readFromPagination(input, data.Item as ConsultationDTO)
                            .then((result: ConsultationConnection) => {
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

    private readFromPagination(input: readConsultationInput, consultationDTO?: ConsultationDTO): Promise<ConsultationConnection>  {
        const params: QueryInput = {
            TableName: `${process.env.STAGE}-consultation`,
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

        if(consultationDTO) {
            params.ExclusiveStartKey =  { 'CONST_ID': consultationDTO.CONST_ID, 'SORT': 0 };
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
                                hasNextPage: false,
                                hasPreviousPage: false
                            },
                            totalCount: 0
                        }
                        resolve(result);
                        return;
                    }

                    if(input.first) {
                        console.log(data.Items);
                        const result = {
                            edges: data.Items as ConsultationDTO[],
                            pageInfo: {
                                endCursor: data.LastEvaluatedKey ? data.LastEvaluatedKey.CONST_ID : data.ScannedCount ? data.Items[data.ScannedCount - 1].CONST_ID : null,
                                startCursor: data.ScannedCount ? data.Items[0].CONST_ID : null,
                                hasNextPage: (data.ScannedCount === input.first),
                                hasPreviousPage: !!consultationDTO
                            },
                            totalCount: data.ScannedCount
                        };
                        return resolve(result);
                    }

                    if(input.last) {
                        const result = {
                            edges: data.Items as ConsultationDTO[],
                            pageInfo: {
                                endCursor: data.ScannedCount ? data.Items[0].CONST_ID : null,
                                startCursor: data.LastEvaluatedKey ? data.LastEvaluatedKey.CONST_ID : data.ScannedCount ? data.Items[data.ScannedCount - 1].CONST_ID : null,
                                hasNextPage: (data.ScannedCount === input.last),
                                hasPreviousPage: !!consultationDTO
                            },
                            totalCount: data.ScannedCount
                        };
                        return resolve(result);
                    }
                }
            });
        });
    }

    public create(input: createConsultationInput): Promise<ConsultationDTO> {
        return new Promise((resolve, reject) => {
            this.read({ last: 1 } as readConsultationInput)
                .then(({pageInfo: {endCursor}}) => {
                    const consultationDTO = new ConsultantationBuilder()
                        .setCONST_ID(++endCursor)
                        .setByCreateInput(input)
                        .build();

                    const payload: PutItemInput = {
                        TableName: `${process.env.STAGE}-consultation`,
                        Item: {
                            ...consultationDTO.getItem(),
                            'SORT': 0,  //날짜 정렬을 위한 GSI용
                        }
                    };

                    console.log(consultationDTO.getItem());

                    docClient.put(payload, (err, data: PutItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(consultationDTO);
                        }
                    })

                }); 
            });
    }

    public update(input: updateConsultationInput): Promise<ConsultationDTO> {
        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-consultation`,
            Key: { 'CONST_ID': input.CONST_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    const consultationDTO = new ConsultantationBuilder(data.Item as ConsultationDTO)
                    .setByUpdateInput(input)
                    .build();

                    const payload: UpdateItemInput = {
                        TableName: `${process.env.STAGE}-consultation`,
                        Key: {
                          'CONST_ID' : consultationDTO.CONST_ID
                        },
                        ExpressionAttributeNames: consultationDTO.getExpressionAttributeNames(),
                        UpdateExpression: consultationDTO.getUpdateExpression(),
                        ExpressionAttributeValues: consultationDTO.getExpressionAttributeValues()
                    }
    
                    docClient.update(payload, (err, data: UpdateItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(consultationDTO);
                        }
                    });
                }
            });
        });
    }

    public delete(input: deleteConsultationInput): Promise<ConsultationDTO> {
        const params: GetItemInput | DeleteItemInput = {
            TableName: `${process.env.STAGE}-consultation`,
            Key: { 'CONST_ID': input.CONST_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    const consultationDTO = data.Item as ConsultationDTO;

                    docClient.delete(params, (err, data: DeleteItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(consultationDTO);
                        }
                    })
                }
            });
        });
    }
}

export default ConsultService;