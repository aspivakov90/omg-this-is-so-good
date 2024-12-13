import { FC } from "react"

import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

type ConfirmationModalProps = {
  title: string
  show: boolean
  onClose: () => void
  onConfirm: () => void
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  title,
  show,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{title}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal
