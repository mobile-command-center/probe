import EnrollService from "../../services/EnrollService"
import { EnrollmentConnection, createEnrollmentInput, readEnrollmentInput, updateEnrollmentInput, deleteEnrollmentInput } from "../../interfaces/EnrollmentInterface";
import EnrollmentDTO from "../../model/EnrollmentDTO";

const resolvers = {
    Query: {
        readEnrollment: (_, {limit, input}:{limit: number, input?: readEnrollmentInput}): Promise<EnrollmentConnection> => {
            return EnrollService.getInstance().read(limit, input);
        }
    },
    Mutation: {
        createEnrollment: (_, {input}:{input: createEnrollmentInput}): Promise<EnrollmentDTO> => {
            return EnrollService.getInstance().create(input);
        },
        updateEnrollment: (_, {input}:{input: updateEnrollmentInput}): Promise<EnrollmentDTO> => {
            return EnrollService.getInstance().update(input);
        },
        deleteEnrollment: (_, {input}:{input: deleteEnrollmentInput}): Promise<EnrollmentDTO> => {
            return EnrollService.getInstance().delete(input);
        }
    }
};

export default resolvers;