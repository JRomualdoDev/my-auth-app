
'use client'

import ProtectedRoute from '@/components/auth/protected-route';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Esta é uma página protegida</p>
      </div>
    </ProtectedRoute>
  );
}