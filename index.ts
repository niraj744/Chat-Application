export interface Author {
  _id: string;
  kindeID: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}
export interface Message {
  message: string;
  picture: string;
  receiverID: string;
  senderID: string;
  __v: number;
  _id: string;
  createdAt: Date;
}
