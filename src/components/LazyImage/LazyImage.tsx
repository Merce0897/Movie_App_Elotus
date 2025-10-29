import React from "react";
import { useLazyImage } from "../../hooks/useLazyImage";
import "./LazyImage.scss";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  threshold?: number;
  rootMargin?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  placeholder,
  threshold = 0.1,
  rootMargin = "50px",
}) => {
  const { imgRef, isLoading, isError, shouldLoad } = useLazyImage(src, {
    threshold,
    rootMargin,
  });

  return (
    <div
      className={`lazy-image-container ${className}`}
      style={{ width, height }}
    >
      {/* Skeleton loader */}
      {isLoading && (
        <div className="lazy-image-skeleton">
          <div className="skeleton-shimmer" />
        </div>
      )}

      {/* Error fallback */}
      {isError && (
        <div className="lazy-image-error">
          <div className="error-icon">📷</div>
          <span className="error-text">Failed to load image</span>
        </div>
      )}

      {/* Actual image */}
      <img
        ref={imgRef}
        src={shouldLoad ? src : placeholder}
        alt={alt}
        width={width}
        height={height}
        className={`lazy-image ${isLoading ? "loading" : ""} ${
          isError ? "error" : ""
        }`}
        style={{
          opacity: isLoading || isError ? 0 : 1,
        }}
        loading="lazy" // Native lazy loading as fallback
      />
    </div>
  );
};
