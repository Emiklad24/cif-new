const mapOptions = {
  chart: {
    map: "Nigerian Chart",
  },
  title: {
    text: "Nigerian Chart",
  },
  credits: {
    enabled: false,
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: "bottom",
    },
  },
  tooltip: {
    headerFormat: "",
    pointFormat: "{point.name}: {point.value}",
  },
  colorAxis: {
    min: 0,
  },
  series: [
    {
      name: "",
      type: "map",
      mapData: [],
      data: [],
      showInLegend: true,
      borderColor: "#dddddd",
      nullColor: "rgba(200, 200, 200, 0.3)",
      states: {
        hover: {
          color: "#eeeeee"
        },
      },
      dataLabels: {
        enabled: true,
        format: "{point.name}",
      },
    },
  ],
};

export default mapOptions;
