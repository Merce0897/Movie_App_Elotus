import { useState, useEffect, useRef } from "react";

interface UseLazyImageOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useLazyImage = (
  src: string,
  options: UseLazyImageOptions = {}
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const { threshold = 0.1, rootMargin = "50px" } = options;

  useEffect(() => {
    const element = imgRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      // Fallback for browsers that don't support Intersection Observer
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!isVisible || !src) return;

    const img = new Image();

    img.onload = () => {
      setIsLoading(false);
      setIsError(false);
    };

    img.onerror = () => {
      setIsLoading(false);
      setIsError(true);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, isVisible]);

  return {
    imgRef,
    isLoading: isLoading || !isVisible,
    isError,
    shouldLoad: isVisible,
  };
};
