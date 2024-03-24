import { useEffect, useRef } from "react";

export default function Home() {
  const target = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(
        ([e]) => {
          const target = e.target as HTMLElement;
          if (e.isIntersecting) {
            target.style.opacity = "1";
          } else {
            target.style.opacity = "0";
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(target.current as Element);
    }
  }, [target]);
  return (
    <div style={{ marginTop: 800 }}>
      <div
        ref={target}
        style={{
          height: 500,
          textAlign: "center",
          fontSize: "2rem",
          opacity: 0,
          transition: "all 0.5s",
        }}
      >
        <p>Explain Dev Section</p>
      </div>
    </div>
  );
}
