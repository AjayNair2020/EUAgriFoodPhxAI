
export enum AgentStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  PROCESSING = 'PROCESSING',
  WARNING = 'WARNING'
}

export enum AgentType {
  SENSING = 'SENSING',
  IDENTIFY = 'IDENTIFY',
  PLANNING = 'PLANNING',
  OT_CONTROL = 'OT_CONTROL',
  MATURITY = 'MATURITY',
  INTELLIGENCE = 'INTELLIGENCE'
}

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  lastActive: string;
  location: string;
  load: number;
  description: string;
  health: number; // 0-100
  tasks: string[];
  diagnostics: {
    latency: string;
    uptime: string;
    errorRate: string;
    lastSyncHash: string;
    firmware: string;
  };
}

export interface KPI {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export interface SupplyChainNode {
  id: string;
  label: string;
  type: 'farm' | 'factory' | 'logistics' | 'retail';
  status: 'optimal' | 'bottleneck' | 'critical';
}

export interface MaturityLevel {
  stage: number;
  name: string;
  description: string;
  score: number;
}

export type FarmingDomain = 
  | 'Agriculture' 
  | 'Plantations' 
  | 'Animal Husbandry' 
  | 'Psiculture' 
  | 'Horticulture' 
  | 'Floriculture' 
  | 'Aviculture' 
  | 'Aquaculture' 
  | 'Apiculture';

export type FarmingOperation = 
  | 'Planning' 
  | 'Equipments/Robotics' 
  | 'Storage WMS' 
  | 'Manpower' 
  | 'Supply-chain' 
  | 'Delivery Models' 
  | 'Mobility Fleet';

export type ClimateSmartSection = 
  | 'Data Collection'
  | 'Analytics'
  | 'Forecast'
  | 'Mitigation'
  | 'Resilience'
  | 'Finance & Insurance'
  | 'Diversification';

export type SupplyChainSection =
  | 'Raw Produce'
  | 'Processing Units'
  | 'Packaging'
  | 'Shipping'
  | 'Warehouse'
  | 'Transport'
  | 'Last-mile Delivery';

// --- RACI RBAC Types ---
export enum RACILevel {
  ACCOUNTABLE = 'A', // Super Admin / Owner - Final decision authority
  RESPONSIBLE = 'R', // Operator / Manager - Executes tasks
  CONSULTED = 'C',   // Analyst / SME - Providing input
  INFORMED = 'I'     // Viewer / Auditor - Kept up-to-date
}

export interface User {
  email: string;
  name: string;
  role: string;
  raciLevel: RACILevel;
  isSuperAdmin: boolean;
  avatar?: string;
}

export interface MenuPermissions {
  [menuId: string]: RACILevel[];
}
