// TIME API Types
export interface TimeVendor {
  id: string;
  vendor_id: string;
  vendor_name: string;
  vendor_name_local: string;
  vendor_type: string;
  vendor_provider: string;
  original_category: string;
  isShow: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TimeVendorListResponse {
  message: string;
  success: boolean;
  returnCode: string;
  result: TimeVendor[];
}

export type VendorCategory = 'Live Casino' | 'Slot';

// Game Launch Types
export interface GameLaunchRequest {
  playerCode: string;
  providerCode: string;
  countryCode: string;
  localeCode: string;
  gameCode?: string;
}

export interface GameLaunchResponse {
  status: string;
  result: {
    gameUrl: string;
  };
}

// Game List Types
export interface GameItem {
  code: string;
  name: string;
  name_en: string;
  category: string;
  iconUrl: string;
  demoGameAvailable: boolean;
}

export interface GameListResponse {
  status: string;
  result: GameItem[];
}

// Auth Types
export interface Credential {
  userName: string;
  password: string;
}

export interface User {
  id: string;
  userName: string;
  nickName: string;
  role: string;
  balanceMoney: number;
  balancePoint: number;
  balancePot: number;
  bankHolder?: string;
  bankName?: string;
  bankNo?: string;
}

export interface AuthResult {
  token: string;
  user: User;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  result: AuthResult;
  deviceId?: string;
}

export interface RegisterRequest {
  userName: string;
  password: string;
  nickName?: string;
  phone: string;
  agentId: string;
  role: 'USER';
  bankHolder: string;
  bankName: string;
  bankNo: string;
  transactionPassword: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  result?: AuthResult;
}

// User Profile Types
export interface UserProfileResponse {
  success: boolean;
  message: string;
  result: User;
}

// WebSocket Types
export interface WSMessage {
  action?: string;
  type?: string;
  data?: unknown;
  userId?: string;
}
