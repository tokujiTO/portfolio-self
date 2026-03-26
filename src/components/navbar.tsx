import Bubble from "./bubble";

export default function Navbar() {
  return (
    <nav className="justify-evenly flex p-4 w-full fixed top-0 left-0 z-10">
      <Bubble icon={"X"} />
    </nav>
  );
}
