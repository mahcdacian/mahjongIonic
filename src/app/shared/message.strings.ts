export const ENGLISH_STRING = {
    ERROR_MESSAGE_EN: {
        ERR_FIRSTNAME_REQUIRED: 'First name is required',
        ERR_FIRSTNAME_LENGTH_EXCEEDS: 'First name length should not exceed 15 characters',
        ERR_LASTNAME_REQUIRED: 'Last name is required',
        ERR_LASTNAME_LENGTH_EXCEEDS: 'Last name length should not exceed 15 characters',
        ERR_ADDRESS_REQUIRED: 'Address is required',
        ERR_ADDRESS_LENGTH_EXCEEDS: 'Address length should not exceed 150 characters',
        ERR_EMAIL_REQUIRED: 'Email is required',
        ERR_EMAIL_BAD_FORMAT: 'Invalid email address',
        ERR_MOBILENUMBER_REQUIRED: 'Mobile number is required',
        ERR_MOBILENUMBER_LENGTH_EXCEEDS: 'Mobile number should have 10 to 12 digits',
        ERR_PASSWORD_REQUIRED: 'Password is required',
        ERR_PASSWORD_NOTMATCH: 'Password and Confirm Password field doesnot match',
        ERR_USER_NOT_LOGGED: 'User is not logged in',
        ERR_EMAIL_NOT_VERIFIED: 'Please validate your email address. Kindly check your email inbox',
        ERR_ACCEPT_TERMS_AND_CONDITION: 'You need to accept the terms and condition to continue registration'
    },
    SUCCESS_MESSAGE_EN: {
        SUCSS_REGISTER_SUCCESSFUL: 'Registration successful.Please check your email for account activation',
        SUCC_REGISTER_LOGIN: 'Welcome, User logged in successful'
    }
};

export const CHINESE_STRING = {
    ERROR_MESSAGE_CH: {},
    SUCCESS_MESSAGE_CH: {}
};

export enum ERROR_MESSAGE {
    ERR_FIRSTNAME_REQUIRED = 'ERR_FIRSTNAME_REQUIRED',
    ERR_FIRSTNAME_LENGTH_EXCEEDS = 'ERR_FIRSTNAME_LENGTH_EXCEEDS',
    ERR_LASTNAME_REQUIRED = 'ERR_LASTNAME_REQUIRED',
    ERR_LASTNAME_LENGTH_EXCEEDS = 'ERR_LASTNAME_LENGTH_EXCEEDS',
    ERR_ADDRESS_REQUIRED = 'ERR_ADDRESS_REQUIRED',
    ERR_ADDRESS_LENGTH_EXCEEDS = 'ERR_ADDRESS_LENGTH_EXCEEDS',
    ERR_EMAIL_REQUIRED = 'ERR_EMAIL_REQUIRE',
    ERR_EMAIL_BAD_FORMAT = 'ERR_EMAIL_BAD_FORMAT',
    ERR_MOBILENUMBER_REQUIRED = 'ERR_MOBILENUMBER_REQUIRED',
    ERR_MOBILENUMBER_LENGTH_EXCEEDS = 'ERR_MOBILENUMBER_LENGTH_EXCEEDS',
    ERR_PASSWORD_REQUIRED = 'ERR_PASSWORD_REQUIRED',
    ERR_PASSWORD_NOTMATCH = 'ERR_PASSWORD_NOTMATCH',
    ERR_USER_NOT_LOGGED = 'ERR_USER_NOT_LOGGED',
    ERR_EMAIL_NOT_VERIFIED = 'ERR_EMAIL_NOT_VERIFIED',
    ERR_ACCEPT_TERMS_AND_CONDITION = 'ERR_ACCEPT_TERMS_AND_CONDITION'
}
export enum SUCCESS_MESSAGE {
    SUCSS_REGISTER_SUCCESSFUL = 'SUCSS_REGISTER_SUCCESSFUL',
    SUCC_REGISTER_LOGIN = 'SUCC_REGISTER_LOGIN'
}
