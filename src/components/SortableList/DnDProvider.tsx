import { FC, PropsWithChildren } from "react"
import { DndProvider as ReactDndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

/**
 * Component to encapsulate DnD logic within SortableList folder
 */
const DnDProvider: FC<PropsWithChildren> = ({ children }) => (
  <ReactDndProvider backend={HTML5Backend}>{children}</ReactDndProvider>
)

export default DnDProvider
