const visitsDistChart = document.querySelector('#visitsDistChart');
const paymentDistChart = document.querySelector('#paymentDistChart');

const kids = document.querySelector("#kidsValue").value
const adults = document.querySelector("#adultsValue").value
const elders = document.querySelector("#eldersValue").value

const cash = document.querySelector("#cashValue").value
const bankTransfer = document.querySelector("#bankTransferValue").value
const mobilePay = document.querySelector("#mobilePayValue").value
const other = document.querySelector("#otherValue").value

new Chart(visitsDistChart, {
  type: 'pie',
  data: {
    labels: ['Niños', 'Adultos', 'Adultos Mayores'],
    datasets: [
        {
          label: 'Cantidad',
          data: [kids, adults, elders],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(75, 192, 192)'
          ],
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(75, 192, 192, 0.7)'
          ]
        }
      ]
  },
  options: {
    resposive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
          position: 'bottom'
      }
    }
  }
});

new Chart(paymentDistChart, {
  type: 'doughnut',
  data: {
    labels: ['Transferencia', 'Pago Móvil', 'Efectivo', 'Otro'],
    datasets: [
        {
          label: 'Cantidad',
          data: [bankTransfer, mobilePay, cash, other],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(75, 192, 192)',
            'rgb(201, 203, 207)'
          ],
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgb(54, 162, 235, 0.7)',
            'rgb(75, 192, 192, 0.7)',
            'rgb(201, 203, 207, 0.7)'
          ]
        }
      ]
  },
  options: {
    resposive: true,
    maintainAspectRatio: false,
     
    plugins: {
      legend: {
          position: 'bottom'
      }
    }
  }
});