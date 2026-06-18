import React from 'react';
import { NavLink } from 'react-router-dom';
import { Terminal, Network, TableProperties, TestTubeDiagonal } from 'lucide-react';

export default function Navigation() {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Terminal className="w-4 h-4" /> },
    { path: '/model', label: 'Automata Model', icon: <Network className="w-4 h-4" /> },
    { path: '/transitions', label: 'Transition Table', icon: <TableProperties className="w-4 h-4" /> },
    { path: '/test-cases', label: 'Test Cases', icon: <TestTubeDiagonal className="w-4 h-4" /> },
  ];

  return (
    <nav className="flex gap-1 border-b border-panel-border px-6 pt-4 bg-background sticky top-0 z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              isActive
                ? 'border-accent text-accent bg-panel/50 rounded-t-md'
                : 'border-transparent text-muted hover:text-gray-200 hover:bg-panel/30 rounded-t-md'
            }`
          }
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
