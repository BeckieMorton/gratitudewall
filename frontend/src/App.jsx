import React from "react";
import { Header } from "./components/Header/Header";
import { PostNote } from "./components/PostNote/PostNote";
import { DisplayNotes } from "./components/DisplayNotes/DisplayNotes";
import { Footer } from "./components/Footer/Footer";

export const App = () => {
  return (
    <div>
      <Header />
      <PostNote />
      <DisplayNotes />
      <Footer />
    </div>
  );
};
