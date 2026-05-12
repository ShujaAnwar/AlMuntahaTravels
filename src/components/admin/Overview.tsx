import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Package, 
  MessageSquare, 
  Star, 
  Image as ImageIcon,
  TrendingUp,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';

const data = [
  { name: 'Jan', bookings: 400 },
  { name: 'Feb', bookings: 300 },
  { name: 'Mar', bookings: 600 },
  { name: 'Apr', bookings: 800 },
  { name: 'May', bookings: 500 },
  { name: 'Jun', bookings: 900 },
];

export default function Overview() {
  const { packages, enquiries, reviews, gallery } = useSystem();

  const stats = [
    { label: 'Packages', value: packages.length, icon: Package, color: 'bg-blue-500' },
    { label: 'Enquiries', value: enquiries.length, icon: MessageSquare, color: 'bg-purple-500' },
    { label: 'Reviews', value: reviews.length, icon: Star, color: 'bg-yellow-500' },
    { label: 'Gallery', value: gallery.length, icon: ImageIcon, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-dark p-6 rounded-[2rem] border border-white/5 group hover:border-gold-premium/30 transition-all duration-500">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.color} bg-opacity-10 text-white`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full uppercase tracking-widest">
                <ArrowUpRight size={12} />
                +12%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-white/40 text-xs uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Charts */}
        <div className="glass-dark p-8 rounded-[2.5rem] border border-white/5">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-serif font-bold text-white uppercase tracking-wider">Booking Trends</h3>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Monthly performance</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-gold-premium"></span>
                 <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Bookings</span>
               </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#010a08', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '1rem',
                    color: '#fff'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#d4af37" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorBookings)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-dark p-8 rounded-[2.5rem] border border-white/5">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-serif font-bold text-white uppercase tracking-wider">Recent Activity</h3>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Latest updates</p>
            </div>
            <Clock size={20} className="text-white/20" />
          </div>

          <div className="space-y-6">
            {enquiries.slice(0, 5).map((enquiry, i) => (
              <div key={enquiry.id} className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-xl bg-gold-premium/10 flex items-center justify-center text-gold-premium group-hover:bg-gold-premium group-hover:text-black transition-all">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">New enquiry from <span className="text-gold-premium">{enquiry.name}</span></p>
                  <p className="text-xs text-white/40 mt-1">{enquiry.package} Package • {enquiry.date}</p>
                </div>
              </div>
            ))}
            {enquiries.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/20 text-sm uppercase tracking-widest">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
