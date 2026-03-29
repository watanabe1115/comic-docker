import styles from "./PageSlider.module.css";

type Props = {
  current: number;
  total: number;
  onChange: (page: number) => void;
};

export function PageSlider({ current, total, onChange }: Props) {
  return (
    <input
      type="range"
      min={1}
      max={total}
      value={current}
      onChange={(e) => {
        const value = Number(e.target.value);
        if (value === 1 || value % 2 === 0) {
          onChange(value);
        }
      }}
      className={styles.slider}
    />
  );
}
