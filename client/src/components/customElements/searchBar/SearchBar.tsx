import styles from './SearchBar.module.css';
import searchIcon from '@/assets/public/searchIcon.svg';
import crossIcon from '@/assets/public/crossIcon.svg';

interface SearchBarProps {
  onSearch: (value: string) => void;
  onClear?: boolean;
  value?: string;
}

export const SearchBar = ({ onSearch, onClear, value }: SearchBarProps) => {
  return (
    <div className={styles.searchBar}>  
        <img src={searchIcon} alt="search-icon" />
        <input
            placeholder="Search..."
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