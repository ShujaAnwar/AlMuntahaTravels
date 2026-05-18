-- SQL Schema for AMTS Project (Al Muntaha Travels Solutions)

-- 1. Create Packages Table
CREATE TABLE IF NOT EXISTS packages (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Economy', 'Standard', 'VIP', 'Custom')),
  duration TEXT NOT NULL,
  price TEXT NOT NULL,
  hotelDetails TEXT NOT NULL,
  distanceFromHaram TEXT NOT NULL,
  transportDetails TEXT NOT NULL,
  image TEXT NOT NULL,
  features TEXT[] NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('en', 'ur')),
  avatar TEXT,
  date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  category TEXT NOT NULL CHECK (category IN ('Makkah', 'Madinah', 'Tours')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create Partners Table
CREATE TABLE IF NOT EXISTS partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('ongoing', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create Groups Table
CREATE TABLE IF NOT EXISTS groups (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  slots TEXT NOT NULL,
  status TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create Leads (Inquiries) Table
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  personal JSONB NOT NULL,
  journey JSONB NOT NULL,
  makkah JSONB NOT NULL,
  madinah JSONB NOT NULL,
  rooms JSONB NOT NULL,
  food JSONB NOT NULL,
  transport JSONB NOT NULL,
  extras TEXT[] NOT NULL,
  budget JSONB NOT NULL,
  notes TEXT,
  status TEXT NOT NULL CHECK (status IN ('New', 'Assigned', 'Confirmed', 'Completed', 'Cancelled')),
  createdAt TEXT NOT NULL,
  assignedTo TEXT,
  assignedAt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create Video Reviews Table
CREATE TABLE IF NOT EXISTS video_reviews (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  youtubeId TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Create Company Info Table
CREATE TABLE IF NOT EXISTS company_info (
  id TEXT PRIMARY KEY DEFAULT 'default',
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  heroTitle TEXT NOT NULL,
  heroSub TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initial Data Injection

-- Initial Packages
INSERT INTO packages (id, title, category, duration, price, hotelDetails, distanceFromHaram, transportDetails, image, features, description)
VALUES 
('1', 'Ramadan Special Umrah', 'VIP', '15 Days', 'Rs. 695,000 | 9,350 SAR', '5* Pullman ZamZam Makkah', '0m (In Clock Tower)', 'Private GMC Transport', 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80', ARRAY['Visa Included', 'Ziyarat of Makkah & Madinah', 'Buffet Suhoor & Iftar', 'Expert Guide'], 'Experience the spiritual rewards of Ramadan in the Holy Cities.'),
('2', 'Economy Umrah Plus', 'Economy', '10 Days', 'Rs. 325,000 | 4,380 SAR', '3* Hotel in Misfalah', '600m with Shuttle', 'Shared Bus', 'https://images.unsplash.com/photo-1565551905470-24dd30277053?auto=format&fit=crop&q=80', ARRAY['Visa Included', 'Group Leader', 'Budget Friendly'], 'Affordable Umrah with essential comfort for pilgrim seekers.')
ON CONFLICT (id) DO NOTHING;

-- Initial Groups
INSERT INTO groups (id, title, date, slots, status, image)
VALUES 
('g1', 'Ramadan Special Group', 'March 2026', '5 Slots Left', 'Filling Fast', 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=600'),
('g2', 'Summer Spiritual Retreat', 'July 2026', '15 Slots Left', 'Open', 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&q=80&w=600')
ON CONFLICT (id) DO NOTHING;

-- Initial Company Info
INSERT INTO company_info (id, phone, whatsapp, email, address, heroTitle, heroSub)
VALUES (
  'default', 
  '0313-2710182 | 0316-8629934', 
  '0313-2710182', 
  'almuntahatravels.solutions@gmail.com', 
  'MRC Colony, Malir Halt, Karachi', 
  'Your Trusted Journey Towards Haram', 
  'Al Muntaha TRAVELS SOLUTIONS - Experience the spiritual heights with Barakah and Trust.'
)
ON CONFLICT (id) DO NOTHING;

-- Sample Reviews
INSERT INTO reviews (id, name, rating, comment, language, avatar, date)
VALUES 
('rev1', 'Shuja Anwaar', 5, 'MashAllah, the service provided by AL MUNTAHA TRAVELS SOLUTIONS was beyond excellence. From the moment we landed in Jeddah till we left, everything was handled with extreme care.', 'en', 'https://i.pravatar.cc/150?u=shuja', '2026-05-10'),
('rev2', 'Fatima Ahmed', 5, 'بهترین انتخاب برای عمره. سفر بسیار آرام و معنوی بود. هوٹل بہت قریب تھا اور سٹاف بہت مددگار تھا۔', 'ur', 'https://i.pravatar.cc/150?u=fatima', '2026-05-08')
ON CONFLICT (id) DO NOTHING;

-- Sample Gallery Items
INSERT INTO gallery (id, url, title, type, category)
VALUES 
('gal1', 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800', 'The Holy Kaaba', 'image', 'Makkah'),
('gal2', 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&q=80&w=800', 'Madinah Munawwarah', 'image', 'Madinah')
ON CONFLICT (id) DO NOTHING;
