import clsx from 'clsx'
import { useDrop } from 'react-dnd'

interface IProps {
  name: string
}
const PagePanel = ({ name }: IProps) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ({ name }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  return (
    <div
      ref={drop}
      className={clsx(
        ' fixed top-0 right-0 w-[50vw] h-screen bg-slate-200 border-l border-slate-400 opacity-60',
        {
          block: canDrop,
          hidden: !canDrop,
          'opacity-40': isOver
        }
      )}
    ></div>
  )
}

export default PagePanel
