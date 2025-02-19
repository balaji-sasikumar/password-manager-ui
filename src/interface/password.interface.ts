export interface Password {
  id: number;
  category: string;
  app: string;
  userName: string;
  encryptedPassword: string;
  decryptedPassword?: string; // Optional field to store the decrypted password
}
