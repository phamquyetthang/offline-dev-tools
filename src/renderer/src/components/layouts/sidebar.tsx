import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2
} from 'lucide-react'
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

export const Sidebar = () => {
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
          <a className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </a>
          <a className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <Home className="h-5 w-5" />
            Dashboard
          </a>
          <a className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <ShoppingCart className="h-5 w-5" />
            Orders
          </a>
          <a className="flex items-center gap-4 px-2.5 text-foreground">
            <Package className="h-5 w-5" />
            Products
          </a>
          <a className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <Users2 className="h-5 w-5" />
            Customers
          </a>
          <a className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <LineChart className="h-5 w-5" />
            Settings
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
