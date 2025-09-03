import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaHeart, FaPaperPlane, FaUsers, FaHashtag } from "react-icons/fa";

type User = {
  id: string;
  name: string;
  avatar?: string;
  isAgent?: boolean;
};

type Message = {
  id: string;
  roomId: string;
  userId: string;
  text: string;
  createdAt: number;
  likes?: number;
  replies?: number;
};

type Room = {
  id: string;
  title: string;
  description?: string;
  members: string[]; // user ids
  lastActive: number;
};

const mockUsers: Record<string, User> = {
  u1: { id: "u1", name: "Success Adeyemi", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  u2: { id: "u2", name: "Sophia Martins", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  u3: { id: "u3", name: "Amara Obi", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
  u4: { id: "u4", name: "Agent Sam", avatar: "", isAgent: true },
};

const initialRooms: Room[] = [
  { id: "r1", title: "General", description: "Community chatter and announcements", members: ["u1", "u2", "u3"], lastActive: Date.now() - 1000 * 60 * 60 },
  { id: "r2", title: "Jobs & Gigs", description: "Share and find gigs", members: ["u1", "u2"], lastActive: Date.now() - 1000 * 60 * 30 },
  { id: "r3", title: "Design Crits", description: "Get feedback on your designs", members: ["u2", "u3"], lastActive: Date.now() - 1000 * 60 * 60 * 8 },
];

const initialMessages: Message[] = [
  { id: "m1", roomId: "r1", userId: "u2", text: "Welcome to the General room — drop your intros!", createdAt: Date.now() - 1000 * 60 * 60 * 3, likes: 3, replies: 2 },
  { id: "m2", roomId: "r1", userId: "u1", text: "Hello everyone — I’m Success, a product designer.", createdAt: Date.now() - 1000 * 60 * 60 * 2.5, likes: 1 },
  { id: "m3", roomId: "r2", userId: "u2", text: "Looking for a frontend dev for a React project. PM me.", createdAt: Date.now() - 1000 * 60 * 50, likes: 2 },
  { id: "m4", roomId: "r3", userId: "u3", text: "Would love feedback on my portfolio layout.", createdAt: Date.now() - 1000 * 60 * 20 },
];

const currentUser: User = mockUsers.u1; // you can swap this to test different users

const timeAgo = (ts: number) => {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
};

const CvEliteLounge: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(initialRooms[0].id);
  const [composerText, setComposerText] = useState("");
  const [searchRoom, setSearchRoom] = useState("");
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [newRoomTitle, setNewRoomTitle] = useState("");
  const feedRef = useRef<HTMLDivElement | null>(null);

  // scroll to bottom when messages change for selected room
  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight + 200;
  }, [messages, selectedRoomId]);

  const roomMessages = messages.filter((m) => m.roomId === selectedRoomId).sort((a, b) => a.createdAt - b.createdAt);
  const selectedRoom = rooms.find((r) => r.id === selectedRoomId)!;

  const handleSend = () => {
    const text = composerText.trim();
    if (!text) return;
    const msg: Message = { id: `m${Date.now()}`, roomId: selectedRoomId, userId: currentUser.id, text, createdAt: Date.now(), likes: 0 };
    setMessages((prev) => [...prev, msg]);
    setComposerText("");
    // update lastActive
    setRooms((prev) => prev.map((r) => (r.id === selectedRoomId ? { ...r, lastActive: Date.now() } : r)));
  };

  const handleLike = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, likes: (m.likes || 0) + 1 } : m)));
  };

  const handleCreateRoom = () => {
    if (!newRoomTitle.trim()) return;
    const r: Room = { id: `r${Date.now()}`, title: newRoomTitle.trim(), description: "", members: [currentUser.id], lastActive: Date.now() };
    setRooms((p) => [r, ...p]);
    setNewRoomTitle("");
    setCreatingRoom(false);
    setSelectedRoomId(r.id);
  };

  const visibleRooms = rooms.filter((r) => r.title.toLowerCase().includes(searchRoom.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans p-2">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 min-h-screen ">
        {/* LEFT: Rooms */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Rooms</h3>
            <button
              onClick={() => setCreatingRoom((s) => !s)}
              className="flex items-center gap-2 bg-[var(--color-brand-orange)] text-black px-3 py-1 rounded-lg text-sm"
            >
              <FaPlus /> <span className="hidden sm:inline">New</span>
            </button>
          </div>

          {creatingRoom && (
            <div className="mb-4 p-3 bg-[#121212] border border-gray-800 rounded-lg">
              <input
                value={newRoomTitle}
                onChange={(e) => setNewRoomTitle(e.target.value)}
                placeholder="Room title (e.g. UI Crits)"
                className="w-full p-2 rounded-md bg-[#0f0f0f] border border-gray-800 text-sm focus:outline-none"
              />
              <div className="mt-3 flex gap-2">
                <button onClick={handleCreateRoom} className="px-3 py-1 bg-[var(--color-brand-orange)] text-black rounded-md text-sm">
                  Create
                </button>
                <button onClick={() => setCreatingRoom(false)} className="px-3 py-1 bg-gray-800 rounded-md text-sm">
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="mb-3">
            <input
              value={searchRoom}
              onChange={(e) => setSearchRoom(e.target.value)}
              placeholder="Search rooms..."
              className="w-full p-2 rounded-md bg-[#0f0f0f] border border-gray-800 text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            {visibleRooms.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRoomId(r.id)}
                className={`w-full text-left p-3 rounded-lg transition flex items-center gap-3 ${
                  r.id === selectedRoomId
                    ? "bg-[#171717] border border-[var(--color-brand-orange)]"
                    : "hover:bg-[#121212] border border-transparent"
                }`}
              >
                <div className="w-9 h-9 rounded-md bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <FaHashtag />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{r.title}</span>
                    <span className="text-xs text-gray-400">{timeAgo(r.lastActive)}</span>
                  </div>
                  <p className="text-xs text-gray-400">{r.description || `${r.members.length} members`}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* CENTER: Messages */}
        <section className="col-span-12 lg:col-span-6 flex flex-col bg-transparent">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{selectedRoom.title}</h2>
              <p className="text-sm text-gray-400">{selectedRoom.description || `${selectedRoom.members.length} members`}</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <FaUsers />
                <span>{selectedRoom.members.length}</span>
              </div>
            </div>
          </div>

          <div ref={feedRef} className="flex-1 overflow-y-auto p-4 rounded-lg bg-[#0f0f0f] border border-gray-800 custom-scrollbar" style={{ minHeight: 340 }}>
            {roomMessages.length === 0 && (
              <div className="text-center text-gray-400 py-10">No messages yet — be the first to start the conversation.</div>
            )}

            <div className="space-y-4">
              {roomMessages.map((m) => {
                const user = mockUsers[m.userId];
                const isCurrent = m.userId === currentUser.id;
                return (
                  <div key={m.id} className={`flex gap-3 ${isCurrent ? "justify-end" : "justify-start"}`}>
                    {!isCurrent && (
                      <img src={user.avatar || undefined} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-gray-700" />
                    )}
                    <div className={`max-w-[80%] ${isCurrent ? "text-right" : "text-left"}`}>
                      <div className={`${isCurrent ? "inline-block bg-[var(--color-brand-orange)] text-black" : "inline-block bg-[#161616] text-white"} px-3 py-2 rounded-lg`}>
                        <div className="flex items-center gap-2">
                          {!isCurrent && <span className="font-medium text-sm">{user.name}</span>}
                          <span className="text-xs text-gray-400 ml-2">{timeAgo(m.createdAt)}</span>
                        </div>
                        <p className="mt-1 break-words">{m.text}</p>
                      </div>

                      <div className={`mt-1 flex items-center gap-3 text-xs ${isCurrent ? "justify-end" : ""}`}>
                        <button onClick={() => handleLike(m.id)} className="flex items-center gap-1 text-gray-400 hover:text-[var(--color-brand-orange)]">
                          <FaHeart /> <span>{m.likes || 0}</span>
                        </button>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400">{m.replies || 0} replies</span>
                      </div>
                    </div>

                    {isCurrent && (
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-full object-cover border border-gray-700" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Composer */}
          <div className="mt-4 flex items-center gap-3">
            <input
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Write a message..."
              className="flex-1 p-3 rounded-lg bg-[#0f0f0f] border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-orange)]"
            />
            <button onClick={handleSend} className="px-4 py-2 bg-[var(--color-brand-orange)] text-black rounded-lg">
              <FaPaperPlane />
            </button>
          </div>
        </section>

        {/* RIGHT: Room info */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="p-4 bg-[#121212] rounded-lg border border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#232323] flex items-center justify-center">
                <FaHashtag />
              </div>
              <div>
                <h4 className="font-semibold">{selectedRoom.title}</h4>
                <p className="text-xs text-gray-400">{selectedRoom.description || "Community room"}</p>
              </div>
            </div>

            <div className="mb-3">
              <h5 className="text-sm font-medium mb-2">Members</h5>
              <div className="flex flex-wrap gap-2">
                {selectedRoom.members.map((id) => {
                  const u = mockUsers[id];
                  return (
                    <div key={id} className="flex items-center gap-2 bg-[#0f0f0f] px-2 py-1 rounded-md border border-gray-800">
                      <img src={u.avatar || undefined} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-xs text-gray-300">{u.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium mb-2">About</h5>
              <p className="text-xs text-gray-400">This room is a place to share updates, ask questions and help each other.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CvEliteLounge;
