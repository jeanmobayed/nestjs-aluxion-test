import { EmailOptionsInterface } from "../email/interfaces/email-options.interface";

const { EMAIL_USER, EMAIL_PASSWORD, EMAIL_SERVICE } = process.env;

export default {
    validationSchema: {
        EMAIL_USER,
        EMAIL_PASSWORD,
        EMAIL_SERVICE
    }
} as EmailOptionsInterface;
