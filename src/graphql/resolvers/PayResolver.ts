import { PaymentConnection, getPaymentInput, createPaymentInput, readPaymentInput, updatePaymentInput, deletePaymentInput, searchPaymentInput } from "../../interfaces/PaymentInterface";
import PaymentDTO from "../../model/PaymentDTO";
import PayService from "../../services/PayService";

const resolvers = {
    Query: {
        getPayment: (_, {input}:{input: getPaymentInput}): Promise<PaymentDTO> => {
            return PayService.getInstance().get(input);
        },
        readPayment: (_, {input}:{input: readPaymentInput}): Promise<PaymentConnection> => {
            return PayService.getInstance().read(input);
        },
        searchPayment: (_, {input}: {input: searchPaymentInput}): Promise<PaymentConnection> => {
            return PayService.getInstance().search(input);
        }
    },
    Mutation: {
        createPayment: (_, {input}:{input: createPaymentInput}): Promise<PaymentDTO> => {
            return PayService.getInstance().create(input);
        },
        updatePayment: (_, {input}:{input: updatePaymentInput}): Promise<PaymentDTO> => {
            return PayService.getInstance().update(input);
        },
        deletePayment: (_, {input}:{input: deletePaymentInput}): Promise<PaymentDTO> => {
            return PayService.getInstance().delete(input);
        }
    }
};

export default resolvers;