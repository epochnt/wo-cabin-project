import { FaTrashAlt, FaPen, FaCopy } from "react-icons/fa";
import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import { useCreateCabin, useDeleteCabin } from "./hooks";

import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({
  cabin: {
    id,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = {},
}) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, insert } = useCreateCabin();

  const handleCopy = () => {
    insert({
      name: "Copy of" + name,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  };

  if (isCreating) return <Spinner />;

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <div>&ndash;</div>
        )}
        <Row type="horizontal">
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Menus.Button onClick={handleCopy} icon={<FaCopy />}>
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<FaPen />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<FaTrashAlt />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window name="edit">
                <CreateCabinForm
                  cabin={{
                    ...{
                      id,
                      name,
                      maxCapacity,
                      regularPrice,
                      discount,
                      description,
                      image,
                    },
                  }}
                />
              </Modal.Window>
              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName={name}
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(id)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </Row>
      </Table.Row>
    </>
  );
}
