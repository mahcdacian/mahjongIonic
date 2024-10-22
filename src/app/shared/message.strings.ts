export const ENGLISH_STRING = {
    ERROR_MESSAGE_EN: {
        ERR_FIRSTNAME_REQUIRED: 'First name is required',
        ERR_FIRSTNAME_LENGTH_EXCEEDS: 'First name length should not exceed 15 characters',
        ERR_LASTNAME_REQUIRED: 'Last name is required',
        ERR_LASTNAME_LENGTH_EXCEEDS: 'Last name length should not exceed 15 characters',
        ERR_ADDRESS_REQUIRED: 'Address is required',
        ERR_ADDRESS_LENGTH_EXCEEDS: 'Address length should not exceed 150 characters',
        ERR_POSTALCODE_REQUIRED: 'Postal Code is required',
        ERR_POSTALCODE_LENGTH_EXCEEDS: 'Post Code length should have 5 to 8 characters',
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
        SUCC_REGISTER_LOGIN: 'Welcome, User logged in successful',
        SUCC_FORGOT_PASS_LINK_SENT: 'Check your email for a link to reset your password.' +
        ' If it doesn’t appear within a few minutes, check your spam folder.'
    }
};

export const CHINESE_STRING = {
    ERROR_MESSAGE_CH: {},
    SUCCESS_MESSAGE_CH: {}
};

export const ENGLISH_CHINESE_STRING = {
    ERROR_MESSAGE_EN_CH: {
        ERR_FIRSTNAME_REQUIRED: 'First name is required 名字為必填項',
        ERR_FIRSTNAME_LENGTH_EXCEEDS: 'First name length should not exceed 15 characters 名字的長度不能超過15個字符',
        ERR_LASTNAME_REQUIRED: 'Last name is required 姓氏為必填項',
        ERR_LASTNAME_LENGTH_EXCEEDS: 'Last name length should not exceed 15 characters 姓氏長度不能超過15個字符',
        ERR_ADDRESS_REQUIRED: 'Address is required 地址為必填項',
        ERR_ADDRESS_LENGTH_EXCEEDS: 'Address length should not exceed 150 characters 地址長度不能超過150個字符',
        ERR_POSTALCODE_REQUIRED: 'Postal Code is required 郵政編碼為必填項',
        ERR_POSTALCODE_LENGTH_EXCEEDS: 'Post Code length should have 5 to 8 characters 郵政編碼長度應為5到8個字符',
        ERR_EMAIL_REQUIRED: 'Email is required 電子郵件為必填項',
        ERR_EMAIL_BAD_FORMAT: 'Invalid email address 郵件地址無效',
        ERR_MOBILENUMBER_REQUIRED: 'Mobile number is required',
        ERR_MOBILENUMBER_LENGTH_EXCEEDS: 'Mobile number should have 10 to 12 digits 手機號碼應為10到12位數字',
        ERR_PASSWORD_REQUIRED: 'Password is required 密碼為必填項',
        ERR_PASSWORD_NOTMATCH: 'Password and Confirm Password field doesnot match 密碼和確認密碼不匹配',
        ERR_USER_NOT_LOGGED: 'Please login and start drawing mahjong tiles to earn points! 請登錄並開始遊戲以獲取積分!',
        ERR_EMAIL_NOT_VERIFIED: 'Please validate your email address to complete the registration. Kindly check your email inbox. 確認您的電子郵件地址以完成註冊。請檢查您的電子郵件收件箱。',
        ERR_ACCEPT_TERMS_AND_CONDITION: 'You need to accept the terms and condition to continue registration'
    },
    SUCCESS_MESSAGE_EN_CH: {
        SUCSS_REGISTER_SUCCESSFUL: 'Please validate your email address to complete the registration. Kindly check your email inbox. 確認您的電子郵件地址以完成註冊。請檢查您的電子郵件收件箱。',
        SUCC_REGISTER_LOGIN: 'Welcome, User logged in successful 歡迎，用戶登錄成功',
        SUCC_FORGOT_PASS_LINK_SENT: 'Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder. 檢查您的電子郵件以獲取重置密碼的鏈接。如果幾分鐘後仍未顯示，請檢查您的垃圾郵件文件夾。'
    }
};


export enum ERROR_MESSAGE {
    ERR_FIRSTNAME_REQUIRED = 'ERR_FIRSTNAME_REQUIRED',
    ERR_FIRSTNAME_LENGTH_EXCEEDS = 'ERR_FIRSTNAME_LENGTH_EXCEEDS',
    ERR_LASTNAME_REQUIRED = 'ERR_LASTNAME_REQUIRED',
    ERR_LASTNAME_LENGTH_EXCEEDS = 'ERR_LASTNAME_LENGTH_EXCEEDS',
    ERR_ADDRESS_REQUIRED = 'ERR_ADDRESS_REQUIRED',
    ERR_ADDRESS_LENGTH_EXCEEDS = 'ERR_ADDRESS_LENGTH_EXCEEDS',
    ERR_POSTALCODE_REQUIRED = 'ERR_POSTALCODE_REQUIRED',
    ERR_POSTALCODE_LENGTH_EXCEEDS = 'ERR_POSTALCODE_LENGTH_EXCEEDS',
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
    SUCC_REGISTER_LOGIN = 'SUCC_REGISTER_LOGIN',
    SUCC_FORGOT_PASS_LINK_SENT = 'SUCC_FORGOT_PASS_LINK_SENT'
}
