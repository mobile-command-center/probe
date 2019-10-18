import PaymentDTO from './PaymentDTO';
import { createPaymentInput, PAY_STATE, updatePaymentInput } from '../interfaces/PaymentInterface';

type TypedString = string | undefined;
type TypedNumber = number | undefined;

export default class PaymentBuilder {
    private _pymtId: TypedNumber;
    private _scheDate: string;
    private _compDate: string;
    private _eeId: TypedString;
    private _payType: TypedString;
    private _payAmt: TypedString;
    private _wrtrId: TypedString;
    private _wrtDate: TypedString;
    private _st: PAY_STATE | undefined;
    private _elId: TypedNumber;

    constructor(paymentDTO?: PaymentDTO) {
        if(paymentDTO) {
            this._pymtId = paymentDTO.PYMT_ID;
            this._scheDate = paymentDTO.SCHE_DATE;
            this._compDate = paymentDTO.COMP_DATE;
            this._eeId = paymentDTO.EE_ID;
            this._payType = paymentDTO.PAY_TYPE;
            this._payAmt = paymentDTO.PAY_AMT;
            this._wrtrId = paymentDTO.WRTR_ID;
            this._wrtDate = paymentDTO.WRT_DATE;
            this._st = paymentDTO.ST;
            this._elId = paymentDTO.EL_ID;
        }
    }

    public build(): PaymentDTO {
        return new PaymentDTO(this);
    }

    public setByCreateInput(input: createPaymentInput) {
        this._pymtId = this._pymtId || 1;
        this._scheDate = input.SCHE_DATE;
        this._compDate = input.COMP_DATE;
        this._eeId = input.EE_ID;
        this._payType = input.PAY_TYPE;
        this._payAmt = input.PAY_AMT;
        this._wrtrId = input.WRTR_ID;
        this._wrtDate = new Date().toISOString();
        this._st = input.ST;
        this._elId = input.EL_ID;

        return this;
    }

    public setByUpdateInput(input: updatePaymentInput) {
        this._pymtId = input.PYMT_ID || this._pymtId;
        this._scheDate = input.SCHE_DATE || this._scheDate;
        this._compDate = input.COMP_DATE || this._compDate;
        this._eeId = input.EE_ID || this._eeId;
        this._payType = input.PAY_TYPE || this._payType;
        this._payAmt = input.PAY_AMT || this._payAmt;
        this._wrtrId = input.WRTR_ID || this._wrtrId;
        this._wrtDate = new Date().toISOString();
        this._st = input.ST || this._st;
        this._elId = input.EL_ID || this._elId;

        return this;
    }

    public setPYMT_ID(pymtId: number) {
        this._pymtId = pymtId;

        return this;
    }

    public get PYMT_ID(): TypedNumber {
        return this._pymtId;
    }

    public get SCHE_DATE(): TypedString {
        return this._scheDate;
    }

    public get COMP_DATE(): TypedString {
        return this._compDate;
    }

    public get EE_ID(): TypedString {
        return this._eeId;
    }

    public get PAY_TYPE(): TypedString {
        return this._payType;
    }

    public get PAY_AMT(): TypedString {
        return this._payAmt;
    }

    public get WRTR_ID(): TypedString {
        return this._wrtrId;
    }

    public get WRT_DATE(): TypedString {
        return this._wrtDate;
    }

    public get ST(): PAY_STATE | undefined {
        return this._st;
    }

    public get EL_ID(): TypedNumber {
        return this._elId;
    }

}