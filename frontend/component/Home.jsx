import React, { useContext } from "react";
import Notes from "./Notes";
export default function Home() {
  return (
    <>
      <h2 className="mt-5">Your Notes</h2>
      <div className="container">
      <Notes />
      </div>
    </>
  );
}
