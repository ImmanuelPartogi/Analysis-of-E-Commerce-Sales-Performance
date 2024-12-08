import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Calendar } from "lucide-react";

// Generate sample data (1000 rows)
const generateData = () => {
  const categories = [
    "Electronics",
    "Fashion",
    "Books",
    "Home & Living",
    "Sports",
    "Beauty",
    "Groceries",
  ];
  const cities = [
    "Jakarta",
    "Surabaya",
    "Bandung",
    "Medan",
    "Semarang",
    "Makassar",
    "Yogyakarta",
  ];
  const data = [];

  for (let i = 0; i < 1000; i++) {
    const date = new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    );
    data.push({
      id: i + 1,
      date: date.toISOString().split("T")[0],
      category: categories[Math.floor(Math.random() * categories.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      quantity: Math.floor(Math.random() * 10) + 1,
      price: Math.floor(Math.random() * 1000000) + 50000,
      customerRating: Math.floor(Math.random() * 5) + 1,
    });
  }
  return data;
};

const salesData = generateData();

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Process data for visualizations
  const processSalesByCategory = () => {
    const categoryData = {};
    salesData.forEach((sale) => {
      if (!categoryData[sale.category]) {
        categoryData[sale.category] = 0;
      }
      categoryData[sale.category] += sale.price;
    });
    return Object.entries(categoryData).map(([category, total]) => ({
      category,
      total: total / 1000000, // Convert to millions
    }));
  };

  const processSalesByCity = () => {
    const cityData = {};
    salesData.forEach((sale) => {
      if (!cityData[sale.city]) {
        cityData[sale.city] = 0;
      }
      cityData[sale.city] += sale.price;
    });
    return Object.entries(cityData).map(([city, total]) => ({
      city,
      total: total / 1000000, // Convert to millions
    }));
  };

  const processRatingDistribution = () => {
    const ratingData = {};
    salesData.forEach((sale) => {
      if (!ratingData[sale.customerRating]) {
        ratingData[sale.customerRating] = 0;
      }
      ratingData[sale.customerRating]++;
    });
    return Object.entries(ratingData).map(([rating, count]) => ({
      rating: `${rating} Star`,
      count,
    }));
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#FFA07A",
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Total Transaksi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {salesData.length.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp{" "}
              {(
                salesData.reduce((acc, sale) => acc + sale.price, 0) /
                1000000000
              ).toFixed(2)}{" "}
              M
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rating Rata-rata</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                salesData.reduce((acc, sale) => acc + sale.customerRating, 0) /
                salesData.length
              ).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Penjualan per Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={500} height={300} data={processSalesByCategory()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis
                label={{
                  value: "Total (Juta Rupiah)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Penjualan per Kota</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={500} height={300} data={processSalesByCity()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis
                label={{
                  value: "Total (Juta Rupiah)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#82ca9d" />
            </LineChart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribusi Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart width={500} height={300}>
              <Pie
                data={processRatingDistribution()}
                cx={250}
                cy={150}
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {processRatingDistribution().map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
