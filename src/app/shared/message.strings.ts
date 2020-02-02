export enum ERROR_MESSAGE  {
    ERR_FIRSTNAME_REQUIRED = 'First name is required',
    ERR_FIRSTNAME_LENGTH_EXCEEDS = 'First name length should not exceed 15 characters',
    ERR_LASTNAME_REQUIRED = 'Last name is required',
    ERR_LASTNAME_LENGTH_EXCEEDS = 'Last name length should not exceed 15 characters',
    ERR_ADDRESS_REQUIRED = 'Address is required',
    ERR_ADDRESS_LENGTH_EXCEEDS = 'Address length should not exceed 150 characters',
    ERR_EMAIL_REQUIRED = 'Email is required',
    ERR_EMAIL_BAD_FORMAT = 'Invalid email address',
    ERR_MOBILENUMBER_REQUIRED = 'Mobile number is required',
    ERR_MOBILENUMBER_LENGTH_EXCEEDS = 'Mobile number should have 10 to 12 digits',
    ERR_PASSWORD_REQUIRED = 'Password is required',
    ERR_PASSWORD_NOTMATCH = 'Password and Confirm Password field doesnot match',
    ERR_USER_NOT_LOGGED = 'User is not logged in',
    ERR_EMAIL_NOT_VERIFIED = 'Please validate your email address. Kindly check your email inbox',
    ERR_ACCEPT_TERMS_AND_CONDITION = 'You need to accept the terms and condition to continue registration'
}
export enum SUCCESS_MESSAGE {
    SUCSS_REGISTER_SUCCESSFUL = 'Registration successful.Please check your email for account activation',
    SUCC_REGISTER_LOGIN = 'Welcome, User logged in successful'
}
