import Versions from './components/Versions'
import { Button } from '@lib/components/ui/button'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button>Hello</Button>
      <h1 className="text-4xl">Thanh thích anh code cái gì ?</h1>
      {JSON.stringify(ipcHandle)}
      <Versions></Versions>
    </div>
  )
}

export default App
