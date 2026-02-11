
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
