
'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/lib/store/auth-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import axios_api from '@/lib/axios'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { user, clearAuth } = useAuthStore()
  const router = useRouter()

  // useEffect(() => {
  //   // Verify authentication on component mount
  //   setIsLoading(false)
  // }, [])

  const handleLogout = async () => {
    try {
      await axios_api.post('/auth/logout')
      clearAuth()
      router.push('/')
    } catch (error) {
      console.error('Logout failed', error)
      // Still clear auth on the client side even if the API call fails
      clearAuth()
      router.push('/')
    }
  }

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Welcome to your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">User Information</h3>
              <p>Name: {user?.name || 'Not available'}</p>
              <p>Email: {user?.email || 'Not available'}</p>
            </div>
            <Button onClick={handleLogout} variant="outline">Logout</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}