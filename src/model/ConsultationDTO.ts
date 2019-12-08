import { ConsultationInterface } from '../interfaces/ConsultationInterface';
import ConsultationBuilder from './ConsultationBuilder';
import { ExpressionAttributeNameMap } from 'aws-sdk/clients/dynamodb';

export default class ConsultationDTO implements ConsultationInterface {
    public CONST_ID: number;
    public WRTR_ID: string;
    public DATE_REG: string;
    public DATE_MDF: string;
    public C_TEL: string;
    public MEMO: string;
    public ST: string;
    public P_SUBSIDY_AMT: string;
    public AVAL_INQUIRY_PASS: boolean;
    public PPSTY: string;

    constructor(builder: ConsultationBuilder) {
        this.CONST_ID = builder.CONST_ID;
        this.WRTR_ID = builder.WRTR_ID;
        this.DATE_REG = builder.DATE_REG;
        this.DATE_MDF = builder.DATE_MDF;
        this.C_TEL = builder.C_TEL;
        this.MEMO = builder.MEMO;
        this.ST = builder.ST;
        this.P_SUBSIDY_AMT = builder.P_SUBSIDY_AMT;
        this.AVAL_INQUIRY_PASS = builder.AVAL_INQUIRY_PASS;
        this.PPSTY = builder.PPSTY;
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

