import styles from './onOffCheckBox.module.css';

interface Props {
  action: () => void;
  state: boolean;
}

export default function OnOffCheckBox({ action, state }: Props) {
  return (
    <div className={styles.container}>
      <input
        className={styles.check}
        type="checkbox"
        id="checkbox"
        checked={state}
        onClick={action}
      />
    </div>
  );
}
