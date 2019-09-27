import EnrollService from "../../services/enrollService"
import { EnrollmentInput, EnrollmentConnection } from "../../interfaces/EnrollmentInterface";
import Enrollment from "../../model/Enrollment";

const resolvers = {
    Query: {
        readEnrollment: (_, {limit, elId}:{limit: number, elId?: string}): Promise<EnrollmentConnection> => {
            return EnrollService.getInstance().read(limit, elId);
        }
    },
    Mutation: {
        createEnrollment: (_, {input}:{input: EnrollmentInput}): Promise<Enrollment> => {
            return EnrollService.getInstance().create(input);
        },
        updateEnrollment: (_, {input}:{input: EnrollmentInput}): Promise<Enrollment> => {
            return EnrollService.getInstance().update(input);
        },
        deleteEnrollment: (_, {input}:{input: EnrollmentInput}): Promise<Enrollment> => {
            return EnrollService.getInstance().delete(input);
        }
    }
};

export default resolvers;