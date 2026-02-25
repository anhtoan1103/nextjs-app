import Link from 'next/link';

export default function DocsPage() {
  const docs = [
    {
      icon: '🔄',
      title: 'Workflow Documentation',
      description: 'Visual guide to Next.js architecture and data flow',
      href: '/workflow.html',
    },
    {
      icon: '✅',
      title: 'Test Plan',
      description: 'Comprehensive testing checklist with 49 test cases',
      href: '/test_plan.html',
    },
    {
      icon: '🎨',
      title: 'Design Mockup',
      description: 'Interactive UI design prototype',
      href: '/design-mockup.html',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 max-w-2xl w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#667eea] text-center mb-3">
          📚 Spending Manager
        </h1>
        <p className="text-gray-600 text-center mb-8">Documentation & Resources</p>

        <div className="space-y-4">
          {docs.map((doc) => (
            <a
              key={doc.href}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-5 bg-gray-50 border-2 border-gray-200 rounded-xl hover:border-[#667eea] hover:bg-purple-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
            >
              <div className="text-3xl sm:text-4xl mr-4">{doc.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-lg text-[#667eea] group-hover:text-[#764ba2] transition-colors">
                  {doc.title}
                </div>
                <div className="text-sm text-gray-600">{doc.description}</div>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-[#667eea] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            🚀 Launch Application
          </Link>
        </div>
      </div>
    </div>
  );
}
