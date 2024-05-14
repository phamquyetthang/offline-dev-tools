import { useRef, useEffect } from 'react'

export function useHorizontalScroll() {
  const elRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = elRef.current
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY == 0) return
      e.preventDefault()
      !!el &&
        el.scrollTo({
          left: el.scrollLeft + (e.deltaY < 0 ? -400 : 400),
          behavior: 'smooth'
        })
    }
    !!el && el.addEventListener('wheel', onWheel)
    return () => {
      !!el && el.removeEventListener('wheel', onWheel)
    }
  }, [])
  return elRef
}
