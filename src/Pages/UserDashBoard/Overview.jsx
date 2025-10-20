// src/pages/DashboardHome.jsx
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts'
import axios from 'axios'

const API = process.env.DB_USER|| 'http://localhost:5000'

export default function DashboardHome() {
  const [summary, setSummary] = useState(null)
  const [postsPerDay, setPostsPerDay] = useState([])
  const [recentPosts, setRecentPosts] = useState([])

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await axios.get(`${API}/dashboard/summary`)
        setSummary(data)
      } catch (err) {
        console.error(err)
      }
    }

    const fetchPostsPerDay = async () => {
      try {
        const { data } = await axios.get(`${API}/dashboard/posts-per-day`)
        setPostsPerDay(data)
      } catch (err) {
        console.error(err)
      }
    }

    const fetchRecent = async () => {
      try {
        const { data } = await axios.get(`${API}/dashboard/recent-posts`)
        setRecentPosts(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchSummary()
    fetchPostsPerDay()
    fetchRecent()
  }, [])

  // mock time tracker progress (you can replace with actual user time tracking later)
  const timeProgress = 62 // percent

  return (
    <div className="space-y-6">
      {/* Top KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-white shadow">
          <div className="text-sm text-gray-500">Employees</div>
          <div className="text-3xl font-semibold">{summary?.totals?.users ?? '—'}</div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-white shadow">
          <div className="text-sm text-gray-500">Posts</div>
          <div className="text-3xl font-semibold">{summary?.totals?.posts ?? '—'}</div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-white shadow">
          <div className="text-sm text-gray-500">Announcements</div>
          <div className="text-3xl font-semibold">{summary?.totals?.announcements ?? '—'}</div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-pink-50 to-white shadow">
          <div className="text-sm text-gray-500">Net Votes</div>
          <div className="text-3xl font-semibold">{(summary?.votes?.upVotes ?? 0) - (summary?.votes?.downVotes ?? 0)}</div>
        </div>
      </div>

      {/* Charts + time tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl p-4 shadow">
          <h3 className="font-semibold mb-3">Posts (last 7 days)</h3>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={postsPerDay}>
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" radius={[6,6,0,0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow flex flex-col items-center justify-center">
          <h3 className="font-semibold mb-2">Work Time This Week</h3>

          <div style={{ width: 160, height: 160 }}>
            <ResponsiveContainer>
              <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={[{ name: 'Work', value: timeProgress, fill: '#f59e0b' }]} startAngle={90} endAngle={-270}>
                <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                <Legend />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 text-xl font-semibold">{timeProgress}%</div>
          <div className="text-sm text-gray-500">of target</div>
        </div>
      </div>

      {/* Recent posts + Onboarding / Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow">
          <h3 className="font-semibold mb-4">Recent Posts</h3>
          <ul className="space-y-3">
            {recentPosts.map((p) => (
              <li key={p._id} className="p-3 border rounded-md hover:shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{p.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</div>
                </div>
              </li>
            ))}
            {recentPosts.length === 0 && <li className="text-gray-500">No recent posts</li>}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="font-semibold mb-3">Onboarding</h3>
          <div className="space-y-3">
            {/* Minimal example: you can map real onboarding tasks from announcements or reports */}
            <div className="p-3 bg-gray-50 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Team Meeting</div>
                  <div className="text-xs text-gray-500">Sep 13, 10:30</div>
                </div>
                <div className="text-sm text-green-600 font-semibold">Done</div>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Project Update</div>
                  <div className="text-xs text-gray-500">Sep 13, 13:00</div>
                </div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">HR Policy Review</div>
                  <div className="text-xs text-gray-500">Sep 13, 16:30</div>
                </div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Membership breakdown (simple visualization) */}
      <div className="bg-white rounded-xl p-4 shadow">
        <h3 className="font-semibold mb-3">Membership Breakdown</h3>
        <div className="flex gap-4 items-center">
          {summary?.membershipBreakdown?.map((m) => (
            <div key={m._id} className="p-3 rounded border w-40 text-center">
              <div className="text-sm text-gray-500">{m._id || 'unknown'}</div>
              <div className="text-2xl font-semibold">{m.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
