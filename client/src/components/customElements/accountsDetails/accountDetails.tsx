import ReturnArrowButton from '../returnArrowButton.tsx/returnArrowButton';
import styles from './accountDetails.module.css';
import { GeneralInfo } from './info/general';
import { AccountInfo } from './info/account';
import { DiscountInfo } from './info/discount';
import DetailsNoteTables from './tables/noteTables';
import { FooterDetails } from '../footerDetails/footerDetails';
import useDetail from '@/hooks/useDetail';
import { formatDiscount } from '@/utils/sellTypeDiscountFormat';
import { DISCOUNTS_PATH } from '@/lib/path.lib';
import { useState } from 'react';
import DetailsProductsTable from './tables/productsTables';
import TomateLoader from '@/components/loaders/tomateLoader/tomateLoader';

enum DetailProcess {
  ORDER_DETAILS = 'ORDER_DETAILS',
  NOTES_DETAILS = 'NOTES_DETAILS',
}
interface Props {
  account: any;
  setState: () => void;
}

export const AccountDetails = ({ account, setState }: Props) => {
  const URL = account.discount ? `${DISCOUNTS_PATH}/${account.discount}` : '';
  const { data, isLoading } = useDetail<any>(URL);
  const formatedDiscount = formatDiscount(data);

  const [detailProcess, setDetailProces] = useState(
    DetailProcess.ORDER_DETAILS,
  );
  const [selectedNote, setSelectedNote] = useState({});

  return (
    <main className={styles.container}>
      {detailProcess === DetailProcess.ORDER_DETAILS && (
        <>
          <section>
            <header>
              <ReturnArrowButton onClose={setState} />
              <h2>{`Detalles de la cuenta: ${account.code}`}</h2>
              <span>{account.status}</span>
            </header>
            <div className={styles.detailContainer}>
              <article>
                <GeneralInfo account={account} />
                <AccountInfo account={account} />
                {isLoading ? (
                  <div className={styles.loading}>
                    <TomateLoader />
                  </div>
                ) : (
                  <DiscountInfo discount={formatedDiscount} />
                )}
              </article>
              {account.notesArray?.length > 0 ? (
                <DetailsNoteTables
                  notesArray={account.notesArray}
                  action={(args: any) => {
                    setSelectedNote(args);
                    setDetailProces(DetailProcess.NOTES_DETAILS);
                  }}
                />
              ) : (
                <DetailsProductsTable productsArray={account.productsDetails} />
              )}
            </div>
          </section>
        </>
      )}
      {detailProcess === DetailProcess.NOTES_DETAILS && (
        <>
          <section>
            <header>
              <ReturnArrowButton
                onClose={() => {
                  setDetailProces(DetailProcess.ORDER_DETAILS);
                }}
              />
              <h2>{`Detalles de la nota: ${selectedNote.number}`}</h2>
              <span>{selectedNote.status}</span>
            </header>
            <DetailsProductsTable productsArray={selectedNote.products} />
          </section>
        </>
      )}
      <FooterDetails account={account} discount={formatedDiscount} />
    </main>
  );
};
