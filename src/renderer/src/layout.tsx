import { Outlet } from 'react-router-dom'
import { Sidebar, SidebarMobile } from './components/layouts/sidebar'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store'
import { closeTag, setActivePage, syncStore } from './store/slice'
import { Toaster } from '@lib/components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lib/components/ui/tabs'
import { activeExtensionsSelector } from './store/selector'
import { EXTENSION_KEY } from './models/extensions'
import { X } from 'lucide-react'
import SearchBar from './components/layouts/searchbar'
import { useHorizontalScroll } from './hooks/useHorizontalScroll'

export const Layout = () => {
  const dispatch = useAppDispatch()
  const activeExtensions = useAppSelector(activeExtensionsSelector)
  const activePage = useAppSelector((state) => state.app.activePage)
  useEffect(() => {
    dispatch(syncStore())
  }, [])

  const scrollRef = useHorizontalScroll()

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="sm:pl-14">
        <Tabs
          value={activePage || 'dashboard'}
          onValueChange={(v) => dispatch(setActivePage(v as EXTENSION_KEY))}
        >
          <div className="sticky top-0 w-full grid grid-cols-[20px_1fr_128px] sm:grid-cols-[1fr_128px] pr-2 gap-4">
            <SidebarMobile />

            <div className="overflow-auto grid-flow-col grid" ref={scrollRef}>
              <TabsList className="justify-start">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                {activeExtensions.map((tab) => (
                  <TabsTrigger key={tab.key} value={tab.key} className="flex items-center gap-1">
                    {tab.title}{' '}
                    <X
                      className="w-3 h-3 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                      onClick={() => dispatch(closeTag(tab.key))}
                    />
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <SearchBar />
          </div>

          <TabsContent value="dashboard">
            <div className="flex flex-col sm:gap-4 sm:py-4">
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
              <div className="flex flex-col sm:gap-4 sm:py-4">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                  {tab.page}
                </main>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Toaster />
    </div>
  )
}
