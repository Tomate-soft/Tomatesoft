import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface Props {
  agrupedProducts: any;
}

const TreeMapChart = ({ agrupedProducts }: Props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Inicializa el gráfico
    chartInstance.current = echarts.init(chartRef.current);

    const option: echarts.EChartsCoreOption = {
      series: [
        {
          type: "treemap",
          data: Object.keys(agrupedProducts).map((key) => ({
            name: `${key} (${agrupedProducts[key].length})`,
            value: agrupedProducts[key].length,
          })),
        },
      ],
    };

    chartInstance.current.setOption(option);

    // Agregar evento de resize
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, [agrupedProducts]); // Dependencia: actualizar si cambian los datos

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default TreeMapChart;
