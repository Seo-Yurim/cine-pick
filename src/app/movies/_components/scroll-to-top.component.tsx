import { Button } from "react-aria-components";
import { FaArrowAltCircleUp } from "react-icons/fa";

export function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 rounded-full bg-point-color p-3"
    >
      <FaArrowAltCircleUp className="h-12 w-12 text-white" />
    </Button>
  );
}
