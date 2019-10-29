import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const TermsPop = (props) => {
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
        <ModalHeader toggle={close}>Terms & Conditions</ModalHeader>
        <ModalBody>
        {ReactHtmlParser(data)}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default TermsPop;