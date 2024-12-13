/**
 * Represents a single option in a select dropdown.
 *
 * This type defines the structure of a selectable option, including a label and value
 * that are typically used in dropdowns or selection menus.
 */
export type Option = {
  /**
   * The label displayed for the option in the UI.
   */
  readonly label: string

  /**
   * The unique value associated with the option, used in form submissions for backend processing.
   */
  readonly value: string
}
