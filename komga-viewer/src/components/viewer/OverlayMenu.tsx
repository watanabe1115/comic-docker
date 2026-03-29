import styles from "./OverlayMenu.module.css";
import { PageSlider } from "./PageSlider";


type Props = {
  visible: boolean;
  current: number;
  total: number;
  title?: string;
  onBack: () => void;
  onToggleFullscreen: () => void;
  onChangePage: (page: number) => void;
  onHoverMenu: (isHover: boolean) => void;
};

export function OverlayMenu({ visible, current, total, title, onBack, onToggleFullscreen, onChangePage, onHoverMenu }: Props) {
  return (
    <>
      {/* ▼ TopMenu */}
      {/* ▼ TopMenu */}
      <div
        className={`${styles.topMenu} ${visible ? styles.visible : ""}`}
        onMouseEnter={() => onHoverMenu(true)}
        onMouseLeave={() => onHoverMenu(false)}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerMove={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
      >
        {/* 左：戻る */}
        <button className={styles.iconButton} onClick={onBack}>
          <span className={styles.icon}>←</span>
        </button>

        {/* 中央：書籍名 */}
        <div className={styles.title}>{title ?? ""}</div>

        {/* 右：全画面 */}
        <button className={styles.iconButton} onClick={onToggleFullscreen}>
          <span className={styles.icon}>⛶</span>
        </button>
      </div>


      {/* ▼ BottomMenu（あなたの現在の構造） */}
      <div
        className={`${styles.bottomMenu} ${visible ? styles.visible : ""}`}
        onMouseEnter={() => onHoverMenu(true)}
        onMouseLeave={() => onHoverMenu(false)}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerMove={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
      >
        <div className={styles.row}>
          <PageSlider current={current} total={total} onChange={onChangePage} />
          <div className={styles.pageInfo}>{current} / {total}</div>
        </div>
      </div>
    </>
  );
}
