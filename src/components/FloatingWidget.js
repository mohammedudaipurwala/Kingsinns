"use client";
import { useEffect, useState } from "react";

export default function FloatingWidget() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setVisible(true), 500);
  }, []);
  
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        height: "200px",
        backgroundColor: "green",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        padding: "10px",
        display: visible ? "block" : "none",
        borderRadius: "10px",
        zIndex: 1000,
      }}
    >
      <h3>Floating Widget</h3>
      <p>This is an embeddable widget!</p>
    </div>
  );
}
