'use client'

import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#8884d8', '#00C49F', '#FF8042']

export default function StatsPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/assignment-submissions/count')
                const result = await res.json()
                const pieData = [
                    { name: 'Pending', value: result.pending },
                    { name: 'Accepted', value: result.accepted },
                    { name: 'Rejected', value: result.rejected },
                ]
                setData(pieData)
            } catch (error) {
                console.error('Failed to fetch stats', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])


    if (loading) return <div className="flex justify-center items-center min-h-[80vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>


    return (
        <div className="w-full mx-auto p-4 mb-20">
            <h2 className="text-5xl font-semibold my-20 text-center">Assignment Submission Status</h2>
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={140}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
