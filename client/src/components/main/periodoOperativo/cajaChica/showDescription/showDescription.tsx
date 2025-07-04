import CloseButton from "@/components/customElements/CloseButton";
import styles from "./showDescription.module.css";


interface Props {
  onClose: any;
  children: any;
}

export default function ShowDescription({
  children,
  onClose
}: Props) {
  return (
    <main className={styles.screen}>
      <div>
        <CloseButton onClose={onClose} />
        <strong>Descripcíon</strong>
        <main>
            <h2>{children}</h2>
        </main>
      </div>
    </main>
  );
}
