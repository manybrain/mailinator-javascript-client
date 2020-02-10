export const ENV_DELETE_DOMAIN: string = "MAILINATOR_TEST_DELETE_DOMAIN";
export const ENV_API_TOKEN: string = "MAILINATOR_TEST_API_TOKEN";
export const ENV_DOMAIN_PRIVATE: string = "MAILINATOR_TEST_DOMAIN_PRIVATE";
export const ENV_INBOX_TEST: string = "MAILINATOR_TEST_INBOX";
export const ENV_MESSAGE_WITH_ATTACHMENT_ID: string = "MAILINATOR_TEST_MESSAGE_WITH_ATTACHMENT_ID";
export const ENV_ATTACHMENT_ID: string = "MAILINATOR_TEST_ATTACHMENT_ID";
export const ENV_PHONE_NUMBER: string = "MAILINATOR_TEST_PHONE_NUMBER";

let apiToken: string;
let phoneNumber: string;
let messageWithAttachmentId: string;
let inboxTest: string;
let privateDomain: string;
let attachmentId: number;

export const getApiToken = () => {
    if (apiToken === undefined) {
        const val = process.env[ENV_API_TOKEN];
        if (val === undefined) {
            throw new Error(`env variable ${ENV_API_TOKEN} not declared`);
        }
        apiToken = val;
    }
    return apiToken;
};

export const getPrivateDomain = () => {
    if (privateDomain === undefined) {
        const val = process.env[ENV_DOMAIN_PRIVATE];
        if (val === undefined) {
            throw new Error(`env variable ${ENV_DOMAIN_PRIVATE} not declared`);
        }
        privateDomain = val;
    }
    return privateDomain;
};

export const getInboxTest = () => {
    if (inboxTest === undefined) {
        const val = process.env[ENV_INBOX_TEST];
        if (val === undefined) {
            throw new Error(`env variable ${ENV_INBOX_TEST} not declared`);
        }
        inboxTest = val;
    }
    return inboxTest;
};

export const getPhoneNumber = () => {
    if (phoneNumber === undefined) {
        const val = process.env[ENV_PHONE_NUMBER];
        if (val === undefined) {
            throw new Error(`env variable ${ENV_PHONE_NUMBER} not declared`);
        }
        phoneNumber = val;
    }
    return phoneNumber;
};

export const getMessageWithAttachmentId = () => {
    if (messageWithAttachmentId === undefined) {
        const val = process.env[ENV_MESSAGE_WITH_ATTACHMENT_ID];
        if (val === undefined) {
            throw new Error(`env variable ${ENV_MESSAGE_WITH_ATTACHMENT_ID} not declared`);
        }
        messageWithAttachmentId = val;
    }
    return messageWithAttachmentId;
};

export const getAttachmentId = () => {
    if (attachmentId === undefined) {
        const val = process.env[ENV_ATTACHMENT_ID];
        if (val === undefined) {
            throw new Error(`env variable ${ENV_ATTACHMENT_ID} not declared`);
        }
        attachmentId = Number(val);
    }
    return attachmentId;
};