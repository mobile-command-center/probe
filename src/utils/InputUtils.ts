import { searchConsultationInput } from "../interfaces/ConsultationInterface";
import { ExpressionAttributeNameMap } from "aws-sdk/clients/dynamodb";
import CastingUtils from "./CastingUtils";
import { SearchInput } from "../interfaces/CommonInterface";

class InputUtils {
    public static getFilterExpression<T extends SearchInput>(input: T) {
        // export interface ConsultationFilter {
        //     ne: String
        //     eq: String
        //     le: String
        //     lt: String
        //     ge: String
        //     gt: String
        //     contains: String
        //     notContains: String
        //     between: [String]
        //     beginsWith: String
        // }

        return Object.entries(input.filter)
        .map(([key, filters]) => {
            return Object.entries(filters)
                .map(([filterKey, filterValue]) => {
                    switch(filterKey) {
                        case 'ne':
                            return `#${key} <> :${key}`;
                        case 'eq':
                            return `#${key} = :${key}`;
                        case 'le':
                            return `#${key} <= :${key}`;
                        case 'lt':
                            return `#${key} < :${key}`;
                        case 'ge':
                            return `#${key} >= :${key}`;
                        case 'gt':
                            return `#${key} > :${key}`;
                        case 'contains':
                            return `contains(#${key}, :${key})`;
                        case 'notContains':
                            return `notContains(#${key}, :${key})`;
                        case 'between':
                            return `#${key} between :${filterValue[0]} and :${filterValue[1]}`; //@TODO 고정값으로 해야 하나...
                        case 'beginsWith':
                            return `begins_with(#${key}, :${key})`;
                    }
                })
                .join(' or ');
        })
        .join(' or ');
    }

    public static getExpressionAttributeNames<T extends SearchInput>(input: T): ExpressionAttributeNameMap {
        return Object.entries(input.filter)
        .reduce((result, [key, val]) => {
            result[`#${key}`] = key;

            return result;
        }, {});
    }

    public static getExpressionAttributeValues<T extends SearchInput>(input: T): object {
        return Object.entries(input.filter)
        .reduce((result, [key, filters]) => {
            result[`:${key}`] = Object.entries(filters).reduce((result2, [filterKey, filterValue] : [string, string]) => {
                return [
                    ...result2,
                    CastingUtils.checkStringNumber(filterValue) ? parseInt(filterValue, 10) : filterValue
                ];
            }, [])[0];

            return result;
        }, {});
    }
}

export default InputUtils;