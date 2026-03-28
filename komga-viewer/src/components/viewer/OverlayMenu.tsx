import styles from "./OverlayMenu.module.css";
import { PageSlider } from "./PageSlider";


type Props = {
  visible: boolean;
  current: number;
  total: number;
  onChangePage: (page: number) => void;
};

export function OverlayMenu({ visible, current, total, onChangePage }: Props) {
  if (!visible) return null;

  return (
    <div className={styles.menu}>
      <div className={styles.row}>
        <PageSlider current={current} total={total} onChange={onChangePage} />
        <div className={styles.pageInfo}>{current} / {total}</div>
      </div>
    </div>
  );
}
