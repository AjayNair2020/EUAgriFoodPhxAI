
import React from 'react';
import { Agent, AgentType, AgentStatus, KPI, MaturityLevel } from './types';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agent-001',
    name: 'EcoSense-Alpha',
    type: AgentType.SENSING,
    status: AgentStatus.ONLINE,
    lastActive: 'Now',
    location: 'North Farm (Edge)',
    load: 12,
    description: 'Soil nutrients & moisture monitoring distributed network.'
  },
  {
    id: 'agent-002',
    name: 'VisionQC-Beta',
    type: AgentType.IDENTIFY,
    status: AgentStatus.PROCESSING,
    lastActive: 'Now',
    location: 'Processing Plant Line A',
    load: 78,
    description: 'Computer vision for crop quality identification & classification.'
  },
  {
    id: 'agent-003',
    name: 'LogiPlan-Delta',
    type: AgentType.PLANNING,
    status: AgentStatus.ONLINE,
    lastActive: '2m ago',
    location: 'Regional Hub',
    load: 45,
    description: 'Supply chain optimization and route planning.'
  },
  {
    id: 'agent-004',
    name: 'OT-Master-Gamma',
    type: AgentType.OT_CONTROL,
    status: AgentStatus.ONLINE,
    lastActive: 'Now',
    location: 'Central Storage',
    load: 22,
    description: 'Operational Technology control for climate systems.'
  },
  {
    id: 'agent-005',
    name: 'MaturityMonitor',
    type: AgentType.MATURITY,
    status: AgentStatus.WARNING,
    lastActive: '15m ago',
    location: 'Cloud HQ',
    load: 5,
    description: 'Process maturity tracking and compliance management.'
  }
];

export const SYSTEM_KPIS: KPI[] = [
  { name: 'Yield Efficiency', value: 94.2, unit: '%', trend: 'up', change: 2.1 },
  { name: 'Cold Chain Integrity', value: 99.8, unit: '%', trend: 'stable', change: 0.1 },
  { name: 'Energy Footprint', value: 42.5, unit: 'kWh/t', trend: 'down', change: 5.4 },
  { name: 'Supply Path Latency', value: 14.2, unit: 'h', trend: 'up', change: 1.2 }
];

export const MATURITY_DATA: MaturityLevel[] = [
  { stage: 1, name: 'Ad-Hoc', description: 'Processes are unpredictable and reactive.', score: 100 },
  { stage: 2, name: 'Managed', description: 'Processes characterized for projects.', score: 85 },
  { stage: 3, name: 'Defined', description: 'Proactive processes for organization.', score: 60 },
  { stage: 4, name: 'Quantitatively Managed', description: 'Measured and controlled.', score: 30 },
  { stage: 5, name: 'Optimizing', description: 'Focus on continuous improvement.', score: 10 }
];
