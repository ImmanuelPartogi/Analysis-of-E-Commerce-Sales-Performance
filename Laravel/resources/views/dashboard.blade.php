<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-commerce Analytics Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
</head>

<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">E-commerce Analytics Dashboard</h1>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-gray-500 text-sm font-medium">Total Transaksi</h2>
                <p class="text-2xl font-bold">{{ number_format($totalSales) }}</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-gray-500 text-sm font-medium">Total Pendapatan</h2>
                <p class="text-2xl font-bold">Rp {{ number_format($totalRevenue, 0, ',', '.') }}</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-gray-500 text-sm font-medium">Rating Rata-rata</h2>
                <p class="text-2xl font-bold">{{ number_format($averageRating, 2) }}</p>
            </div>
        </div>

        <!-- Charts -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-lg font-medium mb-4">Penjualan per Kategori</h2>
                <canvas id="categoryChart"></canvas>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-lg font-medium mb-4">Penjualan per Kota</h2>
                <canvas id="cityChart"></canvas>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-lg font-medium mb-4">Distribusi Rating</h2>
                <canvas id="ratingChart"></canvas>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-lg font-medium mb-4">Penjualan Bulanan</h2>
                <canvas id="monthlyChart"></canvas>
            </div>
        </div>
    </div>

    <script>
        // Category Chart
        new Chart(document.getElementById('categoryChart'), {
            type: 'bar',
            data: {
                labels: {!! json_encode($salesByCategory->pluck('category')) !!},
                datasets: [{
                    label: 'Total Penjualan (Rp)',
                    data: {!! json_encode($salesByCategory->pluck('total')) !!},
                    backgroundColor: 'rgba(54, 162, 235, 0.5)'
                }]
            }
        });

        // City Chart
        new Chart(document.getElementById('cityChart'), {
            type: 'line',
            data: {
                labels: {!! json_encode($salesByCity->pluck('city')) !!},
                datasets: [{
                    label: 'Total Penjualan (Rp)',
                    data: {!! json_encode($salesByCity->pluck('total')) !!},
                    borderColor: 'rgba(75, 192, 192, 1)'
                }]
            }
        });

        // Rating Chart
        new Chart(document.getElementById('ratingChart'), {
            type: 'pie',
            data: {
                labels: {!! json_encode($ratingDistribution->pluck('customer_rating')) !!},
                datasets: [{
                    data: {!! json_encode($ratingDistribution->pluck('count')) !!},
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)'
                    ]
                }]
            }
        });

        // Monthly Chart
        new Chart(document.getElementById('monthlyChart'), {
            type: 'line',
            data: {
                labels: {!! json_encode($monthlySales->pluck('month')) !!},
                datasets: [{
                    label: 'Total Penjualan (Rp)',
                    data: {!! json_encode($monthlySales->pluck('total')) !!},
                    borderColor: 'rgba(153, 102, 255, 1)'
                }]
            }
        });
    </script>
</body>

</html>
