const ctx = document.getElementById('patientChart').getContext('2d');
const socket = io(); // Conexión al servidor

// Configuración inicial del gráfico
const patientChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Grupo A', 'Grupo B', 'Grupo C'], // Etiquetas de los grupos
    datasets: [
      {
        label: 'Número de Pacientes',
        data: [0, 0, 0], // Valores iniciales
        backgroundColor: ['#FF5733', '#FFC300', '#28A745'], // Colores de las barras
        borderColor: ['#C70039', '#FF5733', '#2E86C1'], // Bordes de las barras
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Actualización en tiempo real
socket.on('patientUpdate', (data) => {
  patientChart.data.datasets[0].data = [data.groupA, data.groupB, data.groupC];
  patientChart.update();
});
