import styles from './dashboard.module.css';
import * as echarts from 'echarts';
import TreeMapChart from './treeMapProducts/treeMapProducts';
import { useEffect, useState } from 'react';
import { useDashboardStore } from '@/zstore/dashboard.store';
import { groupProductsByName } from './utils/agrupedProducts';
import { formatToCurrency } from '@/lib/formatToCurrency';
import expandGraficIcon from '@/assets/public/expandGrafic.svg';
import { set } from 'ref-napi';
import GenericTooltip from '@/components/tooltips/GenericToolTip/GenericToolTip';
import cashIcon from '@/assets/public/bloquedIcon.svg';

export default function Dashboard() {
    const { totalProducts } = useDashboardStore();
    const getBills = useDashboardStore((state) => state.getTotalBills);
    const isLoading = useDashboardStore((state) => state.isLoading);
    const sellTotal = useDashboardStore((state) => state.sellTotal);
    const getTotalCurrentSells = useDashboardStore((state) => state.getTotalCurrentSells);
  
  enum DisplayOptions {
    INITIAL_DASHBOARD,
    SHOW_MAIN_GRAFICS,
  }

  enum GraficsOptions {
    INITIAL,
    PRODUCTS_SELLS_TREEMAP,
    OTHER_OPTIO
  }
  
    const agrupedProducts = groupProductsByName(totalProducts);

    const [grafics, setGrafics] = useState<GraficsOptions>(GraficsOptions.INITIAL);
    const [display, setDisplay] = useState<DisplayOptions>(DisplayOptions.INITIAL_DASHBOARD);

  useEffect(() => {
    getBills();
    getTotalCurrentSells();
  }, []);

  return (
    <section className={styles.container}>
      
      <section style={display === DisplayOptions.SHOW_MAIN_GRAFICS && grafics === GraficsOptions.PRODUCTS_SELLS_TREEMAP ? { height: "792px" }:  display === DisplayOptions.SHOW_MAIN_GRAFICS ? {display: "none"} : {} } id='section-1' >
      {
        display === DisplayOptions.SHOW_MAIN_GRAFICS && grafics === GraficsOptions.PRODUCTS_SELLS_TREEMAP ? null : <GenericTooltip w={"45px" } h={"45px"} text='Este gráfico muestra las ventas de los productos de la tienda.'>
        <img  style={{width: "100%", height: "100%"}} src={cashIcon} alt="cash-icon" />
      </GenericTooltip>

      }
        <button onClick={()=>{
          setGrafics(grafics !== GraficsOptions.PRODUCTS_SELLS_TREEMAP ? GraficsOptions.PRODUCTS_SELLS_TREEMAP : GraficsOptions.INITIAL);
          setDisplay(display === DisplayOptions.INITIAL_DASHBOARD ? DisplayOptions.SHOW_MAIN_GRAFICS : DisplayOptions.INITIAL_DASHBOARD);
        }} className={styles.expandButton}><img src={expandGraficIcon} alt="expand-grafics-icon" /></button>
       <div style={display === DisplayOptions.INITIAL_DASHBOARD && grafics === GraficsOptions.PRODUCTS_SELLS_TREEMAP ? {} : {height: "100%" }} className={styles.content}>
       <h2>Ventas del dia: {`$${formatToCurrency(sellTotal)}`}</h2>
        {
          isLoading && <p>Cargando...</p>
        }
          {!isLoading && agrupedProducts && Object.keys(agrupedProducts).length > 0 && <TreeMapChart agrupedProducts={agrupedProducts} />}
       </div>
      </section>
      <section style={display === DisplayOptions.SHOW_MAIN_GRAFICS && grafics === GraficsOptions.OTHER_OPTIO ? { height: "792px" } : display === DisplayOptions.SHOW_MAIN_GRAFICS ? {display: "none"} : {} }>
      <button onClick={()=>{
        setGrafics(grafics !== GraficsOptions.OTHER_OPTIO ? GraficsOptions.OTHER_OPTIO : GraficsOptions.INITIAL);
          setDisplay(display === DisplayOptions.INITIAL_DASHBOARD ? DisplayOptions.SHOW_MAIN_GRAFICS : DisplayOptions.INITIAL_DASHBOARD);
        }} className={styles.expandButton}><img src={expandGraficIcon} alt="expand-grafics-icon" /></button>
      </section>
      {
  [...Array(12)].map((_, index) => (
    <section key={index} style={display === DisplayOptions.SHOW_MAIN_GRAFICS ? { display: "none" } : {}}>
      {index}
    </section>
  ))
}

    </section>
  );
}
