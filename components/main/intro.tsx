import { useEffect, useRef, useState } from "react";
/**
 * 서비스 안정화 하는 이유
 * 1. 서버 정전 너무 잦음
 * 2. api 및 코드 변경 필요시 클라이언트 위주 프로그래밍은 안좋음
 * 3. 보안이 너무 취약함
 * 4. 서비스 규모가 커짐에 따라 대응 필요
 * 5. 이런 내용들을 업데이트할때 좀 더 쉽게 하고싶음
 * 기능 추가
 * 1. 웹 서비스 추가
 *
 */
export default function Home() {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target.current) {
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
    <div>
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
        <p>Intro Section</p>
      </div>
    </div>
  );
}
