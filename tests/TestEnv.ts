export const ENV_DELETE_DOMAIN: string = "MAILINATOR_TEST_DELETE_DOMAIN";
export const ENV_API_TOKEN: string = "MAILINATOR_TEST_API_TOKEN";
export const ENV_DOMAIN_PRIVATE: string = "MAILINATOR_TEST_DOMAIN_PRIVATE";
export const ENV_INBOX_TEST: string = "MAILINATOR_TEST_INBOX_TEST";
export const ENV_MESSAGE_WITH_ATTACHMENT_ID: string = "MAILINATOR_TEST_MESSAGE_WITH_ATTACHMENT_ID";
export const ENV_ATTACHMENT_ID: string = "MAILINATOR_TEST_ATTACHMENT_ID";
export const ENV_PHONE_NUMBER: string = "MAILINATOR_TEST_PHONE_NUMBER";
export const ENV_WEBHOOKTOKEN_PRIVATEDOMAIN: string = "MAILINATOR_TEST_WEBHOOKTOKEN_PRIVATEDOMAIN";
export const ENV_WEBHOOKTOKEN_CUSTOMSERVICE: string = "MAILINATOR_TEST_WEBHOOKTOKEN_CUSTOMSERVICE";
export const ENV_AUTH_SECRET: string = "MAILINATOR_TEST_AUTH_SECRET";
export const ENV_AUTH_ID: string = "MAILINATOR_TEST_AUTH_ID";
export const ENV_WEBHOOK_INBOX: string = "MAILINATOR_TEST_WEBHOOK_INBOX";
export const ENV_WEBHOOK_CUSTOMSERVICE: string = "MAILINATOR_TEST_WEBHOOK_CUSTOMSERVICE";

let apiToken: string;
let phoneNumber: string;
let messageWithAttachmentId: string;
let inboxTest: string;
let privateDomain: string;
let deleteDomain: string;
let attachmentId: number;
let webhookTokenPrivateDomain: string;
let webhookTokenCustomService: string;
let authSecret: string;
let authId: string;
let webhookInbox: string;
let webhookCustomService: string;

export const getApiToken = () => {
    if (apiToken === undefined) {
        const val = process.env[ENV_API_TOKEN] ?? ENV_API_TOKEN;
        if (val === undefined) {
            throw new Error(`env variable ${ENV_API_TOKEN} not declared`);
        }
        apiToken = val;
    }
    return apiToken;
};

export const getPrivateDomain = () => {
    if (privateDomain === undefined) {
        const val = process.env[ENV_DOMAIN_PRIVATE] ?? ENV_DOMAIN_PRIVATE;
        if (val === undefined) {
            throw new Error(`env variable ${ENV_DOMAIN_PRIVATE} not declared`);
        }
        privateDomain = val;
    }
    return privateDomain;
};

export const getDeleteDomain = () => {
    if (deleteDomain === undefined) {
        const val = process.env[ENV_DELETE_DOMAIN] ?? ENV_DELETE_DOMAIN;
        if (val === undefined) {
            throw new Error(`env variable ${ENV_DELETE_DOMAIN} not declared`);
        }
        deleteDomain = val;
    }
    return deleteDomain;
};

export const getInboxTest = () => {
    if (inboxTest === undefined) {
        const val = process.env[ENV_INBOX_TEST] ?? ENV_INBOX_TEST;
        if (val === undefined) {
            throw new Error(`env variable ${ENV_INBOX_TEST} not declared`);
        }
        inboxTest = val;
    }
    return inboxTest;
};

export const getPhoneNumber = () => {
    if (phoneNumber === undefined) {
        const val = process.env[ENV_PHONE_NUMBER] ?? ENV_PHONE_NUMBER;
        if (val === undefined) {
            throw new Error(`env variable ${ENV_PHONE_NUMBER} not declared`);
        }
        phoneNumber = val;
    }
    return phoneNumber;
};

export const getMessageWithAttachmentId = () => {
    if (messageWithAttachmentId === undefined) {
        const val = process.env[ENV_MESSAGE_WITH_ATTACHMENT_ID] ?? ENV_MESSAGE_WITH_ATTACHMENT_ID;
        if (val === undefined) {
            throw new Error(`env variable ${ENV_MESSAGE_WITH_ATTACHMENT_ID} not declared`);
        }
        messageWithAttachmentId = val;
    }
    return messageWithAttachmentId;
};

export const getAttachmentId = () => {
    if (attachmentId === undefined) {
        const val = process.env[ENV_ATTACHMENT_ID] ?? ENV_ATTACHMENT_ID;
        if (val === undefined) {
            throw new Error(`env variable ${ENV_ATTACHMENT_ID} not declared`);
        }
        attachmentId = Number(val);
    }
    return attachmentId;
};

export const getWebhookTokenCustomService = () => {
    if (webhookTokenCustomService === undefined) {
        const val = process.env[ENV_WEBHOOKTOKEN_CUSTOMSERVICE] ?? ENV_WEBHOOKTOKEN_CUSTOMSERVICE;
        if (val === undefined) {
            throw new Error(`env variable ${ENV_WEBHOOKTOKEN_CUSTOMSERVICE} not declared`);
        }
        webhookTokenCustomService = val;
    }
    return webhookTokenCustomService;
};

export const getWebhookTokenPrivateDomain = () => {
    if (webhookTokenPrivateDomain === undefined) {
        const val = process.env[ENV_WEBHOOKTOKEN_PRIVATEDOMAIN] ?? ENV_WEBHOOKTOKEN_PRIVATEDOMAIN;
        if (val === undefined) {
            throw new Error(`env variable ${ENV_WEBHOOKTOKEN_PRIVATEDOMAIN} not declared`);
        }
        webhookTokenPrivateDomain = val;
    }
    return webhookTokenPrivateDomain;
};

export const getAuthSecret = () => {
    if (authSecret === undefined) {
        const val = process.env[ENV_AUTH_SECRET] ?? ENV_AUTH_SECRET;
        if (val === undefined) {
            throw new Error(`env variable ${ENV_AUTH_SECRET} not declared`);
        }
        authSecret = val;
    }
    return authSecret;
};

export const getAuthId = () => {
    if (authId === undefined) {
        const val = process.env[ENV_AUTH_ID] ?? ENV_AUTH_ID;
        if (val === undefined) {
            throw new Error(`env variable ${ENV_AUTH_ID} not declared`);
        }
        authId = val;
    }
    return authId;
};

export const getWebhookInbox = () => {
    if (webhookInbox === undefined) {
        const val = process.env[ENV_WEBHOOK_INBOX] ?? ENV_WEBHOOK_INBOX;
        if (val === undefined) {
            throw new Error(`env variable ${ENV_WEBHOOK_INBOX} not declared`);
        }
        webhookInbox = val;
    }
    return webhookInbox;
};

export const getWebhookCustomService = () => {
    if (webhookCustomService === undefined) {
        const val = process.env[ENV_WEBHOOK_CUSTOMSERVICE] ?? ENV_WEBHOOK_CUSTOMSERVICE;
        if (val === undefined) {
            throw new Error(`env variable ${ENV_WEBHOOK_CUSTOMSERVICE} not declared`);
        }
        webhookCustomService = val;
    }
    return webhookCustomService;
};