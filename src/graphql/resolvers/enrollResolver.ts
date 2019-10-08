import EnrollService from "../../services/EnrollService"
import { EnrollmentConnection, getEnrollmentInput, createEnrollmentInput, readEnrollmentInput, updateEnrollmentInput, deleteEnrollmentInput, searchEnrollmentInput } from "../../interfaces/EnrollmentInterface";
import EnrollmentDTO from "../../model/EnrollmentDTO";

const resolvers = {
    Query: {
        getEnrollment: (_, {input}:{input: getEnrollmentInput}): Promise<EnrollmentDTO> => {
            return EnrollService.getInstance().get(input);
        },
        readEnrollment: (_, {input}:{input: readEnrollmentInput}): Promise<EnrollmentConnection> => {
            return EnrollService.getInstance().read(input);
        },
        searchEnrollment: (_, {input}: {input: searchEnrollmentInput}): Promise<EnrollmentConnection> => {
            return EnrollService.getInstance().search(input);
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