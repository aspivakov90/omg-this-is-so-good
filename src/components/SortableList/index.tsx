import { FC, useState } from "react"

import ListGroup from "react-bootstrap/ListGroup"

import ConfirmationModal from "../modals/ConfirmationModal"
import SortableListItem from "./SortableListItem"

type SortableListProps = {
  items?: string[]
  onSort: (fromIndex: number, toIndex: number) => void
  onRemove: (item: string) => void
}

const SortableList: FC<SortableListProps> = ({
  items = [],
  onRemove,
  onSort,
}) => {
  const [selectedItemForRemoval, setSelectedItemForRemoval] = useState<
    string | null
  >(null)

  // It's possible to improve this by using useCallback and useMemo for a
  // modal params as well as wrapping the modal component with memo.
  // No need to for demo and simplicity.
  const onConfirm = () => {
    if (selectedItemForRemoval) {
      onRemove(selectedItemForRemoval)
      setSelectedItemForRemoval(null)
    }
  }

  if (!items.length) return null

  return (
    <>
      <ListGroup className="mb-3">
        {items.map((item, index) => (
          // TODO: make sure key is unique
          <SortableListItem
            key={item}
            item={item}
            index={index}
            onSort={onSort}
            onRemove={() => setSelectedItemForRemoval(item)}
          />
        ))}
      </ListGroup>

      <ConfirmationModal
        show={!!selectedItemForRemoval}
        title={`Are you sure you want to remove "${selectedItemForRemoval}" item from the list?`}
        onClose={() => setSelectedItemForRemoval(null)}
        onConfirm={onConfirm}
      />
    </>
  )
}

export default SortableList
