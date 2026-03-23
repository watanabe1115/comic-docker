declare module "react-pageflip" {
  import * as React from "react";

  export interface HTMLFlipBookProps {
    width?: number;
    height?: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;

    drawShadow?: boolean;
    maxShadowOpacity?: number;

    showCover?: boolean;
    mobileScrollSupport?: boolean;

    className?: string;
    style?: React.CSSProperties;

    startZIndex?: number;
    autoSize?: boolean;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;

    startPage?: number;
    flippingTime?: number;
    usePortrait?: boolean;

    onFlip?: (e: any) => void;
    onChangeOrientation?: (e: any) => void;
    onChangeState?: (e: any) => void;

    children?: React.ReactNode;

    /** react-pageflip の未定義プロパティを吸収 */
    [key: string]: any;
  }

  export default class HTMLFlipBook extends React.Component<HTMLFlipBookProps> {}
}