
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MATURITY_DATA } from '../constants';

const MaturityDashboard: React.FC = () => {
  const COLORS = ['#3f3f46', '#71717a', '#10b981', '#059669', '#047857'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-panel p-6 rounded-xl">
        <h3 className="text-lg font-bold text-white mb-6">Process Maturity Cycle Integrity</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MATURITY_DATA} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                tick={{fill: '#a1a1aa', fontSize: 12}} 
                width={100}
              />
              <Tooltip 
                contentStyle={{backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px'}}
                itemStyle={{color: '#10b981'}}
              />
              <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                {MATURITY_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        {MATURITY_DATA.map((level) => (
          <div key={level.stage} className={`glass-panel p-4 rounded-xl border-l-4 ${level.score > 70 ? 'border-emerald-500' : 'border-zinc-700'}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-emerald-400 uppercase">Level {level.stage}</span>
              <span className="text-xs text-zinc-500">{level.score}% ADHERENCE</span>
            </div>
            <h4 className="text-white font-bold">{level.name}</h4>
            <p className="text-zinc-400 text-xs mt-1">{level.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaturityDashboard;
