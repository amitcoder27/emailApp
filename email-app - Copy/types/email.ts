export type Email = {
  id: number;
  sender: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
};
