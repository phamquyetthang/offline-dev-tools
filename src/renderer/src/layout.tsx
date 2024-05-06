import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/layouts/sidebar'
import Header from './components/layouts/header'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store'
import { closeTag, setActivePage, syncStore } from './store/slice'
import { Toaster } from '@lib/components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lib/components/ui/tabs'
import { activeExtensionsSelector } from './store/selector'
import { EXTENSION_KEY } from './models/extensions'
import { X } from 'lucide-react'

export const Layout = () => {
  const dispatch = useAppDispatch()
  const activeExtensions = useAppSelector(activeExtensionsSelector)
  const activePage = useAppSelector((state) => state.app.activePage)
  useEffect(() => {
    dispatch(syncStore())
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <Tabs
        value={activePage || 'dashboard'}
        onValueChange={(v) => dispatch(setActivePage(v as EXTENSION_KEY))}
      >
        <TabsList className="ml-16">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          {activeExtensions.map((tab) => (
            <TabsTrigger key={tab.key} value={tab.key} className="flex items-center gap-1">
              {tab.title} <X className="w-3 h-3" onClick={() => dispatch(closeTag(tab.key))} />
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="dashboard">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Header />
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <Outlet />
            </main>
          </div>
        </TabsContent>
        {activeExtensions.map((tab) => (
          <TabsContent
            key={tab.key}
            value={tab.key}
            forceMount={true}
            hidden={activePage !== tab.key}
          >
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                {tab.page}
              </main>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Toaster />
    </div>
  )
}
