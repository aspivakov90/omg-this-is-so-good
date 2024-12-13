/**
 * Represents a draggable item for sortable list
 */
export type DragItem = {
  /**
   *  The current index number of the element within a sortable order.
   */
  index: number
  /**
   * A unique identifier is required for the DnD library to register draggable elements.
   */
  type: string
}
