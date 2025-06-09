import styles from './SearchBar.module.css';
import searchIcon from '@/assets/public/searchIcon.svg';
import crossIcon from '@/assets/public/crossIcon.svg';

interface SearchBarProps {
  onSearch: (value: string) => void;
  onClear?: boolean;
  value?: string;
  width?: string;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, onClear, value, width, placeholder }: SearchBarProps) => {
  return (
    <div className={styles.searchBar} style={{width: width || '100%'}}>  
        <img src={searchIcon} alt="search-icon" />
        <input
            placeholder={placeholder || "Buscar..."}
            value={value}
            onChange={(e) => {
              const { value } = e.target;
              onSearch(value);
            }}
        />
        {
        onClear && (
            <button onClick={()=> onSearch("")}  >
                <img src={crossIcon} alt="search-icon" />
            </button>
               
            )
        }
    </div>
  );
}