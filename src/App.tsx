import React, { useState, useEffect } from 'react';
import { Folder, ChevronRight, Github } from 'lucide-react';

interface RepoItem {
  name: string;
  type: 'folder';
  path: string;
}

function App() {
  const [items, setItems] = useState<RepoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching repository data
    // In production, this would be replaced with actual API calls to your backend
    setTimeout(() => {
      const sampleFolders = [
        { name: 'Documentation', type: 'folder' as const, path: '/docs' },
        { name: 'Source Code', type: 'folder' as const, path: '/src' },
        { name: 'Assets', type: 'folder' as const, path: '/assets' },
        { name: 'Tests', type: 'folder' as const, path: '/tests' },
      ];
      setItems(sampleFolders);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="w-8 h-8" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Repository Explorer
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-pulse text-gray-400">Loading repository...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-purple-500/10 p-3">
                    <Folder className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-white group-hover:text-purple-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-400">Browse contents</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 group-hover:from-purple-600/5 group-hover:via-purple-600/5 group-hover:to-purple-600/5 transition-all duration-500" />
              </a>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            Repository Index • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;