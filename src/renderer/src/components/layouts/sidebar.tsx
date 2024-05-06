import { PanelLeft, Settings, Sun, SunMoon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@lib/components/ui/tooltip'
import { Button } from '@lib/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@lib/components/ui/sheet'
import { CATEGORIES } from '@renderer/models/extensions'
import Icon from '../components/icon'
import { NavLink } from 'react-router-dom'
import './sidebar.css'
import { useTheme } from './theme'
import { memo } from 'react'

const SidebarComponent = () => {
  const { setTheme, theme } = useTheme()

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          {CATEGORIES.map((c) => (
            <Tooltip key={c.path}>
              <TooltipTrigger asChild>
                <NavLink
                  to={c.path}
                  className="flex items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Icon name={c.icon} className="h-5 w-5" />
                  <span className="sr-only">{c.title}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">{c.title}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                {theme === 'light' ? <Sun /> : <SunMoon />}
                <span className="sr-only">Theme mode</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Theme mode</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <a className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}

export const Sidebar = memo(SidebarComponent)

export const SidebarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          {CATEGORIES.map((c) => (
            <NavLink
              key={c.path}
              to={c.path}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Icon name={c.icon} className="h-5 w-5" />
              <span>{c.title}</span>
            </NavLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
