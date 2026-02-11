
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
    health: 98,
    description: 'Soil nutrients & moisture monitoring distributed network.',
    tasks: ['Nutrient Mapping', 'Moisture Polling'],
    diagnostics: {
      latency: '14ms',
      uptime: '342h',
      errorRate: '0.01%',
      lastSyncHash: '0x88F...21',
      firmware: 'v2.4.1'
    }
  },
  {
    id: 'agent-002',
    name: 'VisionQC-Beta',
    type: AgentType.IDENTIFY,
    status: AgentStatus.PROCESSING,
    lastActive: 'Now',
    location: 'Processing Plant Line A',
    load: 78,
    health: 84,
    description: 'Computer vision for crop quality identification & classification.',
    tasks: ['Object Detection', 'Defect Grading'],
    diagnostics: {
      latency: '82ms',
      uptime: '12h',
      errorRate: '1.2%',
      lastSyncHash: '0xA12...99',
      firmware: 'v3.0.0-rc'
    }
  },
  {
    id: 'agent-003',
    name: 'LogiPlan-Delta',
    type: AgentType.PLANNING,
    status: AgentStatus.ONLINE,
    lastActive: '2m ago',
    location: 'Regional Hub',
    load: 45,
    health: 95,
    description: 'Supply chain optimization and route planning.',
    tasks: ['Route Optimization', 'Inventory Prediction'],
    diagnostics: {
      latency: '204ms',
      uptime: '1,200h',
      errorRate: '0.00%',
      lastSyncHash: '0x442...FF',
      firmware: 'v1.9.8'
    }
  },
  {
    id: 'agent-004',
    name: 'OT-Master-Gamma',
    type: AgentType.OT_CONTROL,
    status: AgentStatus.ONLINE,
    lastActive: 'Now',
    location: 'Central Storage',
    load: 22,
    health: 100,
    description: 'Operational Technology control for climate systems.',
    tasks: ['HVAC Modulating', 'Humidity Lock'],
    diagnostics: {
      latency: '2ms',
      uptime: '4,521h',
      errorRate: '0.00%',
      lastSyncHash: '0x000...AA',
      firmware: 'v4.2.1-stable'
    }
  },
  {
    id: 'agent-005',
    name: 'MaturityMonitor',
    type: AgentType.MATURITY,
    status: AgentStatus.WARNING,
    lastActive: '15m ago',
    location: 'Cloud HQ',
    load: 5,
    health: 65,
    description: 'Process maturity tracking and compliance management.',
    tasks: ['Audit Generation', 'Compliance Scan'],
    diagnostics: {
      latency: '450ms',
      uptime: '4h',
      errorRate: '5.4%',
      lastSyncHash: '0xDEAD...EF',
      firmware: 'v0.8.2-beta'
    }
  }
];

export const SYSTEM_KPIS: KPI[] = [
  { name: 'Yield Efficiency', value: 94.2, unit: '%', trend: 'up', change: 2.1 },
  { name: 'Process CMM', value: 3.8, unit: 'Lvl', trend: 'up', change: 0.4 },
  { name: 'Cold Chain Integrity', value: 99.8, unit: '%', trend: 'stable', change: 0.1 },
  { name: 'Energy Footprint', value: 42.5, unit: 'kWh/t', trend: 'down', change: 5.4 }
];

export const MATURITY_DATA: MaturityLevel[] = [
  { stage: 1, name: 'Ad-Hoc', description: 'Processes are unpredictable and reactive.', score: 100 },
  { stage: 2, name: 'Managed', description: 'Processes characterized for projects.', score: 85 },
  { stage: 3, name: 'Defined', description: 'Proactive processes for organization.', score: 60 },
  { stage: 4, name: 'Quantitatively Managed', description: 'Measured and controlled.', score: 30 },
  { stage: 5, name: 'Optimizing', description: 'Focus on continuous improvement.', score: 10 }
];
