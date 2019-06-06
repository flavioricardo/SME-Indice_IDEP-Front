import echarts from "echarts";
import ecStat from "echarts-stat";
import {
  ANOS_META,
  getIndicesAnoInicial,
  getMetaAnos
} from "../../services/idep";

const roundNumber = number => {
  return parseFloat(Number(number).toFixed(2));
};

export const getHistogramOption = async codEOL => {
  const meta = await getIndicesAnoInicial(codEOL);

  const { indices, indice_da_escola, erro } = meta;
  if (!indices && !indice_da_escola) {
    return `Erro: ${erro}`;
  }

  let bins = ecStat.histogram(indices);
  const colorAll = "#75BCFC";
  const colorSelected = "#FF6C7B";

  let interval;
  let min = Infinity;
  let max = -Infinity;

  let data = echarts.util.map(bins.data, (item, index) => {
    let x0 = roundNumber(bins.bins[index].x0);
    let x1 = roundNumber(bins.bins[index].x1);
    interval = roundNumber(x1 - x0);
    min = roundNumber(Math.min(min, x0));
    max = roundNumber(Math.max(max, x1));
    return [x0, x1, roundNumber(item[1])];
  });

  const renderItem = (params, api) => {
    let yValue = api.value(2);
    let start = api.coord([api.value(0), yValue]);
    let size = api.size([api.value(1) - api.value(0), yValue]);
    let style = api.style();

    if (indice_da_escola >= api.value(0) && indice_da_escola <= api.value(1)) {
      style.fill = colorSelected;
      style.textStroke = colorSelected;
    } else {
      style.fill = colorAll;
      style.textStroke = colorAll;
    }

    return {
      type: "rect",
      shape: {
        x: start[0] + 1,
        y: start[1],
        width: size[0] - 2,
        height: size[1]
      },
      style: style
    };
  };

  // Aqui é a variavel que interessa...

  let histogramOption = {
    toolbox: {
      feature: {
        saveAsImage: { show: true, name: "metas", title: "Salvar" }
      }
    },
    color: colorAll,
    grid: {
      top: 80,
      containLabel: true
    },
    xAxis: [
      {
        type: "value",
        min: min,
        max: max,
        interval: interval,
        name: "Meta",
        nameLocation: "middle",
        nameGap: 30
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "Número de escolas",
        nameLocation: "middle",
        nameGap: 30
      }
    ],
    series: [
      {
        name: "height",
        type: "custom",
        renderItem: renderItem,
        label: {
          normal: {
            show: true,
            position: "insideTop"
          }
        },
        encode: {
          x: [0, 1],
          y: 2,
          tooltip: 2,
          label: 2
        },
        data: data
      }
    ]
  };
  return histogramOption;
};

let metaOption = {
  color: ["#75BCFC", "#1B80D4", "#FF6C7C", "#422593"],

  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross"
    }
  },
  grid: {
    right: "20%"
  },
  toolbox: {
    feature: {
      saveAsImage: { show: true, name: "histograma", title: "Salvar" }
    }
  },
  legend: {
    data: ["Inicial", "Final", "Meta inicial", "Meta final"]
  },
  xAxis: [
    {
      type: "category",
      axisTick: {
        alignWithLabel: true
      },
      data: ["2018", "2019", "2020", "2021", "2022", "2023"],
      name: "Ano",
      nameLocation: "middle",
      nameGap: 30
    }
  ],
  yAxis: [
    {
      type: "value",
      name: "Meta",
      min: 0,
      max: 10,
      position: "left",
      nameLocation: "middle",
      nameGap: 30
    }
  ],
  series: [
    {
      name: "Inicial",
      type: "bar",
      data: []
    },
    {
      name: "Meta inicial",
      type: "line",
      data: []
    },
    {
      name: "Final",
      type: "bar",
      data: []
    },

    {
      name: "Meta final",
      type: "line",
      data: []
    }
  ]
};

export const getMetasIniciaisOption = async codEol => {
  getMetaAnos(parseInt(codEol), ANOS_META.INICIAIS).then(inicial => {
    // para tirar o primeiro elemento e concatenar com zeros...
    // necessario por motivo de endpoint insuficiente
    metaOption.series[0].data = inicial.metas
      .slice(0, 1)
      .concat([0, 0, 0, 0, 0]);
    metaOption.series[1].data = inicial.metas;
    metaOption.xAxis[0].data = inicial.anos;
  });

  getMetaAnos(parseInt(codEol), ANOS_META.FINAIS).then(final => {
    // para tirar o primeiro elemento e concatenar com zeros...
    // necessario por motivo de endpoint insuficiente
    metaOption.series[2].data = final.metas.slice(0, 1).concat([0, 0, 0, 0, 0]);
    metaOption.series[3].data = final.metas;
  });

  return metaOption;
};
