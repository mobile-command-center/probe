import { DynamoDB } from 'aws-sdk';
import ConsultationDTO from '../model/ConsultationDTO';
import ConsultantationBuilder from '../model/ConsultationBuilder';
import { ConsultationConnection, createConsultationInput, readConsultationInput, deleteConsultationInput, updateConsultationInput } from '../interfaces/ConsultationInterface';

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

    public read(limit: number, input?:readConsultationInput): Promise<ConsultationConnection> {
        if(!input) {
            return this.readFromPagination(limit);
        }

        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-consultation`,
            Key: { 'CONST_ID': input.CONST_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    throw err;
                } else {
                    this.readFromPagination(limit, data.Item as ConsultationDTO)
                        .then((result: ConsultationConnection) => {
                            resolve(result);
                        });
                }
            });
        });
    }

    private readFromPagination(limit: number, consultationDTO?: ConsultationDTO): Promise<ConsultationConnection>  {
        const params: QueryInput = {
            TableName: `${process.env.STAGE}-consultation`,
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

        if(consultationDTO) {
            params.ExclusiveStartKey =  { 'CONST_ID': consultationDTO.CONST_ID, 'DATE': consultationDTO.DATE, 'SORT': 0 };
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
                        edges: data.Items as ConsultationDTO[],
                        pageInfo: {
                            endCursor: data.LastEvaluatedKey ? data.LastEvaluatedKey.CONST_ID : null,
                            startCursor: data.Items.length > 0 ? data.Items[0].CONST_ID : null,
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

    public create(input: createConsultationInput): Promise<ConsultationDTO> {
       const consultationDTO = new ConsultantationBuilder()
        .setByCreateInput(input)
        .build();
       
        const payload: PutItemInput = {
            TableName: `${process.env.STAGE}-consultation`,
            Item: {
                ...consultationDTO.getItem(),
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
                    resolve(consultationDTO);
                }
            })
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