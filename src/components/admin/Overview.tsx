import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { 
  Package, MessageSquare, Star, Image as ImageIcon,
  TrendingUp, ArrowUpRight, ArrowDownRight, Clock, Users,
  Phone, Mail, MapPin, CheckCircle, AlertCircle, Eye
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import { motion } from 'motion/react';

const monthlyData = [
  { month: 'Jan', bookings: 42, revenue: 1680 },
  { month: 'Feb', bookings: 38, revenue: 1520 },
  { month: 'Mar', bookings: 65, revenue: 2600 },
  { month: 'Apr', bookings: 82, revenue: 3280 },
  { month: 'May', bookings: 71, revenue: 2840 },
  { month: 'Jun', bookings: 95, revenue: 3800 },
  { month: 'Jul', bookings: 88, revenue: 3520 },
  { month: 'Aug', bookings: 110, revenue: 4400 },
];

const packagePopularity = [
  { name: 'VIP', value: 35, color: '#C9A84C' },
  { name: 'Standard', value: 30, color: '#34d399' },
  { name: 'Economy', value: 25, color: '#60a5fa' },
  { name: 'Custom', value: 10, color: '#a78bfa' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a1f14] border border-white/10 rounded-xl p-3 shadow-2xl">
        <p className="text-white/60 text-xs mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-white text-sm font-bold">{p.value} {p.name === 'revenue' ? 'K PKR' : ''}</span>
            <span className="text-white/40 text-xs capitalize">{p.name}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Overview() {
  const { packages, enquiries, reviews, gallery, agents, partners } = useSystem();

  const newEnquiries = enquiries.filter(e => e.status === 'new').length;
  const confirmedEnquiries = enquiries.filter(e => e.status === 'confirmed').length;

  const statCards = [
    { 
      label: 'Total Packages', 
      value: packages.length || 6, 
      icon: Package, 
      color: 'text-blue-400', 
      bg: 'bg-blue-500/10',
      change: '+2',
      trend: 'up',
      sub: 'Published packages'
    },
    { 
      label: 'Enquiries', 
      value: enquiries.length || 24, 
      icon: MessageSquare, 
      color: 'text-purple-400', 
      bg: 'bg-purple-500/10',
      change: '+8',
      trend: 'up',
      sub: `${newEnquiries} new today`
    },
    { 
      label: 'Total Reviews', 
      value: reviews.length || 15, 
      icon: Star, 
      color: 'text-gold-premium', 
      bg: 'bg-gold-premium/10',
      change: '+3',
      trend: 'up',
      sub: '4.9 avg rating'
    },
    { 
      label: 'Gallery Images', 
      value: gallery.length || 28, 
      icon: ImageIcon, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10',
      change: '+5',
      trend: 'up',
      sub: 'Uploaded media'
    },
    { 
      label: 'Travel Agents', 
      value: agents.length || 4, 
      icon: Users, 
      color: 'text-pink-400', 
      bg: 'bg-pink-500/10',
      change: '+1',
      trend: 'up',
      sub: 'Active agents'
    },
    { 
      label: 'Partner Agencies', 
      value: partners.length || 3, 
      icon: TrendingUp, 
      color: 'text-cyan-400', 
      bg: 'bg-cyan-500/10',
      change: 'Stable',
      trend: 'neutral',
      sub: 'Global network'
    },
  ];

  const recentActivities = [
    { icon: MessageSquare, text: 'New inquiry from Karachi — VIP Umrah Package', time: '2 min ago', type: 'enquiry' },
    { icon: CheckCircle, text: 'Lead confirmed: Ahmed Family — Ramadan Group', time: '18 min ago', type: 'confirm' },
    { icon: Star, text: 'New 5-star review from Shuja Anwaar', time: '1 hour ago', type: 'review' },
    { icon: Package, text: 'Package updated: Economy Umrah Plus', time: '3 hours ago', type: 'package' },
    { icon: Users, text: 'New agent registered: Rehla Travels', time: '5 hours ago', type: 'agent' },
    { icon: Phone, text: 'WhatsApp inquiry: 0321-XXXXXXX (Lahore)', time: 'Yesterday', type: 'enquiry' },
  ];

  return (
    <div className="space-y-8">
      
      {/* ===== STATS GRID ===== */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/3 border border-white/5 rounded-2xl p-5 hover:border-gold-premium/20 transition-all group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2 rounded-xl ${stat.bg} transition-transform group-hover:scale-110`}>
                <stat.icon size={18} className={stat.color} />
              </div>
              <span className={`text-[10px] font-bold flex items-center gap-0.5 ${
                stat.trend === 'up' ? 'text-emerald-400' : stat.trend === 'down' ? 'text-red-400' : 'text-white/40'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight size={10} /> : stat.trend === 'down' ? <ArrowDownRight size={10} /> : null}
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-black text-white mb-0.5">{stat.value}</div>
            <div className="text-white/50 text-[10px] font-bold uppercase tracking-wider">{stat.label}</div>
            <div className="text-white/30 text-[9px] mt-1">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* ===== CHARTS ROW ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Area Chart — Booking Trends */}
        <div className="lg:col-span-2 bg-white/3 border border-white/5 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-white font-bold tracking-wide">Booking Trends</h3>
              <p className="text-white/40 text-xs mt-0.5">Monthly performance overview</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/60 outline-none">
              <option className="bg-emerald-dark">Last 8 Months</option>
              <option className="bg-emerald-dark">Last Year</option>
            </select>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="bookingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="bookings" stroke="#C9A84C" strokeWidth={2} fill="url(#bookingGrad)" />
                <Area type="monotone" dataKey="revenue" stroke="#34d399" strokeWidth={2} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gold-premium" />
              <span className="text-white/50 text-xs">Bookings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-white/50 text-xs">Revenue (K PKR)</span>
            </div>
          </div>
        </div>

        {/* Pie Chart — Package Popularity */}
        <div className="bg-white/3 border border-white/5 rounded-3xl p-6">
          <div className="mb-6">
            <h3 className="text-white font-bold">Package Distribution</h3>
            <p className="text-white/40 text-xs mt-0.5">By category</p>
          </div>
          
          <div className="h-40 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={packagePopularity}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {packagePopularity.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#0a1f14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 mt-4">
            {packagePopularity.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-white/60 text-xs">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 rounded-full bg-white/10" style={{ width: '60px' }}>
                    <div className="h-full rounded-full" style={{ width: `${item.value}%`, background: item.color }} />
                  </div>
                  <span className="text-white/60 text-xs font-bold">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ENQUIRIES STATUS + ACTIVITY ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Enquiry Status Overview */}
        <div className="bg-white/3 border border-white/5 rounded-3xl p-6">
          <h3 className="text-white font-bold mb-5">Enquiry Pipeline</h3>
          <div className="space-y-3">
            {[
              { label: 'New Inquiries', count: enquiries.filter(e => e.status === 'new').length || 8, color: 'bg-blue-400', pct: 33 },
              { label: 'In Progress', count: enquiries.filter(e => e.status === 'in-progress').length || 6, color: 'bg-yellow-400', pct: 25 },
              { label: 'Confirmed', count: enquiries.filter(e => e.status === 'confirmed').length || 7, color: 'bg-emerald-400', pct: 29 },
              { label: 'Rejected', count: enquiries.filter(e => e.status === 'rejected').length || 3, color: 'bg-red-400', pct: 13 },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-32 flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-white/60 text-xs">{item.label}</span>
                </div>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ delay: i * 0.1 + 0.5, duration: 0.8 }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>
                <span className="text-white font-bold text-sm w-6 text-right">{item.count}</span>
              </div>
            ))}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mt-6 border-t border-white/5 pt-5">
            {[
              { label: 'Conversion', value: '58%' },
              { label: 'Avg Response', value: '2h' },
              { label: 'This Month', value: '+24' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-lg font-bold text-gold-premium">{s.value}</div>
                <div className="text-white/30 text-[9px] uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/3 border border-white/5 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-bold">Recent Activity</h3>
            <button className="text-gold-premium text-xs font-bold hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 group"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                  activity.type === 'enquiry' ? 'bg-purple-500/15 text-purple-400' :
                  activity.type === 'confirm' ? 'bg-emerald-500/15 text-emerald-400' :
                  activity.type === 'review' ? 'bg-gold-premium/15 text-gold-premium' :
                  'bg-blue-500/15 text-blue-400'
                }`}>
                  <activity.icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-xs leading-snug">{activity.text}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={9} className="text-white/30" />
                    <span className="text-white/30 text-[10px]">{activity.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="bg-gradient-to-r from-emerald-deep/30 via-black/20 to-gold-premium/10 border border-gold-premium/15 rounded-3xl p-6">
        <h3 className="text-white font-bold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Add Package', icon: Package, color: 'bg-blue-500/20 text-blue-400 border-blue-400/20' },
            { label: 'View Enquiries', icon: MessageSquare, color: 'bg-purple-500/20 text-purple-400 border-purple-400/20' },
            { label: 'Upload Gallery', icon: ImageIcon, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-400/20' },
            { label: 'Add Review', icon: Star, color: 'bg-gold-premium/20 text-gold-premium border-gold-premium/20' },
            { label: 'Manage Agents', icon: Users, color: 'bg-pink-500/20 text-pink-400 border-pink-400/20' },
          ].map((action, i) => (
            <button
              key={i}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all hover:scale-105 ${action.color}`}
            >
              <action.icon size={14} />
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
