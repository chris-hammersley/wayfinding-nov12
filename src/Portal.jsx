import { useState } from 'react';
import { ReactDOM, createPortal } from 'react-dom';
import ModalContent from './ModalContent';
import { Model } from './Model';
import { Html } from '@react-three/drei';

export default function Portal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>

    <Html>
      {showModal && createPortal(
        <ModalContent open={showModal} onClose={() => setShowModal(false)} />,
        document.getElementById('portal')
      )}
    </Html>
    </>
  );
}