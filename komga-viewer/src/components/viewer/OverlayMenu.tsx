import styles from "./OverlayMenu.module.css";
import { PageSlider } from "./PageSlider";


type Props = {
  visible: boolean;
  current: number;
  total: number;
  onChangePage: (page: number) => void;
};

export function OverlayMenu({ visible, current, total, onChangePage }: Props) {
  return (
    <div className={`${styles.bottomMenu} ${visible ? styles.visible : ""}`}>
      <div className={styles.row}>
        <PageSlider current={current} total={total} onChange={onChangePage} />
        <div className={styles.pageInfo}>{current} / {total}</div>
      </div>
    </div>
  );
}
