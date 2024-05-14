import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@lib/components/ui/command'
import { Input } from '@lib/components/ui/input'
import { EXTENSION_KEY } from '@renderer/models/types'
import { Search, Wrench } from 'lucide-react'
import { useEffect, useState } from 'react'
import Icon from '../components/icon'
import { useAppDispatch } from '@renderer/store'
import { setRecentExtensions } from '@renderer/store/slice'
import { EXTENSIONS } from '@renderer/models/extensions'

const SearchBar = () => {
  const [open, setOpen] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'f' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keyup', down)
    return () => document.removeEventListener('keyup', down)
  }, [])

  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        onClick={() => setOpen(true)}
        type="search"
        placeholder="Search... ⌘F"
        className="w-9 sm:w-[128px] rounded-lg bg-background px-0 pl-8 focus-visible:outline-none"
      />

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        commandProps={{
          filter: (value, search, keywords) => {
            const extendValue = value + ' ' + keywords?.join(' ')
            if (extendValue.includes(search)) return 1
            return 0
          }
        }}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Extensions">
            {EXTENSIONS.map((e) => (
              <CommandItem
                key={e.key}
                value={e.key}
                keywords={e.keywords?.concat(e.title)}
                onSelect={(value) => {
                  setOpen(false)
                  dispatch(setRecentExtensions(value as EXTENSION_KEY))
                }}
              >
                <div className="mr-2">
                  {e.iconNode ||
                    (e.icon ? (
                      <Icon name={e.icon} className="h-4 w-4" />
                    ) : e.alt ? (
                      <div className="h-5 w-5 font-bold">
                        <svg viewBox="0 0 20 20">
                          <text x="2" y="15">
                            {e.alt}
                          </text>
                        </svg>
                      </div>
                    ) : (
                      <Wrench />
                    ))}
                </div>

                <span>{e.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

export default SearchBar
