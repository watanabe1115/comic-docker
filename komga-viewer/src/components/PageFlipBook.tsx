import HTMLFlipBook from "react-pageflip";
import { forwardRef } from "react";
import styles from "@/components/PageFlipBook.module.css";

type Props = {
  pages: string[];
  onFlip?: (page: number) => void;
};

export const PageFlipBook = forwardRef<any, Props>(function PageFlipBook(
  { pages, onFlip },
  ref
) {
  return (
    <div className={styles.container}>
      <HTMLFlipBook
        ref={ref}
        width={850}
        height={1200}
        size="stretch"
        minWidth={300}
        maxWidth={2000}
        minHeight={400}
        maxHeight={3000}
        drawShadow={true}
        maxShadowOpacity={0.4}
        flippingTime={800}
        usePortrait={true}
        showCover={false}
        mobileScrollSupport={true}
        startPage={pages.length - 1}
        className={styles.flipbook}
        onFlip={(e) => onFlip?.(e.data)}
      >
        {pages.map((url, i) => (
          <img key={i} src={url} alt={`page-${i}`} className={styles.page}/>
        ))}
      </HTMLFlipBook>
    </div>
  );
});
