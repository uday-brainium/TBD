import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const PrivacyModal = (props) => {
  const {
    buttonLabel,
    className,
    show,
    close,
    data
  } = props;

  return (
    <div>
      <Modal isOpen={show} toggle={close} className={className}>
        <ModalHeader toggle={close}>Privacy policy</ModalHeader>
        <ModalBody>
        {ReactHtmlParser(data)}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PrivacyModal;