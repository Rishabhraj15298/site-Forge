import { useEffect, useMemo, useState } from 'react'
import { cn } from '../lib/utils'

const BackgroundRippleEffect = ({ rows = 8, cols = 27, cellSize = 56, className = '' }) => {
  const [ripple, setRipple] = useState({ origin: -1, id: 0 })
  const [focusedCell, setFocusedCell] = useState(0)
  const [viewport, setViewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }))
  const gridCellSize = viewport.width <= 640 ? Math.min(cellSize, 40) : cellSize
  const columnCount = Math.max(cols, Math.ceil(viewport.width / gridCellSize) + 2)
  const rowCount = Math.max(rows, Math.ceil(viewport.height / gridCellSize) + 2)
  const cells = useMemo(
    () => Array.from({ length: rowCount * columnCount }, (_, index) => index),
    [rowCount, columnCount],
  )

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const origins = [
      Math.floor(rowCount / 2) * columnCount + Math.floor(columnCount / 2),
      columnCount - 1,
      cells.length - 1,
      (rowCount - 1) * columnCount,
    ]
    let originIndex = 0
    const emitRipple = () => {
      const origin = origins[originIndex]
      originIndex = (originIndex + 1) % origins.length
      setRipple((current) => ({ origin, id: current.id + 1 }))
    }

    emitRipple()
    const interval = window.setInterval(emitRipple, 4500)
    return () => window.clearInterval(interval)
  }, [cells.length, columnCount, rowCount])

  const triggerRipple = (index) => {
    setRipple((current) => ({ origin: index, id: current.id + 1 }))
  }

  const handleKeyDown = (event, index) => {
    const row = Math.floor(index / columnCount)
    const col = index % columnCount
    let nextIndex = index

    switch (event.key) {
      case 'ArrowLeft':
        nextIndex = row * columnCount + Math.max(0, col - 1)
        break
      case 'ArrowRight':
        nextIndex = row * columnCount + Math.min(columnCount - 1, col + 1)
        break
      case 'ArrowUp':
        nextIndex = Math.max(0, row - 1) * columnCount + col
        break
      case 'ArrowDown':
        nextIndex = Math.min(rowCount - 1, row + 1) * columnCount + col
        break
      default:
        return
    }

    event.preventDefault()
    const nextCell = event.currentTarget.parentElement?.children[nextIndex]
    if (nextCell instanceof HTMLButtonElement) nextCell.focus()
  }

  return (
    <div
      className={cn('background-ripple-grid', className)}
      style={{
        '--ripple-cols': columnCount,
        '--ripple-rows': rowCount,
        '--ripple-base-cell-size': `${gridCellSize}px`,
      }}
      role="group"
      aria-label="Interactive ripple background"
    >
      <div className="background-ripple-atmosphere" aria-hidden="true" />
      <div className="background-ripple-grid-cells">
        {cells.map((index) => {
          const row = Math.floor(index / columnCount)
          const col = index % columnCount
          const originRow = Math.floor(ripple.origin / columnCount)
          const originCol = ripple.origin % columnCount
          const distance = ripple.origin === -1 ? 0 : Math.hypot(row - originRow, col - originCol)
          const isAnimating = ripple.origin !== -1

          return (
            <button
              key={index}
              type="button"
              tabIndex={focusedCell === index ? 0 : -1}
              aria-label={`Ripple cell ${row + 1}, ${col + 1}`}
              className="background-ripple-cell"
              onClick={() => triggerRipple(index)}
              onFocus={() => setFocusedCell(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span
                key={ripple.id}
                aria-hidden="true"
                className={cn('background-ripple-cell-wave', isAnimating && 'animate-cell-ripple')}
                style={{
                  '--delay': `${distance * 35}ms`,
                  '--duration': `${Math.max(250, 650 - distance * 15)}ms`,
                }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BackgroundRippleEffect
