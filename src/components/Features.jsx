import React from 'react'
import { Lightbulb, BarChart3, Users } from 'lucide-react'

const features = [
  {
    title: 'Debate & Learn',
    description: 'Join real-time community debates, support or oppose ideas, and improve your critical thinking.',
    icon: <Lightbulb className="w-8 h-8 text-blue-600" />,
  },
  {
    title: 'Track Your Growth',
    description: 'Get insights on your arguments, votes received, and growth over time.',
    icon: <BarChart3 className="w-8 h-8 text-green-600" />,
  },
  {
    title: 'Expert Community',
    description: 'Collaborate with a diverse and supportive community of learners and experts.',
    icon: <Users className="w-8 h-8 text-purple-600" />,
  },
]

const Features = () => {
  return (
    <section className="py-16 px-3  my-20 rounded-2xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Core Features</h2>
        <p className="text-gray-600 text-lg">
          What makes Study Arena a unique learning platform.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-base-100 rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
