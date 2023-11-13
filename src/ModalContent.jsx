import React from "react";
import { Html } from '@react-three/drei';

export default function ModalContent({ onClose }) {

  return (
    <Html>
    <div className="modal">
      <div>Prompt 1</div>
      <div><iframe width="560" height="315" src="../prompt1.html"></iframe></div>
      <button onClick={onClose}>Close</button>
    </div>
    </Html>
  );
}