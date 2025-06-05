import ReturnArrowButton from '@/components/customElements/returnArrowButton.tsx/returnArrowButton';
import styles from './sessionDetails.module.css';
import General from './general/general';
import SellsInfo from './info/sellsInfo';
import Resume from './resume/resume';
import { DetailsWithDrawalsTable } from './tables/withDrawals';
interface Props {
  session: any;
  setState: () => void;
}

export default function SessionDetails({ session, setState }: Props) {
  return (
    <main className={styles.container}>
      <header>
        <ReturnArrowButton onClose={setState} />
        <h2>Detalles de la session</h2>
        <span>{session.code}</span>
      </header>
      <section>
        <article>
          <General />
          <SellsInfo />
          <Resume />
        </article>
        <DetailsWithDrawalsTable
          withdrawals={[
            {
              data_one: '#todo',
              data_two: '123',
              data_three: '123',
              data_four: '#todo',
            },
            {
              data_one: '#todo',
              data_two: '#todo',
              data_three: '#todo',
              data_four: '#todo',
            },
          ]}
        />
        //todo : Trabajar modelo, controller, servicios para crear retiros
      </section>
    </main>
  );
}
