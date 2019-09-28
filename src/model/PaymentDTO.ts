import { PaymentInterface, PAY_STATE } from '../interfaces/PaymentInterface';
import PaymentBuilder from './paymentBuilder';
import { ExpressionAttributeNameMap } from 'aws-sdk/clients/dynamodb';

export default class PaymentDTO implements PaymentInterface {
    public PYMT_ID: string;
    public DATE: string;
    public EE_ID: string;
    public PAY_TYPE: string; // @TODO enum으로 뺴야 하지 않을까?
    public PAY_AMT: number;
    public WRTR_ID: string;
    public WRT_DATE: string;
    public ST: PAY_STATE;
    public CONST_ID: string;
    public EL_ID: string;

    constructor(builder: PaymentBuilder) {
        // @TODO 없는 값들은 기본값을 어디서 무엇으로 할지 결정 필요

        this.PYMT_ID = builder.PYMT_ID;
        this.DATE = builder.DATE;
        this.EE_ID = builder.EE_ID;
        this.PAY_TYPE = builder.PAY_TYPE;
        this.PAY_AMT = builder.PAY_AMT;
        this.WRTR_ID = builder.WRTR_ID;
        this.WRT_DATE = builder.WRT_DATE;
        this.ST = builder.ST;
        this.CONST_ID = builder.CONST_ID;
        this.EL_ID = builder.EL_ID;
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
        .filter(([key, val]) => (val !== undefined && key !== 'PYMT_ID'))
        .reduce((result, [key, val]) => {
            result[`#${key}`] = key;

            return result;
        }, {});
    }

    public getUpdateExpression(): string {
        return `SET ${Object.entries(this)
            .filter(([key, val]) => (val !== undefined && key !== 'PYMT_ID'))
            .map(([key, val]) => `#${key} = :${key}`)
            .join(', ')}`;
    }

    public getExpressionAttributeValues(): object {
        return Object.entries(this)
            .filter(([key, val]) => (val !== undefined && key !== 'PYMT_ID'))
            .reduce((result, [key, val]) => {
                result[`:${key}`] = val;

                return result;
            }, {});
    }
}
