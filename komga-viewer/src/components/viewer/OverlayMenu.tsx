import styles from "./OverlayMenu.module.css";
import { PageSlider } from "./PageSlider";


type Props = {
  visible: boolean;
  current: number;
  total: number;
  onChangePage: (page: number) => void;
  onHoverMenu: (isHover: boolean) => void;
};

export function OverlayMenu({ visible, current, total, onChangePage, onHoverMenu }: Props) {
  return (
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
  );
}
