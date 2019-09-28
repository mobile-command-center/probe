import { ConsultationInterface } from '../interfaces/ConsultationInterface';
import ConsultationBuilder from './ConsultationBuilder';
import { ExpressionAttributeNameMap } from 'aws-sdk/clients/dynamodb';

export default class ConsultationDTO implements ConsultationInterface {
    public CONST_ID: string;
    public DATE: string;
    public WRTR_ID: string;
    public WRT_DATE: string;
    public EE_ID: string;
    public C_TEL: string;
    public MEMO: string;
    public P_SUBSIDY_AMT: string;

    constructor(builder: ConsultationBuilder) {
        this.CONST_ID = builder.CONST_ID;
        this.DATE = builder.DATE;
        this.WRTR_ID = builder.WRTR_ID;
        this.WRT_DATE = builder.WRT_DATE;
        this.EE_ID = builder.EE_ID;
        this.C_TEL = builder.C_TEL;
        this.MEMO = builder.MEMO;
        this.P_SUBSIDY_AMT = builder.P_SUBSIDY_AMT;
    }

    public getItem(): object {
        return Object.entries(this)
            .filter(([key, val]) => (val !== undefined))
            .reduce((result, [key, val]) => {
                result[key] = val;

                return result;
            }, {});
    }

    public getExpressionAttributeNames(): ExpressionAttributeNameMap {
        return Object.entries(this)
        .filter(([key, val]) => (val !== undefined && key !== 'CONST_ID'))
        .reduce((result, [key, val]) => {
            result[`#${key}`] = key;

            return result;
        }, {});
    }

    public getUpdateExpression(): string {
        return `SET ${Object.entries(this)
            .filter(([key, val]) => (val !== undefined && key !== 'CONST_ID'))
            .map(([key, val]) => `#${key} = :${key}`)
            .join(', ')}`;
    }

    public getExpressionAttributeValues(): object {
        return Object.entries(this)
            .filter(([key, val]) => (val !== undefined && key !== 'CONST_ID'))
            .reduce((result, [key, val]) => {
                result[`:${key}`] = val;

                return result;
            }, {});
    }
}

