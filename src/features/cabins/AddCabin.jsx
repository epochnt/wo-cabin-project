import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-from">
          <Button> Add new cabin </Button>
        </Modal.Open>
        <Modal.Window name="cabin-from">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
