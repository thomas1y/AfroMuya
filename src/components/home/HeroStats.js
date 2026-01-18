import { Briefcase, Users, Building, Award } from 'lucide-react'

const HeroStats = () => {
  const stats = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      value: "25,850+",
      label: "Live Jobs",
      description: "Active opportunities"
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "10,250+",
      label: "Candidates Hired",
      description: "Career successes"
    },
    {
      icon: <Building className="w-6 h-6" />,
      value: "18,400+",
      label: "Companies",
      description: "Trusted employers"
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: "98%",
      label: "Satisfaction Rate",
      description: "User satisfaction"
    }
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 mt-16 md:mt-24">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors group"
          >
            {/* Icon */}
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#309689]/20 to-[#4aa89d]/20 flex items-center justify-center text-[#4aa89d] group-hover:from-[#309689]/30 group-hover:to-[#4aa89d]/30">
              {stat.icon}
            </div>
            
            {/* Value */}
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            
            {/* Label */}
            <div className="text-white font-medium mb-1">{stat.label}</div>
            
            {/* Description */}
            <div className="text-white/60 text-sm">{stat.description}</div>
          </div>
        ))}
      </div>
      
      {/* Trust Badge */}
      <div className="text-center mt-10 pt-8 border-t border-white/10">
        <p className="text-white/70 text-sm">Trusted by professionals at leading companies worldwide</p>
      </div>
    </div>
  )
}

export default HeroStats