
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, DollarSign, Crown, Zap, BookOpen, Users, TrendingUp, CheckCircle } from "lucide-react";

interface MonetizationDemoProps {
  userType: 'student' | 'teacher';
  currentPlan: 'free' | 'premium' | 'pro';
}

const MonetizationDemo = ({ userType, currentPlan }: MonetizationDemoProps) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [teacherEarnings] = useState({
    totalEarnings: 45200,
    thisMonth: 12400,
    contentSales: 8,
    validations: 23,
    avgRating: 4.8
  });

  const studentPlans = [
    {
      id: 'free',
      name: 'Free Plan',
      price: '₦0',
      period: '/month',
      features: [
        '5 AI questions per day',
        'Basic quiz practice',
        'Limited subject access',
        'Community support'
      ],
      limitations: [
        'No WAEC/JAMB prep',
        'No progress analytics',
        'Basic explanations only'
      ],
      current: currentPlan === 'free'
    },
    {
      id: 'premium',
      name: 'Premium Student',
      price: '₦2,500',
      period: '/month',
      popular: true,
      features: [
        'Unlimited AI questions',
        'Full WAEC/JAMB prep',
        'Detailed progress analytics',
        'All subjects included',
        'Priority support',
        'Offline content download'
      ],
      current: currentPlan === 'premium'
    },
    {
      id: 'pro',
      name: 'Pro Student',
      price: '₦5,000',
      period: '/month',
      features: [
        'Everything in Premium',
        'Personalized study plans',
        'Video explanations',
        'Live tutor sessions (2/month)',
        'Parent dashboard access',
        'Certificate preparation'
      ],
      current: currentPlan === 'pro'
    }
  ];

  const teacherMonetization = [
    {
      type: 'Content Creation',
      description: 'Upload lesson plans, quizzes, and study materials',
      earning: '₦500-2000 per content',
      example: 'Physics SS2 complete module: ₦1,800'
    },
    {
      type: 'Answer Validation',
      description: 'Review and validate AI responses',
      earning: '₦25-50 per validation',
      example: '23 validations this week: ₦1,150'
    },
    {
      type: 'Live Tutoring',
      description: 'Conduct live sessions with premium students',
      earning: '₦2000-5000 per session',
      example: '2 sessions this week: ₦6,000'
    }
  ];

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    setShowPayment(true);
  };

  const PaymentModal = () => {
    if (!showPayment) return null;

    const plan = studentPlans.find(p => p.id === selectedPlan);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Upgrade to {plan?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{plan?.price}</div>
              <div className="text-gray-600">{plan?.period}</div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium mb-2">Payment Options:</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Card Payment</span>
                    <Badge variant="outline">Available</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Bank Transfer</span>
                    <Badge variant="outline">Available</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>USSD (*737#)</span>
                    <Badge variant="outline">Available</Badge>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="font-medium text-green-800 mb-1">Special Offer!</div>
                <div className="text-sm text-green-700">
                  Get 2 months free when you pay for 6 months upfront
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => setShowPayment(false)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Payment
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowPayment(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (userType === 'teacher') {
    return (
      <div className="space-y-6">
        {/* Teacher Earnings Dashboard */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6" />
              Your Earnings Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">₦{teacherEarnings.totalEarnings.toLocaleString()}</div>
                <div className="text-sm opacity-90">Total Earnings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">₦{teacherEarnings.thisMonth.toLocaleString()}</div>
                <div className="text-sm opacity-90">This Month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{teacherEarnings.contentSales}</div>
                <div className="text-sm opacity-90">Content Sales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{teacherEarnings.avgRating}⭐</div>
                <div className="text-sm opacity-90">Avg Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monetization Channels */}
        <div className="grid md:grid-cols-1 gap-6">
          {teacherMonetization.map((channel, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {channel.type}
                  <Badge variant="secondary">{channel.earning}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{channel.description}</p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-sm font-medium text-green-800">Recent Example:</div>
                  <div className="text-sm text-green-700">{channel.example}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Upload Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Content Monetization Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-4">Upload your Physics lesson plan for SS2 students</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Upload Content
                </Button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Estimated Earnings:</span>
                  <span className="text-2xl font-bold text-green-600">₦1,200</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• Based on similar Physics content performance</div>
                  <div>• Projected 4-6 purchases in first month</div>
                  <div>• ₦300 per purchase (70% of ₦450 price)</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Plan Status */}
      <Card className={`border-2 ${currentPlan === 'free' ? 'border-gray-300' : 'border-green-500'}`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-600" />
              Current Plan: {studentPlans.find(p => p.current)?.name}
            </span>
            {currentPlan === 'free' && (
              <Badge variant="secondary">Free User</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentPlan === 'free' && (
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <div className="font-medium text-orange-800 mb-2">Usage Limits Reached</div>
                <div className="text-sm text-orange-700 mb-3">
                  You've used 5/5 AI questions today. Upgrade to continue learning!
                </div>
                <Progress value={100} className="mb-2" />
                <div className="text-xs text-orange-600">Resets in 8 hours</div>
              </div>
              <Button onClick={() => handleUpgrade('premium')} className="w-full bg-green-600 hover:bg-green-700">
                <Zap className="h-4 w-4 mr-2" />
                Upgrade Now - Unlock Unlimited Learning!
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {studentPlans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? 'border-2 border-blue-500' : ''} ${plan.current ? 'bg-green-50' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500">Most Popular</Badge>
              </div>
            )}
            {plan.current && (
              <div className="absolute -top-3 right-4">
                <Badge variant="default">Current Plan</Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <CardTitle>{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-green-600">{plan.price}</div>
              <div className="text-gray-600">{plan.period}</div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-green-800 mb-2">Features:</h4>
                <ul className="space-y-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              {plan.limitations && (
                <div>
                  <h4 className="font-medium text-red-800 mb-2">Limitations:</h4>
                  <ul className="space-y-1">
                    {plan.limitations.map((limitation, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-red-600">
                        <span className="w-3 h-3 flex-shrink-0">×</span>
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {!plan.current && (
                <Button 
                  onClick={() => handleUpgrade(plan.id)}
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                >
                  {plan.id === 'free' ? 'Current Plan' : 'Upgrade Now'}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Value Proposition */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <TrendingUp className="h-5 w-5" />
            Why Upgrade to Premium?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Student Success Stories:</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded-lg">
                  <div className="font-medium">Adebayo improved JAMB score by 45 points</div>
                  <div className="text-gray-600">"Premium AI tutor helped me understand Chemistry finally!"</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="font-medium">95% of Premium users pass WAEC on first attempt</div>
                  <div className="text-gray-600">Compared to 78% national average</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Cost Comparison:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Private tutor (per month)</span>
                  <span className="font-medium">₦20,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>Lesson center fees</span>
                  <span className="font-medium">₦15,000+</span>
                </div>
                <div className="flex justify-between">
                  <span>JAMB prep books</span>
                  <span className="font-medium">₦8,000+</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-green-600">
                  <span>A1Score Premium</span>
                  <span>₦2,500</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <PaymentModal />
    </div>
  );
};

export default MonetizationDemo;
