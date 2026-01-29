import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLDivElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title } = slide;

  return (
    <div
      ref={slideRef}
      className={cn(
        "group relative h-full w-full cursor-pointer overflow-hidden rounded-2xl",
        current === index ? "z-10" : "z-0",
      )}
      onClick={() => handleSlideClick(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          current !== index
            ? "scale(0.98) rotateX(8deg)"
            : "scale(1) rotateX(0deg)",
        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        transformOrigin: "bottom",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(600px circle at var(--x) var(--y), rgba(29, 78, 216, 0.15), transparent 40%)`,
        }}
      />
      {current === index && (
        <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl border border-white/20" />
      )}

      <img
        src={src}
        alt={title}
        className="h-full w-full object-cover opacity-0 transition-opacity duration-500"
        onLoad={imageLoaded}
      />

      <div className="absolute inset-0 z-10 flex flex-col items-start justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent p-8">
        <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
        <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-all hover:gap-4">
          {button}
          <IconArrowNarrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      onClick={handleClick}
      className={cn(
        "absolute top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all hover:bg-white",
        type === "previous" ? "left-4" : "right-4",
      )}
      title={title}
    >
      <IconArrowNarrowRight
        className={cn(
          "h-6 w-6 text-black",
          type === "previous" && "rotate-180",
        )}
      />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-2xl">
      {slides.map((slide, index) => (
        <Slide
          key={`${id}-${index}`}
          slide={slide}
          index={index}
          current={current}
          handleSlideClick={handleSlideClick}
        />
      ))}

      <CarouselControl
        type="previous"
        title="Previous slide"
        handleClick={handlePreviousClick}
      />
      <CarouselControl
        type="next"
        title="Next slide"
        handleClick={handleNextClick}
      />
    </div>
  );
}
