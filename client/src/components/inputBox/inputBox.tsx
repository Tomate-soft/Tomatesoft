import styles from './inputBox.module.css';

// hoy reload the page to see the changes

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
                <select value={value[keys]}  onChange={(e) => {
                        const selected = options?.find(opt => opt[keys] === e.target.value);
                        if (selected) onChange(selected);
                    }}>
                    {options.map((option) => (
                        <option key={option[keys]} value={option[keys || " "]}>
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
