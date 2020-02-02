export interface UserInformation {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    mobileNumber: number;
    email: string;
}

export enum SELECTED_APP_LANGUAGE {
    ENGLISH,
    CHINESE,
    ENGLISHCHINESE
}

export enum MESSAGE_TYPE {
    ERROR,
    SUCCESS,
    INFORMATION
}
