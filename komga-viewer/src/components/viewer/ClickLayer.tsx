import styles from "./ClickLayer.module.css";

type Props = {
  onCenterClick: () => void;
};

export function ClickLayer({ onCenterClick }: Props) {
  return <div className={styles.layer} onClick={onCenterClick} />;
}
