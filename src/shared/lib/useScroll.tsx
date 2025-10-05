import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const useScroll = () => {
  const [scrollState, setScrollState] = useState({
    hasScroll: false,
    isScrolled: false,
  });

  const location = useLocation();

  useEffect(() => {
    const hasScroll = document.documentElement.scrollHeight > window.innerHeight;

    const handleScroll = () => {
      setScrollState({
        hasScroll, // не меняется после инициализации
        isScrolled: window.scrollY > 10,
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return scrollState;
};

export { useScroll };
