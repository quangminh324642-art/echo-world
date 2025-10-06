import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container grid gap-6 py-10 md:grid-cols-3">
        <div>
          <div className="font-bold text-lg">JLearnHub</div>
          <p className="mt-2 text-sm text-muted-foreground">
            A web-based Japanese language learning platform supporting structured
            paths, JLPT prep, flashcards, live classes and progress analytics.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:col-span-2 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold mb-3">Product</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/learning" className="hover:text-foreground">Learning</Link></li>
              <li><Link to="/flashcards" className="hover:text-foreground">Flashcards</Link></li>
              <li><Link to="/exams" className="hover:text-foreground">Mock Exams</Link></li>
              <li><Link to="/live" className="hover:text-foreground">Live Classes</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Company</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/courses" className="hover:text-foreground">Courses</Link></li>
              <li><Link to="/admin" className="hover:text-foreground">Admin</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Legal</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} JLearnHub (JPH). All rights reserved.</p>
          <p>日本語学習プラットフォーム — Nền tảng học tiếng Nhật trực tuyến</p>
        </div>
      </div>
    </footer>
  );
}
