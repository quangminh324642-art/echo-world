import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ProtectedRoute from "@/auth/ProtectedRoute";
import { useAuth } from "@/auth/AuthContext";

// Types
export type AdminUser = { id: string; name: string; email: string; role: "student" | "instructor" | "admin"; status: "active" | "suspended" };
export type AdminCourse = { id: string; title: string; level: "N5" | "N4" | "N3"; status: "draft" | "published" };
export type AdminReport = { id: string; type: string; detail: string; createdAt: number; resolved?: boolean };
export type CommunityItem = { id: string; author: string; content: string; status: "pending" | "approved" | "rejected" };

// Storage helpers
const K = {
  users: "jph.admin.users",
  courses: "jph.admin.courses",
  reports: "jph.admin.reports",
  community: "jph.admin.community",
};

function load<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : fallback;
}
function save<T>(key: string, val: T) {
  localStorage.setItem(key, JSON.stringify(val));
}

// Seed data
const seedUsers: AdminUser[] = [
  { id: "u1", name: "Administrator", email: "admin@jph.local", role: "admin", status: "active" },
  { id: "u2", name: "Nguyen A", email: "nguyena@example.com", role: "student", status: "active" },
  { id: "u3", name: "Tran B", email: "tranb@example.com", role: "instructor", status: "active" },
];
const seedCourses: AdminCourse[] = [
  { id: "c1", title: "Dekiru Nihongo N5", level: "N5", status: "published" },
  { id: "c2", title: "Dekiru Nihongo N4", level: "N4", status: "draft" },
];
const seedReports: AdminReport[] = [
  { id: "r1", type: "progress", detail: "Daily active users report", createdAt: Date.now() - 86400000 },
  { id: "r2", type: "revenue", detail: "Monthly subscription revenue", createdAt: Date.now() - 172800000 },
];
const seedCommunity: CommunityItem[] = [
  { id: "m1", author: "student1", content: "おすすめのN4文法資料ありますか？", status: "pending" },
  { id: "m2", author: "student2", content: "JLPT N5 単語クイズをシェアします！", status: "pending" },
];

function SectionHeading({ title, extra }: { title: string; extra?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-xl font-semibold">{title}</h3>
      {extra}
    </div>
  );
}

