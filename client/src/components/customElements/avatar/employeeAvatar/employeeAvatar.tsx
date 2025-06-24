import styles from './employeeAvatar.module.css';

interface Props {
   name: string;
   color?: string;
}

export default function EmployeeAvatar({ name, color }: Props) {
    return (
        <strong style={{ backgroundColor: color }} className={styles.avatar}>{name[0].toUpperCase()}</strong>
    );
}
