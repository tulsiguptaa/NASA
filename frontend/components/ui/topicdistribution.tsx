'use client';

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TopicDistribution = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#0077B6', // nasa-blue
          '#00B4D8', // tech-cyan
          '#C8102E', // nasa-red
          '#00FF00', // tech-green
          '#7209B7', // purple
          '#4CC9F0', // light blue
          '#F72585', // pink
        ],
        borderColor: [
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/dashboard/topics');
        const topicData = await response.json();
        setData(topicData);
      } catch (error) {
        console.error('Failed to fetch topic distribution:', error);
        // Fallback to mock data if API fails
        setData({
          labels: ['Immune System', 'Bone Health', 'Muscle Atrophy', 'Cardiovascular', 'Radiation Effects', 'Plant Growth', 'Other'],
          datasets: [
            {
              data: [25, 15, 18, 12, 10, 8, 12],
              backgroundColor: [
                '#0077B6', '#00B4D8', '#C8102E', '#00FF00', '#7209B7', '#4CC9F0', '#F72585',
              ],
              borderColor: Array(7).fill('rgba(0, 0, 0, 0.2)'),
              borderWidth: 1,
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopicData();
  }, []);

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: 'white',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          }
        }
      }
    },
  };

  return (
    <div className="bg-black/40 backdrop-blur-md border border-gray-500/30 rounded-xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <h3 className="text-xl font-bold text-white mb-4">Research Area Distribution</h3>
          <p className="text-gray-300 mb-2">
            Percentage breakdown of the 608 studies across major research areas.
          </p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {data.labels.map((label, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
                ></div>
                <span className="text-sm text-gray-300">{label}: {data.datasets[0].data[index]}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 h-[300px]">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TopicDistribution;