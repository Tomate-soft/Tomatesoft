import styles from './inputBox.module.css';

interface Props {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options?: string[];
    keys?: string;
}

export default function InputBox({ label, value, onChange, options, keys }: Props) {
    return (
        <div className={styles.inputBox}>
            <label>{label}</label>
            { options ? (
                <select value={value} onChange={(e) => onChange(e.target.value)}>
                    {options.map((option) => (
                        <option key={option} value={option[keys || " "]}>
                            {option[keys || " "]}
                        </option>
                    ))}
                </select>
            ) : (
                <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
            )}
        </div>
    );
}