function UsersTab() {
  const [users, setUsers] = useState<AdminUser[]>(() => load(K.users, seedUsers));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminUser["role"]>("student");

  useEffect(() => save(K.users, users), [users]);

  function addUser() {
    if (!name || !email) return;
    setUsers((u) => [{ id: crypto.randomUUID(), name, email, role, status: "active" }, ...u]);
    setName("");
    setEmail("");
    setRole("student");
  }
  function toggleStatus(id: string) {
    setUsers((u) => u.map((x) => (x.id === id ? { ...x, status: x.status === "active" ? "suspended" : "active" } : x)));
  }
  function changeRole(id: string) {
    setUsers((u) => u.map((x) => (x.id === id ? { ...x, role: x.role === "student" ? "instructor" : x.role === "instructor" ? "admin" : "student" } : x)));
  }

  return (
    <div className="space-y-4">
      <SectionHeading
        title="Manage Users"
        extra={
          <div className="flex gap-2">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-40" />
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-56" />
            <Input placeholder="Role (student/instructor/admin)" value={role} onChange={(e) => setRole(e.target.value as any)} className="w-56" />
            <Button onClick={addUser}>Add</Button>
          </div>
        }
      />
      <div className="grid gap-3 md:grid-cols-2">
        {users.map((u) => (
          <Card key={u.id}>
            <CardHeader className="pb-2 flex-row items-baseline gap-3">
              <CardTitle>{u.name}</CardTitle>
              <Badge variant="secondary">{u.role}</Badge>
              <Badge className={u.status === "active" ? "" : "bg-destructive text-destructive-foreground"}>{u.status}</Badge>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">{u.email}</div>
              <div className="ml-auto flex gap-2">
                <Button variant="outline" onClick={() => changeRole(u.id)}>Cycle Role</Button>
                <Button variant={u.status === "active" ? "destructive" : "secondary"} onClick={() => toggleStatus(u.id)}>
                  {u.status === "active" ? "Suspend" : "Activate"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CoursesTab() {
  const [courses, setCourses] = useState<AdminCourse[]>(() => load(K.courses, seedCourses));
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState<AdminCourse["level"]>("N5");

  useEffect(() => save(K.courses, courses), [courses]);

  function addCourse() {
    if (!title) return;
    setCourses((c) => [{ id: crypto.randomUUID(), title, level, status: "draft" }, ...c]);
    setTitle("");
    setLevel("N5");
  }
  function toggleStatus(id: string) {
    setCourses((c) => c.map((x) => (x.id === id ? { ...x, status: x.status === "draft" ? "published" : "draft" } : x)));
  }

  return (
    <div className="space-y-4">
      <SectionHeading
        title="Manage Courses"
        extra={
          <div className="flex gap-2">
            <Input placeholder="Course title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-64" />
            <Input placeholder="Level (N5/N4/N3)" value={level} onChange={(e) => setLevel(e.target.value as any)} className="w-40" />
            <Button onClick={addCourse}>Add</Button>
          </div>
        }
      />
      <div className="grid gap-3 md:grid-cols-2">
        {courses.map((c) => (
          <Card key={c.id}>
            <CardHeader className="pb-2 flex-row items-baseline gap-3">
              <CardTitle>{c.title}</CardTitle>
              <Badge variant="secondary">{c.level}</Badge>
              <Badge className={c.status === "published" ? "" : "bg-muted text-foreground"}>{c.status}</Badge>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <div className="ml-auto">
                <Button variant={c.status === "published" ? "outline" : "default"} onClick={() => toggleStatus(c.id)}>
                  {c.status === "published" ? "Unpublish" : "Publish"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReportsTab() {
  const [reports, setReports] = useState<AdminReport[]>(() => load(K.reports, seedReports));
  useEffect(() => save(K.reports, reports), [reports]);
  function resolve(id: string) {
    setReports((r) => r.map((x) => (x.id === id ? { ...x, resolved: true } : x)));
  }
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {reports.map((r) => (
        <Card key={r.id}>
          <CardHeader className="pb-2 flex-row items-baseline gap-3">
            <CardTitle className="text-lg capitalize">{r.type}</CardTitle>
            <Badge variant={r.resolved ? "secondary" : "default"}>{r.resolved ? "resolved" : "open"}</Badge>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <div>{r.detail}</div>
            <div className="mt-2 text-xs">{new Date(r.createdAt).toLocaleString()}</div>
            {!r.resolved && (
              <div className="mt-3">
                <Button size="sm" onClick={() => resolve(r.id)}>Mark resolved</Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ModerationTab() {
  const [items, setItems] = useState<CommunityItem[]>(() => load(K.community, seedCommunity));
  useEffect(() => save(K.community, items), [items]);
  function setStatus(id: string, status: CommunityItem["status"]) {
    setItems((it) => it.map((x) => (x.id === id ? { ...x, status } : x)));
  }
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {items.map((m) => (
        <Card key={m.id}>
          <CardHeader className="pb-2 flex-row items-baseline gap-3">
            <CardTitle className="text-base">{m.author}</CardTitle>
            <Badge variant="secondary">{m.status}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-md bg-muted p-3 text-sm">{m.content}</div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setStatus(m.id, "approved")}>Approve</Button>
              <Button size="sm" variant="destructive" onClick={() => setStatus(m.id, "rejected")}>Reject</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function Admin() {
  const { user } = useAuth();
  const subtitle = user?.email ? `Logged in as ${user.email}` : "";
  return (
    <ProtectedRoute role="admin">
      <div className="container py-10">
        <div className="mb-8 text-center">
          <Badge className="mb-3" variant="secondary">Administration</Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Admin Panel</h1>
          <p className="mt-2 text-muted-foreground">Manage users, courses, and reports. Moderate community content and ensure quality. {subtitle}</p>
        </div>
        <Tabs defaultValue="users">
          <TabsList className="flex w-full flex-wrap gap-2">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="pt-4"><UsersTab /></TabsContent>
          <TabsContent value="courses" className="pt-4"><CoursesTab /></TabsContent>
          <TabsContent value="reports" className="pt-4"><ReportsTab /></TabsContent>
          <TabsContent value="moderation" className="pt-4"><ModerationTab /></TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
