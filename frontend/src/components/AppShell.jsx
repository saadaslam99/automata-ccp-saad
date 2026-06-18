import React from 'react';

export default function AppShell({ leftPanel, rightPanel }) {
  return (
    <div className="p-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 flex flex-col">
            {leftPanel}
          </div>

          <div className="lg:col-span-8 flex flex-col">
            {rightPanel}
          </div>

        </div>
      </div>
    </div>
  );
}
