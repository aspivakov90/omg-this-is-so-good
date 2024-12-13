import { FC, useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { BsGripVertical, BsTrash } from "react-icons/bs"

import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"
import { DragItem } from "./types"

type SortableListItemProps = {
  item: string
  index: number
  onRemove: () => void
  onSort: (fromIndex: number, toIndex: number) => void
}

const ITEM_TYPE = "product.item"

const SortableListItem: FC<SortableListItemProps> = ({
  item,
  onRemove,
  index,
  onSort,
}) => {
  const ref = useRef(null)

  const [, drop] = useDrop<DragItem>({
    accept: ITEM_TYPE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        onSort(draggedItem.index, index)
        draggedItem.index = index
      }
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-center gap-2"
      ref={ref}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: "move",
      }}
    >
      <BsGripVertical />
      <span className="me-auto">{item}</span>
      <Button size="sm" variant="outline-danger" onClick={onRemove}>
        <BsTrash />
      </Button>
    </ListGroup.Item>
  )
}

export default SortableListItem
