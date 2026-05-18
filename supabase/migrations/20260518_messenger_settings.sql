-- Add messenger contact settings
INSERT INTO site_settings (key, value) VALUES
  ('telegram', 'premiumstroe'),
  ('whatsapp', '+79001234567'),
  ('max_messenger', 'premiumstroe')
ON CONFLICT (key) DO NOTHING;
