export type TransactionType = "deposit" | "withdraw" | "transfer" | "transfer_deposit" | "transfer_withdraw";

export type TransactionStatus = "success" | "cancel" | "pending";

export interface Transaction {
  id?: string;
  accoundId: string;
  money: number;
  type: TransactionType;
  status: TransactionStatus;
  createdAt: string;
  wallet: {
    user: {
      accountId: string;
    };
    agent: {
      code: string;
    };
  };
}

export interface TransactionListItem {
  id: string;
  userId: string;
  amount: number;
  type: "Deposit" | "Withdrawal" | "Transfer";
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionRequest {
  userId: string;
  amount: number;
  type: string;
  transaction_password: string;
}

export interface TransferPointRequest {
  userId: string;
  balancePoint: number;
}

export interface TransactionListQuery {
  page: number;
  pageSize: number;
  type?: "Deposit" | "Withdrawal" | "Transfer";
  userId?: string;
}

export interface TransactionListResponse {
  success: boolean;
  message: string;
  data: {
    transactions: TransactionListItem[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  errors: string[];
}
