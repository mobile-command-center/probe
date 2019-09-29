import { v4 as uuid} from 'uuid';
import ApplicationDTO from './ApplicationDTO';
import { createApplicationInput, updateApplicationInput } from '../interfaces/ApplicationInterface';

type TypedString = string | undefined;

export default class ApplicationBuilder {
    
    private _aplId: TypedString;
    private _date: TypedString;
    private _wrtrId: TypedString;
    private _wrtDate: TypedString;
    private _ua: TypedString;
    private _frmData: TypedString;

    constructor(applicationDTO?: ApplicationDTO) {
        if(applicationDTO) {
            this._aplId = applicationDTO.APL_ID;
            this._date = applicationDTO.DATE;
            this._wrtrId = applicationDTO.WRTR_ID;
            this._wrtDate = applicationDTO.WRT_DATE;
            this._ua = applicationDTO.UA;
            this._frmData = applicationDTO.FRM_DATA;
        }
    }

    public build(): ApplicationDTO {
        return new ApplicationDTO(this);
    }

    public setByCreateInput(input: createApplicationInput) {
        this._aplId = uuid();
        this._date = input.DATE;
        this._wrtrId = input.WRTR_ID;
        this._wrtDate = new Date().toISOString();
        this._ua = input.UA;
        this._frmData = input.FRM_DATA;

        return this;
    }

    public setByUpdateInput(input: updateApplicationInput) {
        this._aplId = input.APL_ID || this._aplId;
        this._date = input.DATE || this._date; 
        this._wrtrId = input.WRTR_ID || this._wrtrId;
        this._wrtDate = new Date().toISOString();
        this._ua = input.UA || this._ua;
        this._frmData = input.FRM_DATA || this._frmData;

        return this;
    }

    public get APL_ID(): TypedString {
        return this._aplId;
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

    public get UA(): TypedString {
        return this._ua;
    }

    public get FRM_DATA(): TypedString {
        return this._frmData;
    }
}