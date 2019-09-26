import { DynamoDB } from 'aws-sdk';
import { ConsultationInput, ConsultationConnection} from '../interfaces/ConsultationInterface';
import Consultation from '../model/Consultation';

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

    public read(first: number, after?: string): Promise<ConsultationConnection> {
        if(!after) {
            return this.readFromPagination(first);
        }

        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-consultation`,
            Key: { 'CONST_ID': after }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    throw err;
                } else {
                    this.readFromPagination(first, data.Item as ConsultationInput)
                        .then((result: ConsultationConnection) => {
                            resolve(result);
                        });
                }
            });
        });
    }

    private readFromPagination(limit: number, input?: ConsultationInput): Promise<ConsultationConnection>  {
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

        if(input) {
            params.ExclusiveStartKey =  { 'CONST_ID': input.CONST_ID, 'DATE': input.DATE, 'SORT': 0 };
        }

        return new Promise((resolve, reject) => {
            docClient.query(params, (err, data: QueryOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    const result = {
                        edges: data.Items as Consultation[],
                        pageInfo: {
                            endCursor: data.LastEvaluatedKey ? data.LastEvaluatedKey.CONST_ID : data.Items[data.Items.length-1].CONST_ID,
                            startCursor: data.Items[0].CONST_ID,
                            hasNextPage: !!data.LastEvaluatedKey,
                            hasPreviousPage: false
                        },
                        totalCount: data.Count
                    }
    
                    resolve(result);
                }
            });
        });
    }

    public create(input: ConsultationInput): Promise<Consultation> {
       const consultation = new Consultation(input);
       
        const payload: PutItemInput = {
            TableName: `${process.env.STAGE}-consultation`,
            Item: {
                'CONST_ID': consultation.CONST_ID,
                'DATE': consultation.DATE,
                'WRTR_ID': consultation.WRTR_ID,
                'WRTR_DATE': consultation.WRT_DATE,
                'EE_ID': consultation.EE_ID,
                'C_TEL': consultation.C_TEL,
                'MEMO': consultation.MEMO,
                'P_SUBSIDY_AMT': consultation.P_SUBSIDY_AMT,
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
                    console.log('success', consultation);
                    resolve(consultation);
                }
            })
        });
    }

    public update(input: ConsultationInput): Promise<Consultation> {
        const consultation = new Consultation(input);
       
        const payload: UpdateItemInput = {
            TableName: `${process.env.STAGE}-consultation`,
            Key: {
              'CONST_ID' : consultation.CONST_ID
            },
            UpdateExpression: 'set MEMO = :t',
            ExpressionAttributeValues: {
              ':t' : input.MEMO,
            }
        }

        return new Promise((resolve, reject) => {
            docClient.update(payload, (err, data: UpdateItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    console.log('success', consultation);
                    resolve(consultation);
                }
            })
        });
    }

    public delete(input: ConsultationInput): Promise<Consultation> {
        const consultation = new Consultation(input);
       
        const payload: DeleteItemInput = {
            TableName: `${process.env.STAGE}-consultation`,
            Key: {
              'CONST_ID' : consultation.CONST_ID
            },
        }

        return new Promise((resolve, reject) => {
            docClient.delete(payload, (err, data: DeleteItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    console.log('success', consultation);
                    resolve(consultation);
                }
            })
        });

    }
}

export default ConsultService;