import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/layouts/sidebar'
import Header from './components/layouts/header'
import { useEffect } from 'react'
import { useAppDispatch } from './store'
import { syncStore } from './store/slice'

export const Layout = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(syncStore())
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
