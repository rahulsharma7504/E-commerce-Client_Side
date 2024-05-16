import React, { useState } from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Modal body content goes here */}
            Your modal content here...
          </ModalBody>
          <ModalFooter>
            {/* Modal footer content goes here */}
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* Additional buttons if needed */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Example;
