export interface Messages {
    _id : string;
    email : string;
    msg: string;
    timestamp: Date;
}

export interface NewMessages {
    email : string;
    msg: string;
    timestamp: Date;
}