export interface GetMessageOptions {
  lastMessageId?: number | string;
  pageSize?: number;
}

export interface AddMessageOptions {
  message: string;
}