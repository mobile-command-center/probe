import MemoDTO from './MemoDTO';
import { createMemoInput, updateMemoInput } from '../interfaces/MemoInterface';

type TypedString = string | undefined;
type TypedNumber = number | undefined;

export default class MemoBuilder {
    private _memoId: TypedNumber;
    private _wrtrId: TypedString;
    private _constId: TypedNumber;
    private _dateReg: TypedString;
    private _dateMdf: TypedString;
    private _dateMemo: TypedString;
    private _content: TypedString;
    private _ppsty: TypedString;
    private _st: TypedString;

    constructor(memoDTO?: MemoDTO) {
        if(memoDTO) {
            this._memoId = memoDTO.MEMO_ID;
            this._wrtrId = memoDTO.WRTR_ID;
            this._constId = memoDTO.CONST_ID;
            this._dateReg = memoDTO.DATE_REG;
            this._dateMdf = memoDTO.DATE_MDF;
            this._dateMemo = memoDTO.DATE_MEMO;
            this._content = memoDTO.CONTENT;
            this._ppsty = memoDTO.P_SUBSIDY_AMT;
            this._st = memoDTO.ST;
        }
    }

    public build(): MemoDTO {
        return new MemoDTO(this);
    }

    public setByCreateInput(input: createMemoInput) {
        this._memoId = this._memoId || 1;
        this._wrtrId = input.WRTR_ID;
        this._constId = input.CONST_ID;
        this._dateReg = new Date().toISOString();
        this._dateMdf = new Date().toISOString();
        this._dateMemo = input.DATE_MEMO;
        this._content = input.CONTENT;
        this._ppsty = input.P_SUBSIDY_AMT;
        this._st = input.ST;
        
        return this;
    }

    public setByUpdateInput(input: updateMemoInput) {
        this._memoId = input.MEMO_ID || this._memoId;
        this._wrtrId = input.WRTR_ID || this._wrtrId;
        this._constId = input.CONST_ID || this._constId;
        this._dateReg = input.DATE_REG || this._dateReg; 
        this._dateMdf = new Date().toISOString();
        this._dateMemo = input.DATE_MEMO || this._dateMemo;
        this._content = input.CONTENT || this._content;
        this._ppsty = input.P_SUBSIDY_AMT || this._ppsty;
        this._st = input.ST || this._st;

        return this;
    }

    public setMemoId(memoId: number)  {
        this._memoId = memoId;

        return this;
    }

    public get MEMO_ID(): TypedNumber {
        return this._memoId;
    }

    public get WRTR_ID(): TypedString {
        return this._wrtrId;
    }

    public get CONST_ID(): TypedNumber {
        return this._constId;
    }

    public get DATE_REG(): TypedString {
        return this._dateReg;
    }

    public get DATE_MDF(): TypedString {
        return this._dateMdf;
    }

    public get DATE_MEMO(): TypedString {
        return this._dateMemo;
    }

    public get CONTENT(): TypedString {
        return this._content;
    }

    public get P_SUBSIDY_AMT(): TypedString {
        return this._ppsty;
    }

    public get ST(): TypedString {
        return this._st;
    }
}