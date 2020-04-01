const main = async () => {
  const url = 'https://pomber.github.io/covid19/timeseries.json';
  const res = await axios.get(url);
  const japan = res.data.Japan;

  const date = R.map(_ => _.date, japan);
  const confirmed = R.map(_ => _.confirmed, japan);
  const deaths = R.map(_ => _.deaths, japan);
  const recovered = R.map(_ => _.recovered, japan);

  const container = document.querySelector('#chart-container');
  container.style.height = '90vh';

  const canvas = 'chart-canvas';
  const lineChart = new Chart(canvas, {
    type: window.innerWidth > window.innerHeight ? 'bar' : 'horizontalBar',
    data: {
      labels: date,
      datasets: [{
        label: 'Confirmed',
        backgroundColor: '#ad1457',
        data: confirmed
      }, {
        label: 'Deaths',
        backgroundColor: '#303030',
        data: deaths
      }, {
        label: 'Recovered',
        backgroundColor: '#00838f',
        data: recovered
      }]
    },
    options: {
      responsive: true,
      responsiveAnimationDuration: 500,
      maintainAspectRatio: false
    }
  });
};

window.addEventListener('load', () => {
  main();
});
