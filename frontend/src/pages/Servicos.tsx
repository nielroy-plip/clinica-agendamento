import Rect { useState } from 'react';
import {
  Shield,
  Smile,
  Zap,
  Star,
  Heart,
  Award,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  ArrowRight
} from 'lucide-react';

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
}

