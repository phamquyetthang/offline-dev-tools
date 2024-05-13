import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/layouts/sidebar'
import { Suspense, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store'
import { setActivePage, syncStore } from './store/slice'
import { Toaster } from '@lib/components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lib/components/ui/tabs'
import { activeExtensionsSelector, extensionsInSecondSelector } from './store/selector'
import { EXTENSION_KEY } from './models/extensions.d'
import SearchBar from './components/layouts/searchbar'
import { useHorizontalScroll } from './hooks/useHorizontalScroll'
import TabsHeader from './components/layouts/tabs-header'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@lib/components/ui/resizable'
import PagePanel from './components/layouts/page-panel'

const LeftPanel = () => {
  const dispatch = useAppDispatch()
  const activeExtensions = useAppSelector(activeExtensionsSelector)
  const activePage = useAppSelector((state) => state.app.activePage)

  const scrollRef = useHorizontalScroll()
  return (
    <ResizablePanel id="left">
      <div className="pl-14 min-h-screen">
        <Tabs
          value={activePage || 'dashboard'}
          onValueChange={(v) => dispatch(setActivePage(v as EXTENSION_KEY))}
        >
          <div className="sticky top-0 w-full flex pr-2 gap-2">
            <div className="overflow-auto grid-flow-col grid" ref={scrollRef}>
              <TabsList className="justify-start">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsHeader extensions={activeExtensions} />
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
                  <Suspense>{tab.page}</Suspense>
                </main>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </ResizablePanel>
  )
}

export const RightPanel = () => {
  const extensionsInSecond = useAppSelector(extensionsInSecondSelector)
  const activeInSecond = useAppSelector((state) => state.app.activeInSecond)
  const scrollRef = useHorizontalScroll()
  const dispatch = useAppDispatch()

  return (
    <ResizablePanel id="right">
      <div className="min-h-screen">
        {!!activeInSecond && (
          <Tabs
            value={activeInSecond}
            onValueChange={(v) => dispatch(setActivePage(v as EXTENSION_KEY))}
          >
            <div className="sticky top-0 w-full flex pr-2 gap-2">
              <div className="overflow-auto grid-flow-col grid" ref={scrollRef}>
                <TabsList className="justify-start">
                  <TabsHeader extensions={extensionsInSecond} />
                </TabsList>
              </div>
            </div>

            <TabsContent value="dashboard">
              <div className="flex flex-col sm:gap-4 sm:py-4">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                  <Outlet />
                </main>
              </div>
            </TabsContent>
            {extensionsInSecond.map((tab) => (
              <TabsContent
                key={tab.key}
                value={tab.key}
                forceMount={true}
                hidden={activeInSecond !== tab.key}
              >
                <div className="flex flex-col sm:gap-4 sm:py-4">
                  <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Suspense>{tab.page}</Suspense>
                  </main>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </ResizablePanel>
  )
}
export const Layout = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(syncStore())
  }, [])

  const isTwoSide = useAppSelector((state) => state.app.extensionsInSecond.length)
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <ResizablePanelGroup direction="horizontal">
        <LeftPanel />
        <ResizableHandle disabled={!isTwoSide} />
        {!!isTwoSide && <RightPanel />}
      </ResizablePanelGroup>
      <PagePanel name="right-panel" />
      <Toaster />
    </div>
  )
}
