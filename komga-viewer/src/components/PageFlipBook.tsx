import HTMLFlipBook from "react-pageflip";
import { forwardRef } from "react";
import styles from "@/components/PageFlipBook.module.css";

type Props = {
  pages: string[];
  startPage: number;
  showPageCorners: boolean;
  onFlip?: (page: number) => void;
};

export const PageFlipBook = forwardRef<any, Props>(function PageFlipBook(
  { pages, startPage, showPageCorners, onFlip },
  ref
) {

  console.log("PageFlipBook.startPage", startPage);

  return (
    <div className={styles.container}>
      <HTMLFlipBook
        key={showPageCorners ? "corners-on" : "corners-off"}
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
        showPageCorners={showPageCorners}
        mobileScrollSupport={true}
        startPage={startPage}
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
