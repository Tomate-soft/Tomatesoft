import { Children, ReactElement } from 'react';
import { DetailsButton } from '../detailsButton.tsx/detailsButton';
import styles from './customTable.module.css';

interface Props {
  headers: string[];
  content: any[];
  title?: string;
  onClick?: () => void;
  detail?: (args: any) => void;
  children?: ReactElement;
}

export default function CustomTable({
  headers,
  content,
  title,
  onClick,
  detail,
  children,
}: Props) {
  return (
    <div className={styles.customTable}>
      {children}
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            {headers.map((element, index) => {
              return <th key={index}>{element}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {content.map((element) => {
            return (
              <tr>
                {Object.keys(element).map((key) => {
                  if (key === '_id' || key === '_') return;
                  if (Array.isArray(element[key])) {
                    return;
                  }
                  return <td key={key}>{element[key]}</td>;
                })}
                {onClick && <td>{<DetailsButton onClick={onClick} />}</td>}
                {detail && (
                  <td>
                    {
                      <DetailsButton
                        onClick={() => {
                          detail(element);
                        }}
                      />
                    }
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
