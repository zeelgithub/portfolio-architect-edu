import Card from "@/components/ui/Card"
import FadeIn from "@/components/ui/FadeIn"

export default function EducationPage() {
  return (
    <>
      {/* Gradient background for depth */}
      <div
        className="fixed inset-0 bg-gradient-to-b
          from-gray-300 via-gray-200 to-gray-300
          dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
          -z-10"
      />

      <section className="py-16 flex justify-center">
        <div className="max-w-4xl w-full space-y-12">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
              Education
            </h1>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 mt-2">
              Academic foundation supporting applied AI engineering and large-scale data systems.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative space-y-10 border-l-2 border-gray-400 dark:border-gray-700 pl-8">
            {/* Master Degree */}
            <FadeIn>
              <div className="relative">
                <div className="absolute w-4 h-4 bg-gray-600 dark:bg-gray-300 rounded-full -left-2 top-6" />

                <Card className="bg-gray-50 dark:bg-gray-900 p-6 border border-gray-300 dark:border-gray-700 shadow-xl hover:shadow-2xl rounded-xl transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Master of Science in Analytics — AI Specialization
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
                        Georgia Institute of Technology · Georgia, United States
                      </p>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 italic">
                      Aug 2024 – Present
                    </span>
                  </div>

                  <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Graduate program focused on artificial intelligence, advanced analytics,
                    and large-scale data systems with emphasis on practical machine learning
                    applications and real-world problem solving.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Artificial Intelligence",
                      "Machine Learning",
                      "Data Systems",
                      "Advanced Analytics",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs
                          bg-gray-200 dark:bg-gray-800
                          text-gray-700 dark:text-gray-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </FadeIn>

            {/* Bachelor Degree */}
            <FadeIn>
              <div className="relative">
                <div className="absolute w-4 h-4 bg-gray-600 dark:bg-gray-300 rounded-full -left-2 top-6" />

                <Card className="bg-gray-50 dark:bg-gray-900 p-6 border border-gray-300 dark:border-gray-700 shadow-xl hover:shadow-2xl rounded-xl transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Bachelor of Technology in Information Technology
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
                        Charusat University · Gujarat, India
                      </p>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 italic">
                      2019 – 2023
                    </span>
                  </div>

                  <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Undergraduate program focused on computer science fundamentals,
                    including software engineering, algorithms, and applied information
                    technology.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Computer Science",
                      "Software Engineering",
                      "Data Structures",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs
                          bg-gray-200 dark:bg-gray-800
                          text-gray-700 dark:text-gray-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}