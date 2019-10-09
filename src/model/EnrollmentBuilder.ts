import EnrollmentDTO from './EnrollmentDTO';
import { createEnrollmentInput, ENROLL_STATE, updateEnrollmentInput } from '../interfaces/EnrollmentInterface';

type TypedString = string | undefined;
type TypedNumber = number | undefined;

export default class EnrollmentBuilder {
    private _elId: TypedNumber;
    private _date: TypedString;
    private _wrtrId: TypedString;
    private _wrtDate: TypedString;
    private _constId: TypedNumber;
    private _eeId: TypedString;
    private _aplId: TypedNumber;
    private _cpan: TypedString;
    private _prod: TypedString;
    private _st: ENROLL_STATE | undefined;
    private _giftAmt: TypedString;

    constructor(enrollmentDTO?: EnrollmentDTO) {
        if(enrollmentDTO) {
            this._elId = enrollmentDTO.EL_ID;
            this._date = enrollmentDTO.DATE;
            this._wrtrId = enrollmentDTO.WRTR_ID;
            this._wrtDate = enrollmentDTO.WRT_DATE;
            this._constId = enrollmentDTO.CONST_ID;
            this._eeId = enrollmentDTO.EE_ID;
            this._aplId = enrollmentDTO.APL_ID;
            this._cpan = enrollmentDTO.CPAN;
            this._prod = enrollmentDTO.PROD;
            this._st = enrollmentDTO.ST;
            this._giftAmt = enrollmentDTO.GIFT_AMT;
        }
    }

    public build(): EnrollmentDTO {
        return new EnrollmentDTO(this);
    }

    public setByCreateInput(input: createEnrollmentInput) {
        this._elId = this._elId || 1;
        this._date = input.DATE;
        this._wrtrId = input.WRTR_ID;
        this._wrtDate = new Date().toISOString();
        this._constId = input.CONST_ID;
        this._eeId = input.EE_ID;
        this._aplId = input.APL_ID;
        this._cpan = input.CPAN;
        this._prod = input.PROD;
        this._st = input.ST;
        this._giftAmt = input.GIFT_AMT;

        return this;
    }

    public setByUpdateInput(input: updateEnrollmentInput) {
        this._elId = input.EL_ID || this._elId;
        this._date = input.DATE || this._date; 
        this._wrtrId = input.WRTR_ID || this._wrtrId;
        this._wrtDate = new Date().toISOString();
        this._constId = input.CONST_ID || this._constId;
        this._eeId = input.EE_ID || this._eeId;
        this._aplId = input.APL_ID || this._aplId;
        this._cpan = input.CPAN || this._cpan;
        this._prod = input.PROD || this._prod;
        this._st = input.ST || this._st;
        this._giftAmt = input.GIFT_AMT || this._giftAmt;

        return this;
    }

    public setEL_ID(elid: number) {
        this._elId = elid;

        return this;
    }

    public get EL_ID(): TypedNumber {
        return this._elId;
    }

    public get DATE(): TypedString {
        return this._date;
    }

    public get WRTR_ID(): TypedString {
        return this._wrtrId;
    }

    public get WRT_DATE(): TypedString {
        return this._wrtDate;
    }
    
    public get CONST_ID(): TypedNumber {
        return this._constId;
    }

    public get EE_ID(): TypedString {
        return this._eeId;
    }

    public get APL_ID(): TypedNumber {
        return this._aplId;
    }

    public get CPAN(): TypedString {
        return this._cpan;
    }

    public get PROD(): TypedString {
        return this._prod;
    }

    public get ST(): ENROLL_STATE | undefined {
        return this._st;
    }

    public get GIFT_AMT(): TypedString {
        return this._giftAmt;
    }
}